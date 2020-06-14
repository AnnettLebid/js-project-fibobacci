const spinner = document.getElementById("spinner");
const resultsSpinner = document.getElementById("results-spinner");
const checkBox = document.getElementById("checkbox");

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

function localCalcFibNum(num) {
  let prevNum1 = 0,
    prevNum2 = 1;
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result = prevNum1 + prevNum2;
    prevNum1 = prevNum2;
    prevNum2 = result;
  }
  document.getElementById("result").innerText = result;
}

function serverCalcFibNum(num) {  
  if (num > 50) {
    document.getElementById("alert-box").classList.add("visibility");
    document.getElementById("input").classList.add("border-red");
    return false;
  } else {
    spinnerOn();
    fetch(`http://localhost:5050/fibonacci/${num}`)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          document.getElementById("result").innerText = data.result;
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
    let number = getUserInput();
    if (checkBox.checked) {
      serverCalcFibNum(number);
    } else {
      localCalcFibNum(number);
    }
  });
}


function getServerFibResults() {
  resultsSpinnerOn();
  fetch(`http://localhost:5050/getFibonacciResults`)
    .then((response) => response.json())
    .then((data) => {
      let { results } = data;
      const resultsList = document.getElementById("results-list");
      console.log(results.length);
      results = results.splice(results.length - 10, results.length);
      for (element of results) {
        let newElement = createLiElement(element);
        console.log(newElement);
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
