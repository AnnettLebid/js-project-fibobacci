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

function showAlertBox() {
  document.getElementById(alert - box).classList.add("d-inline");
}

function calcFibNumber() {
  let btn = document.getElementById("button");
  btn.addEventListener("click", function () {
    loaderOn();
    let number = getUserInput();
    if (number > 50) {
      document.getElementById("alert-box").classList.add("visibility");
      loaderOff();
      return false;
    } else {
      fetch(`http://localhost:5050/fibonacci/${number}`)
        .then((response) => response.json())
        .then(function (data) {
          document.getElementById("result").innerText = data.result;
          loaderOff();
        });
    }
  });
}

calcFibNumber();
