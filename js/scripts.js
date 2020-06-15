const spinner = document.getElementById("spinner");
const resultsSpinner = document.getElementById("results-spinner");
const checkBox = document.getElementById("checkbox");
const calcResult = document.getElementById("result");

function getUserInput() {
  let userInput = document.getElementById("input");
  return userInput.value;
}

function spinnerOn() {
  spinner.classList.add("show");
}

function spinnerOff() {
  spinner.classList.remove("show");
}

function resultsSpinnerOn() {
  resultsSpinner.classList.add("show");
}

function resultsSpinnerOff() {
  resultsSpinner.classList.remove("show");
}

function clearResult() {
  calcResult.innerHTML = "";
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

function serverCalcFibNum(num, callback) {
  if (num > 50) {
    document.getElementById("alert-box").classList.add("visibility");
    document.getElementById("input").classList.add("border-red");
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


function isChecked (number) {
  if (checkBox.checked) {
    serverCalcFibNum(number);
    getServerFibResults();
  } else {
    localCalcFibNum(number);
  }
}

function handleOnButtonClick() {
  let btn = document.getElementById("button");
  btn.addEventListener("click", () => {
    clearResult();
    let number = getUserInput();
    isChecked (number);  
  });
}

// // function checkDropmenu () {
//   let dropMenuItem = document.getElementById("dropdown-item");
//   dropMenuItem.click( () => console.log(this.text));

//

// checkDropmenu ();

function getServerFibResults() {
  resultsSpinnerOn();
  fetch(`http://localhost:5050/getFibonacciResults`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.results.sort((el1, el2) => {
        if (el1.createdDate < el2.createdDate) {
          return 1;
        } else {
          return -1;
        }
      });
      let { results } = data;

      const resultsList = document.getElementById("results-list");
      // results = results.splice(1, 10);
      for (element of results) {
        let newElement = createLiElement(element);
        resultsList.appendChild(newElement);
      }
      resultsSpinnerOff();
    });
}

function createLiElement(element) {
  const wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add("wrapper");

  const divFib = document.createElement("div");
  divFib.innerText = "The Fibonacci Of";

  const divNumber = document.createElement("div");
  divNumber.classList.add("bold");
  divNumber.classList.add("padding");
  divNumber.innerHTML = element.number;

  const divIs = document.createElement("div");
  divIs.innerText = "is";

  const divResult = document.createElement("div");
  divResult.classList.add("bold");
  divResult.classList.add("padding-left");
  divResult.innerText = element.result;

  const divCalc = document.createElement("div");
  divCalc.innerText = ". Calculated at: ";

  const divDate = document.createElement("div");
  divDate.classList.add("padding");
  divDate.innerHTML = new Date(element.createdDate);

  wrapperDiv.append(divFib, divNumber, divIs, divResult, divCalc, divDate);
  return wrapperDiv;
}

getServerFibResults();
handleOnButtonClick();
