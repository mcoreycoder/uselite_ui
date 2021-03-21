import React, { useState, useEffect } from 'react'
// import formMaker from '../functions/formMaker'
import apiCaller from '../functions/apiCaller'

let getArcItems = () => apiCaller({ route: `/sheets/arcteryx`, method: `GET` })

export default function Arcteryx () {
  const [arcteryxList, setArcItems] = useState([[ "Test GSA"]])

  let mapArcItems = () =>
  arcteryxList.map((item,i )=> (

    <div>
      {item[0]}<br/>
    	<img alt={item[3]} src={item[9]}/> {item[2]}	<br/>
      {item[3]} <br/>
        MSRP: {item[4]} <br/>
        Sizes: {item[5]} <br/>
        Weight: {item[6]} <br/>
        SKU: {item[7]} <br/>
        <hr/>
        
        </div>
  ))

  let showArcItems = mapArcItems()

  useEffect(() => {
    let mounted = true
    getArcItems().then(arcteryxList => {
      if (mounted) {
        setArcItems(arcteryxList)
      }
    })
    return () => (mounted = false)
  }, [])

  return (
    <div>
      <h2>Arc'teryx</h2>
      <hr />
      {/* {getBrandsForm} */}
      <hr />
      {showArcItems}
    </div>
  )
}
