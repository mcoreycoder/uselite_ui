import React, { useState, useEffect } from 'react'
// import formMaker from '../functions/formMaker'
import apiCaller from '../../functions/apiCaller'
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
      if (gsaList[index].GSA_Item_List === 'Current GSA') {
        return gsaList[index - 1][property] === gsaList[index][property]
          ? null
          : gsaList[index][property]
      }
      return gsaList[index][property]
    }

    let newList = gsaList.map((el, index, arr) => {
      let item = {
        GSA_Item_List: el.GSA_Item_List,
        hasNewSKU: checkProp(index, 'hasNewSKU'),
        Last_Mod: checkProp(index, 'Last_Mod'),
        Brand: checkProp(index, 'Brand'),
        SKU: checkProp(index, 'SKU'),
        Product_Name: checkProp(index, 'Product_Name'),
        Unit_of_Measure: checkProp(index, 'Unit_of_Measure'),
        Retail: checkProp(index, 'Retail'),
        GSA_Discount: checkProp(index, 'GSA_Discount'),
        GSA_Price_without_IFF: checkProp(index, 'GSA_Price_without_IFF'),
        GSA_Price_with_IFF: checkProp(index, 'GSA_Price_with_IFF'),
        Country_of_Origin: checkProp(index, 'Country_of_Origin'),
        Description: checkProp(index, 'Description')
      }

      return item
    })

    return setReformList(newList)
  }

  let clickHandle = event => {
    event.preventDefault()
    // run reformFunk
    let funkCheck = () => reformList[0] === 'Reforming GSA Data...' ? reformFunk() : null 
    funkCheck()
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
