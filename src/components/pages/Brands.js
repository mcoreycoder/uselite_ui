import React, { useState, useEffect } from 'react'
// import formMaker from '../functions/formMaker'
import apiCaller from '../functions/apiCaller'

let getBrands = () => apiCaller({ route: `/sheets/brands`, method: `GET` })

export default function Brands () {
  const [brands, setBrands] = useState([[ "Test GSS Gear"]])

  let mapBrands = () =>
  brands.map((brand,i )=> (
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
        Vendor {i}: {brand[0]}
        <br/>
        {/* Brand: {brand[1]} */}
        <hr/>
        
        </div>
  ))

  let showBrands = mapBrands()

  useEffect(() => {
    let mounted = true
    getBrands().then(brandList => {
      if (mounted) {
        setBrands(brandList)
      }
    })
    return () => (mounted = false)
  }, [])

  return (
    <div>
      Brands
      <hr />
      {/* {getBrandsForm} */}
      <hr />
      showBrands
      {showBrands}
    </div>
  )
}
