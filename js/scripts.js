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
    loader.classList.add("show");
    let number = getUserInput();
    fetch(`http://localhost:5050/fibonacci/${number}`)
      .then((response) => response.json())
      .then(function (data) {
        (document.getElementById("result").innerText = data.result);
        loader.classList.remove("show");
      });    
  });
}

calcFibNumber();
