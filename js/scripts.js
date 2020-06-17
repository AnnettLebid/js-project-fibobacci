const spinner = document.getElementById("spinner");
const resultsSpinner = document.getElementById("results-spinner");
const checkBox = document.getElementById("checkbox");
const calcResult = document.getElementById("result");
const userInputElement = document.getElementById("input");
const alertBox = document.getElementById("alert-box");
const serverErrorMsg = document.getElementById("server-error");
let selection = document.querySelector("select");

function getUserInput() {
  return userInputElement.value;
}

function spinnerOn() {
  spinner.classList.remove("d-none");
}

function spinnerOff() {
  spinner.classList.add("d-none");
}

function resultsSpinnerOn() {
  resultsSpinner.classList.remove("d-none");
}

function resultsSpinnerOff() {
  resultsSpinner.classList.add("d-none");
}

function clearResult() {
  alertBox.classList.add("d-none");
  userInputElement.classList.remove("border-red");
  calcResult.innerHTML = "";
  serverErrorMsg.innerText = "";
}

function localCalcFibNum(num) {
  let prevNum1 = 0,
    prevNum2 = 1;
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result = prevNum1 + prevNum2;
    prevNum1 = prevNum2;
    prevNum2 = result;
  }
  calcResult.innerText = result;
}

function serverCalcFibNum(num) {
  if (num > 50) {
    alertBox.classList.remove("d-none");
    userInputElement.classList.add("border-red");
    return false;
  } else {
    spinnerOn();
    fetch(`http://localhost:5050/fibonacci/${num}`).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          calcResult.innerText = data.result;
          spinnerOff();
        });
      } else {
        response.text().then((text) => {
          document.querySelector(
            ".server-error"
          ).innerText = `Server error: ${text}`;
          spinnerOff();
        });
      }
    });
  }
}

function handleOnButtonClick() {
  let btn = document.getElementById("button");
  btn.addEventListener("click", () => {
    clearResult();
    let number = getUserInput();
    isChecked(number);
  });
}

function isChecked(number) {
  if (checkBox.checked) {
    serverCalcFibNum(number);
    getServerFibResults();
  } else {
    localCalcFibNum(number);
  }
}

let selectedItem;
selection.addEventListener("change", () => {
  selectedItem = selection.options[selection.selectedIndex].text;
  console.log(selectedItem);
  getServerFibResults();
});

function getServerFibResults() {
  resultsSpinnerOn();
  fetch(`http://localhost:5050/getFibonacciResults`)
    .then((response) => response.json())
    .then((data) => {      
      let { results } = data;
      runProperSort(results, selectedItem);     

      let obtainedResults = "";
      const resultsList = document.getElementById("results-list");
      // results = results.splice(1, 10);
      for (element of results) {
        obtainedResults += `
        <li class = "list-style">The Fibonacci of: <b>${element.number}</b> 
        is <b>${element.result}</b>. 
        Calculated at:
         ${new Date(element.createdDate)}</li> `;
      }
      resultsList.innerHTML = obtainedResults;
      resultsSpinnerOff();
    });
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
  return array.sort((el1, el2) => (el1.createdDate < el2.createdDate ? 1 : -1));
}

function sortDateAsk(array) {
  return array.sort((el1, el2) => (el1.createdDate > el2.createdDate ? 1 : -1));
}

function sortnumberAsk(array) {
  return array.sort((el1, el2) => (el1.number > el2.number ? 1 : -1));
}

function sortnumberDesk(array) {
  return array.sort((el1, el2) => (el1.number < el2.number ? 1 : -1));
}

window.onload = function () {
  getServerFibResults();
  handleOnButtonClick();
};

