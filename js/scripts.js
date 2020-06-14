const spinner = document.getElementById("spinner");
const resultsSpinner = document.querySelector("results-spinner");
const checkBox = document.getElementById("checkbox");

function getUserInput() {
  let userInput = document.getElementById("input").value;
  return userInput;
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

function serverCalcFibNum() {
  let number = getUserInput();
  if (number > 50) {
    document.getElementById("alert-box").classList.add("visibility");
    document.getElementById("input").classList.add("border-red");
    return false;
  } else {
    spinnerOn();
    fetch(`http://localhost:5050/fibonacci/${number}`)    
    .then(function (response) {
      if (response.ok) {
        return response.json()
        .then(function (data) {
          document.getElementById("result").innerText = data.result;
          spinnerOff();
        });
      } else {
        response.text()
        .then((text) => {
          document.querySelector(".server-error")
          .innerHTML = `Server error: ${text}`;
          spinnerOff();
        });
      }
    });
  }
}

function calcFibNumber() {
  let btn = document.getElementById("button");
  btn.addEventListener("click", () => {
    let number = getUserInput();
    console.log(number);
    if (checkBox.checked) {
      serverCalcFibNum();
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

      results = results.splice(0, 5);

      let list = document.querySelector(".results-list");

      for (key in results) {
        list.innerHTML += `<li class = "list-style">The Fibonacci of: 
        <b>${results[key].number}</b> 
        is <b>${results[key].result}</b>. 
        Calculated at:
         ${new Date(results[key].createdDate)}</li>`;
      }
      resultsSpinnerOff();
    });
}

getServerFibResults();
calcFibNumber();
