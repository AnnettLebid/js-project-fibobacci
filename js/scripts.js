const fibonacciNumber = (num) => {
  let prevNum1 = 0,
    prevNum2 = 1;
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result = prevNum1 + prevNum2;
    prevNum1 = prevNum2;
    prevNum2 = result;
  }
  return result;
};

// console.log(fibonacciNumber(5));

let btn = document.getElementById("button");

function getUserInput() {
  let userInput = document.querySelector(".input").value;  
  console.log(userInput);
}

btn.addEventListener("click", getUserInput);

// document.querySelector(".number").innerHTML = 5;
// document.querySelector(".result").innerHTML = fibonacciNumber(5);
