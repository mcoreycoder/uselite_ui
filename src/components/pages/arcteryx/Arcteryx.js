import React, { useState, useEffect } from 'react'
// import formMaker from '../functions/formMaker'
import apiCaller from '../../functions/apiCaller'
import TitlebarGridList from './gridList'

let getArcItems = () => apiCaller({ route: `/sheets/arcteryx`, method: `GET` })
// let getArcItems = () => apiCaller({ route: `/sheets/arcteryx`, method: `GET` })

export default function Arcteryx () {
  const [arcteryxList, setArcItems] = useState([ "Test"])

  

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
