function getUserInput() {
  let userInput = document.getElementById("input").value;
  return userInput;
}

function calcFibNumber() {
  let btn = document.getElementById("button");
  btn.addEventListener("click", function () {
    let number = getUserInput();
    fetch(`http://localhost:5050/fibonacci/${number}`)
      .then((response) => response.json())
      .then((data) => (document.getElementById("result").innerText = data.result)
      );
  });
}

calcFibNumber();

