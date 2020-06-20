(() => {
  const fibonacciproj = {};

  getDomElements();
  getServerFibResults();

  function getDomElements() {
    fibonacciproj.input;
    fibonacciproj.spinner = document.getElementById("spinner");
    fibonacciproj.resultsSpinner = document.getElementById("results-spinner");
    fibonacciproj.checkBox = document.getElementById("checkbox");
    fibonacciproj.calcResult = document.getElementById("result");
    fibonacciproj.userInputElement = document.getElementById("input");
    fibonacciproj.alertBox = document.getElementById("alert-box");
    fibonacciproj.serverErrorMsg = document.getElementById("server-error");
    fibonacciproj.selection = document.querySelector("select");
    fibonacciproj.button = document
      .getElementById("button")
      .addEventListener("click", () => {
        clearResult();
        isChecked(getUserInput());
      });
  }

  function clearResult() {
    const {
      alertBox,
      userInputElement,
      calcResult,
      serverErrorMsg,
    } = fibonacciproj;
    alertBox.classList.add("d-none");
    userInputElement.classList.remove("border-red");
    calcResult.innerHTML = "";
    serverErrorMsg.innerText = "";
  }

  function getUserInput() {
    const { userInputElement } = fibonacciproj;
    let userInput = userInputElement.value;
    return userInput;
  }

  const localCalcFibNum = (num) => {
    const { calcResult } = fibonacciproj;
    clearResult();
    if (num < 0) {
      calcResult.innerText = "Number can't be smaller than 0!";
    } else if (num === "0") {
      calcResult.innerHTML = 0;
    } else {
      let prevNum1 = 0,
        prevNum2 = 1;
      let result = 1;
      for (let i = 2; i <= num; i++) {
        result = prevNum1 + prevNum2;
        prevNum1 = prevNum2;
        prevNum2 = result;
      }
      calcResult.innerHTML = result;
    }
  };

  async function serverCalcFibNum(num) {
    const {
      alertBox,
      userInputElement,
      calcResult,
      serverErrorMsg,
      spinner,
    } = fibonacciproj;
    if (num === "") {
      serverErrorMsg.innerText = "Please, input a number!";
    } else if (num > 50) {
      alertBox.classList.remove("d-none");
      userInputElement.classList.add("border-red");
      return false;
    } else {
      toggleSpinner(spinner);
      // spinnerOn();
      const response = await fetch(`http://localhost:5050/fibonacci/${num}`);
      if (response.ok) {
        const data = await response.json();
        calcResult.innerText = data.result;
        toggleSpinner(spinner);
      } else {
        const errResponse = await response.text();
        serverErrorMsg.innerText = `Server error: ${errResponse}`;
        toggleSpinner(spinner);
      }
    }
  }

  let selectedItem;
  const { selection } = fibonacciproj;
  selection.addEventListener("change", () => {
    selectedItem = selection.options[selection.selectedIndex].text;
    getServerFibResults();
  });

  function isChecked(number) {
    const { checkBox } = fibonacciproj;
    if (checkBox.checked) {
      serverCalcFibNum(number);
      getServerFibResults();
    } else {
      localCalcFibNum(number);
    }
  }

  async function getServerFibResults() {
    const { resultsSpinner } = fibonacciproj;
    toggleSpinner(resultsSpinner);

    const response = await fetch(`http://localhost:5050/getFibonacciResults`);
    const data = await response.json();

    let { results } = data;

    runProperSort(results, selectedItem);

    let obtainedResults = "";
    const resultsList = document.getElementById("results-list");
    for (element of results) {
      obtainedResults += `
        <li class = "list-style">The Fibonacci of: <b>${element.number}</b> 
        is <b>${element.result}</b>. 
        Calculated at:
         ${new Date(element.createdDate)}</li> `;
    }
    resultsList.innerHTML = obtainedResults;
    toggleSpinner(resultsSpinner);
  }

  function runProperSort(myArray, optionChosen) {
    let sortedArray;
    switch (optionChosen) {
      case "Date Ask":
        sortedArray = sortDateAsk(myArray);
        break;
      default:
        sortedArray = sortDateDesk(myArray);
        break;
      case "Number Desk":
        sortedArray = sortnumberDesk(myArray);
        break;
      case "Number Ask":
        sortedArray = sortnumberAsk(myArray);
        break;
    }
    return sortedArray;
  }

  function sortDateDesk(array) {
    return array.sort((el1, el2) =>
      el1.createdDate < el2.createdDate ? 1 : -1
    );
  }

  function sortDateAsk(array) {
    return array.sort((el1, el2) =>
      el1.createdDate > el2.createdDate ? 1 : -1
    );
  }

  function sortnumberAsk(array) {
    return array.sort((el1, el2) => (el1.number > el2.number ? 1 : -1));
  }

  function sortnumberDesk(array) {
    return array.sort((el1, el2) => (el1.number < el2.number ? 1 : -1));
  }
  
  function toggleSpinner(domElement) {
    domElement.classList.toggle("d-none");
  }

})();
