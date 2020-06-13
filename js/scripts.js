const loader = document.querySelector(".loader-ring");

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
            document.querySelector(".server-error").innerHTML = `Server error: ${text}`;            
            loaderOff();
          });
        }
      });
    }
  });
}

calcFibNumber();

function getServerFibResults() {  
  fetch(`http://localhost:5050/getFibonacciResults`)
  .then(response => response.json())
  .then(data => {
    const {results} = data;
    console.log(results); 
  })
}

getServerFibResults();







