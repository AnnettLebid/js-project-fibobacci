const loader = document.querySelector(".loader-ring");
const resultsLoader = document.querySelector(".results-loader-ring");

function getUserInput() {
  let userInput = document.getElementById("input").value;
  return userInput;
}

function loaderOn() {
  loader.classList.add("show");
}

function loaderOff() {
  loader.classList.remove("show");
}

function resultsLoaderOn() {
  resultsLoader.classList.add("show");
}

function resultsLoaderOff() {
  resultsLoader.classList.remove("show");
}

function calcFibNumber() {
  let btn = document.getElementById("button");
  btn.addEventListener("click", function () {
    loaderOn();
    let number = getUserInput();
    if (number > 50) {
      document.getElementById("alert-box").classList.add("visibility");
      document.getElementById("input").classList.add("border-red");
      loaderOff();
      return false;
    } else {
      fetch(`http://localhost:5050/fibonacci/${number}`).then(function (
        response
      ) {
        if (response.ok) {
          return response.json().then(function (data) {
            document.getElementById("result").innerText = data.result;
            loaderOff();
          });
        } else {
          response.text().then((text) => {
            document.querySelector(
              ".server-error"
            ).innerHTML = `Server error: ${text}`;
            loaderOff();
          });
        }
      });
    }
  });
}

calcFibNumber();

function getServerFibResults() {
  resultsLoaderOn();
  fetch(`http://localhost:5050/getFibonacciResults`)
    .then((response) => response.json())
    .then((data) => {
      let { results } = data;

      results = results.splice(0, 10);

      let list = document.querySelector(".results-list");

      for (key in results) {
        list.innerHTML += `<li class = "list-style">The Fibonacci of: 
        <b>${results[key].number}</b> 
        is <b>${results[key].result}</b>. 
        Calculated at:
         ${new Date(results[key].createdDate)}</li>`;
      }
      resultsLoaderOff();
    });
  
}
console.log("hello");

getServerFibResults();
