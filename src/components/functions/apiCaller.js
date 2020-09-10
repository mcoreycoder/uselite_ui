export default async function apiCaller (routeInput) {
  console.log(`apiCaller() routeInput: ${routeInput.route}`)
  let getData = await fetch(`http://localhost:5000${routeInput.route}`, (res, err) => {
    return res
  })
    .then(res => res.json())
    .then(data => {
      data.map(obj => console.log(`apiCaller() - res data ${obj._id}`))
      return data
    })

  return getData
}
