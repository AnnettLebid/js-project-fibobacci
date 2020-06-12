// function fibonacciNumber(num) {
//   let prevNum1 = 0,
//     prevNum2 = 1;
//   let result = 1;
//   for (let i = 2; i <= num; i++) {
//     result = prevNum1 + prevNum2;
//     prevNum1 = prevNum2;
//     prevNum2 = result;
//   }
//   console.log(result);
//   document.getElementById("result").innerText = result;
// }

// function getUserInput() {
//   let userInput = document.getElementById("input").value;
//   console.log(userInput);
//   return userInput;
// }

// let btn = document.getElementById("button");
// btn.addEventListener("click", function () {
//   fibonacciNumber(getUserInput());
// });

let btn = document.getElementById("button");
btn.addEventListener("click", function () {  
let number = document.getElementById("input").value;
console.log(number);
//   // let number = getUserInput();
   fetch(`http://localhost:5050/fibonacci/${number}`)
  .then(response => response.json())
  .then(data => console.log(data.result));
 
//   // fibonacciNumber(getUserInput());
});

// function works() {
//   console.log("I am working");
// }


// myFetch();