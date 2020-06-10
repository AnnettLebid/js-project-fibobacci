const fibonacciNumber = (num) => {
  let prevNum1 = 0, prevNum2 = 1;
  let result = 1;
  for (let i = 2; i<= num; i++) {
    result = prevNum1 + prevNum2;
    prevNum1 = prevNum2;
    prevNum2 = result;
  }
  return result;  
};

console.log(fibonacciNumber(5));