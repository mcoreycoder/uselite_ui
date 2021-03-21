import React, { useState, useEffect } from 'react'
// import formMaker from '../functions/formMaker'
import apiCaller from '../functions/apiCaller'

let getGSAitems = () => apiCaller({ route: `/sheets/gsa`, method: `GET` })

export default function GSA () {
  const [gsaList, setGSAitems] = useState([[ "Test GSA"]])

  let mapGSAitems = () =>
  gsaList.map((item,i )=> (
    // <div key={brand._id}>
    //  Brand id: {brand._id}
    //  <br/>
    //    {brand.brand} {brand.productTitle} 
    //   <br />
    //   {editBrand === brand._id ? (
    //     <div>
    //       {' '}
    //      {editBrandForm}  {/* inputs */}
    //       <hr /> 
    //       {editBrandForm}  {/* edit/delete buttons*/}
    //       {' '}
    //     </div>
    //   ) : (
    //     <div>
    //       <button onClick={e => handleEdit(brand)}>Edit</button>
    //       <button onClick={e => handleDelete(e, brand._id)}>Delete</button>
    //     </div>
    //   )}
    // </div>
    <div>
        SKU: {item[0]} <br/>
    	PRODUCT NAME: {item[1]}	<br/>
        WHLS(USD): {item[2]} <br/>
        MSRP: {item[3]} <br/>
        MAP: {item[4]} <br/>
        COO: {item[5]} <br/>
        <hr/>
        
        </div>
  ))

  let showGSAitems = mapGSAitems()

  useEffect(() => {
    let mounted = true
    getGSAitems().then(gsaList => {
      if (mounted) {
        setGSAitems(gsaList)
      }
    })
    return () => (mounted = false)
  }, [])

  return (
    <div>
      GSA Item List
      <hr />
      {/* {getBrandsForm} */}
      <hr />
      showGSAitems
      {showGSAitems}
    </div>
  )
}
