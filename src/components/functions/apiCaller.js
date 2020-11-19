// // Example POST method implementation:
// async function postData(url = '', data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// }

// postData('https://example.com/answer', { answer: 42 })
//   .then(data => {
//     console.log(data); // JSON data parsed by `data.json()` call
//   });

///************************************ */
//apiCaller takes an object with route, method, and body(optional).
export default async function apiCaller (routeInput) {
  let data = { method: routeInput.method }
  //do a check for a body may want to do a check for GET or DELETE method since those should not have a body
  if (routeInput.body) {
    // data = { ...data, body: routeInput.body }
    data = { ...data,headers: {
      'Content-Type': 'application/json',
    },
     body: JSON.stringify(routeInput.body) 
    }
  }
  await console.log(
    `apiCaller() \n`,
    data
  )
  // await console.log(
  //   `apiCaller() \n`,
  //   `routeInput: ${Object.entries(routeInput)} \n`,
  //   `route: ${routeInput.route} \n`,
  //   `method: ${routeInput.method} \n`,
  //   `body: ${
  //     routeInput.body ? Object.entries(routeInput.body) : routeInput.body
  //   } \n`,
  //   `data: ${Object.entries(data)} \n`,routeInput
  // )

  let handleCall = await fetch(`http://localhost:5000${routeInput.route}`, data)
    .then(res => res.json())
    // below is just for checking res data
    .then(data => {
      console.log(`res data is array?: ${Array.isArray(data)}`)
      !Array.isArray(data)
        ? console.log(`apiCaller() - Object res data: ${Object.entries(data)}`)
        : data.map(obj =>
            console.log(`apiCaller() - Array res data ${obj._id}`)
          )
      return data
    })

  return await handleCall
}

// // below works well for GET, refactoring above to account for all http verbs and accept a body
// export default async function apiCaller (routeInput) {
//   console.log(`apiCaller() routeInput: ${routeInput.route}`)
//   let getData = await fetch(`http://localhost:5000${routeInput.route}`, (res, err) => {
//     return res
//   })
//     .then(res => res.json())
//     .then(data => {
//       data.map(obj => console.log(`apiCaller() - res data ${obj._id}`))
//       return data
//     })

//   return getData
// }
