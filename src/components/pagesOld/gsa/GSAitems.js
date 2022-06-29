import React, { useState, useEffect } from 'react'
// import formMaker from '../functions/formMaker'
import apiCaller from '../../functionsOld/apiCaller'
import GSA_TABLE from './GSA_Table'

let getGSAitems = () => apiCaller({ route: `/sheets/gsa`, method: `GET` })

export default function GSA () {
  const [gsaList, setGSAitems] = useState(['Loading GSA Data...'])
  const [reformList, setReformList] = useState(['Reforming GSA Data...'])
  const [reform, setReform] = useState(false)

  // let mapGSAitems = () =>
  //   gsaList.map((item, i) => (
  //     // <div key={brand._id}>
  //     //  Brand id: {brand._id}
  //     //  <br/>
  //     //    {brand.brand} {brand.productTitle}
  //     //   <br />
  //     //   {editBrand === brand._id ? (
  //     //     <div>
  //     //       {' '}
  //     //      {editBrandForm}  {/* inputs */}
  //     //       <hr />
  //     //       {editBrandForm}  {/* edit/delete buttons*/}
  //     //       {' '}
  //     //     </div>
  //     //   ) : (
  //     //     <div>
  //     //       <button onClick={e => handleEdit(brand)}>Edit</button>
  //     //       <button onClick={e => handleDelete(e, brand._id)}>Delete</button>
  //     //     </div>
  //     //   )}
  //     // </div>
  //     <div>
  //       SKU: {item[0]} <br />
  //       PRODUCT NAME: {item[1]} <br />
  //       WHLS(USD): {item[2]} <br />
  //       MSRP: {item[3]} <br />
  //       MAP: {item[4]} <br />
  //       COO: {item[5]} <br />
  //       <hr />
  //     </div>
  //   ))

  // let showGSAitems = mapGSAitems()

  let reformFunk = () => {
    // console.log('button clicked!')
    let checkProp = (index, property) => {
      if (gsaList[index].gsa_item_list === 'Current GSA') {
        return gsaList[index - 1][property] === gsaList[index][property]
          ? null
          : gsaList[index][property]
      }
      return gsaList[index][property]
    }

    let newList = gsaList.map((el, index, arr) => {
      let item = {
        gsa_item_list: el.gsa_item_list,
        hasNewSKU: checkProp(index, 'hasNewSKU'),
        last_mod: checkProp(index, 'last_mod'),
        brand: checkProp(index, 'brand'),
        sku: checkProp(index, 'sku'),
        product_name: checkProp(index, 'product_name'),
        unit_of_measure: checkProp(index, 'unit_of_measure'),
        retail: checkProp(index, 'retail'),
        gsa_discount: checkProp(index, 'gsa_discount'),
        gsa_price_without_iff: checkProp(index, 'gsa_price_without_iff'),
        gsa_price_with_iff: checkProp(index, 'gsa_price_with_iff'),
        country_of_origin: checkProp(index, 'country_of_origin'),
        description: checkProp(index, 'description')
      }

      return item
    })

    return setReformList(newList)
  }

  let clickHandle = event => {
    event.preventDefault()
    // run reformFunk
    if(reformList[0] === 'Reforming GSA Data...') {reformFunk()} 
    setReform(!reform)
  }

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
      GSA <br />
      <button onClick={event => clickHandle(event)}>
        Click to Show {reform === true ? 'Full List' : 'Changes'}
      </button>
      {/* {showGSAitems} */}
      <GSA_TABLE
        gsaList={
          reform === true ? reformList : gsaList
        }
      />
    </div>
  )
}
