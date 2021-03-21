import React, { useState, useEffect } from 'react'
// import formMaker from '../functions/formMaker'
import apiCaller from '../functions/apiCaller'
import TitlebarGridList from './arcteryx/gridList'

let getArcItems = () => apiCaller({ route: `/sheets/arcteryx`, method: `GET` })

export default function Arcteryx () {
  const [arcteryxList, setArcItems] = useState([ "Test"])

  // let mapArcItems = () =>
  // arcteryxList.map((item,i )=> (

  //   <div key={i}>
  //     {/* {item[0]}<br/>
  //   	<img alt={item[3]} src={item[9]}/> <br/>
  //     {item[2]}	<br/>
  //     {item[3]} <br/>
  //       MSRP: {item[4]} <br/>
  //       Sizes: {item[5]} <br/>
  //       Weight: {item[6]} <br/>
  //       SKU: {item[7]} <br/>
  //       <hr/> */}
        
  //       </div>
  // ))

  // let showArcItems = mapArcItems()

  useEffect(() => {
    let mounted = true
    getArcItems().then(response => {
      if (mounted) {
       let sortedList = response.sort()
        setArcItems(sortedList)
      }
    })
    return () => (mounted = false)
  }, [])

  return (
    <div>
      <h2>Arc'teryx</h2>
      <hr />
      {/* {showArcItems} */}
      <TitlebarGridList data={arcteryxList}/>
    </div>
  )
}
