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
            console.log(text);
            loaderOff();
          });
        }
      });
    }
  });
}

calcFibNumber();






// fetch(`http://localhost:5050/fibonacci/42`)
//   .then(handleResponse)
//   .then(data => console.log(data))
//   .catch(error => console.log(error))

// function handleResponse (response) {
//   let contentType = response.headers.get('content-type')
//   if (contentType.includes('application/json')) {
//     return handleJSONResponse(response)
//   } else if (contentType.includes('text/html')) {
//     return handleTextResponse(response)
//   }
// }

// function handleJSONResponse (response) {
//   return response.json()
//     .then(json => {
//       if (response.ok) {
//         return json
//       } else {
//         return Promise.reject(Object.assign({}, json, {
//           status: response.status,
//           statusText: response.statusText
//         }))
//       }
//     })
// }
// function handleTextResponse(response) {
//   return response.text().then((text) => {
//     if (response.ok) {
//       return json;
//     } else {
//       return Promise.reject({
//         status: response.status,
//         statusText: response.statusText,
//         err: text,
//       });
//     }
//   });
// }
