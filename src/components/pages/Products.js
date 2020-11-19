import React, { useState, useEffect } from 'react'
import formMaker from '../functions/formMaker'
import apiCaller from '../functions/apiCaller'

let myProductBody = {
  pricing: '',
  // options: {
  //   // colors: [],
  //   // sizes: [],
  //   // otherOptions: []
  // },
  shippingDIMs: '',
  // gsa: {
  //   // modNumber: []
  // },
  // productLinks: [],
  // distributors: [],
  // colors: [],
  // sizes: [],
  // otherSeletionOptions: [],
  brand: "Arc'teryx",
  productTitle: `Shirt ${7}`,
  productLink: '',
  gsaListed: false
}
let myOtherProductBody = {
  brand: "Arc'teryx",
  sku: "7188",
  productTitle: "H150 Riggers Belt",
  pricing: {
    wholesale: 64.50,
    map:  103.20,
    msrp: 129.00
  },
  countryOfOrigin: "Canada",
  options: {
    colors: ["Coyote", "Multicam"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXXXL"],
    otherOptions: []
  },
  unitOfMeasure: "EA",
  productLinks: [],
  shippingDIMs: {
    weigth: "",
    lenght: "",
    width: "",
    height: ""
  },
  gsa: {
    listed: true,
    price: 102.43 
  },
  distributors: ["US Elite"]
}
// let myOtherProductBody = {
//   "brand": "Arc'teryx",
//   "sku": "7188",
//   "productTitle": "H150 Riggers Belt",
//   "pricing": {
//     "wholesale": 64.50,
//     "map":  103.20,
//     "msrp": 129.00
//   },
//   "countryOfOrigin": "Canada",
//   "options": {
//     "colors": ["Coyote", "Multicam"],
//     "sizes": ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "XXXXL"],
//     "otherOptions": []
//   },
//   "unitOfMeasure": "EA",
//   "productLinks": [],
//   "shippingDIMs": {
//     "weigth": "",
//     "lenght": "",
//     "width": "",
//     "height": ""
//   },
//   "gsa": {
//     "listed": true,
//     "price": 102.43 
//   },
//   "distributors": []
// }

export default function Products () {
  const [items, setItems] = useState([])
  const [formItem, setFormItem] = useState(myOtherProductBody)
  const [editItem, setEditItem] = useState(null)

  let getItems = () => apiCaller({ route: `/products`, method: `GET` })

  let handleCreate = (e, newItem) => {
    e.preventDefault()
    console.log(`Trying to create: `, newItem)
    apiCaller({ route: `/products`, method: `POST`, body: newItem })
      .then(res => res.response)
      .then(res => {
        console.log(`products res : ${res}`)
        getItems().then(items => {
          setItems(items)
        })
      })
    // console.log(`Updated`)
  }
  
  let handleDelete = (e, id) => {
    e.preventDefault()
    console.log(`Trying to Delete ID: ${id}`)
    apiCaller({ route: `/products/${id}`, method: `DELETE` })
      .then(res => res.response)
      .then(res => {
        console.log(`res : ${res.deletedCount}`)
        getItems().then(items => {
          setItems(items)
        })
      })
    console.log(`Deleted`)
  }

  let handleUpdate = (e, id) => {
    e.preventDefault()
    console.log(`Trying to Update ID: ${id}`)
    apiCaller({ route: `/products/${id}`, method: `PUT`, body: formItem })
      .then(res => res.response)
      .then(res => {
        console.log(`handleUpdate res : `, res)
        getItems().then(items => {
          setItems(items)
        }).then(setEditItem(null))
      })
    console.log(`Updated`)
  }

  let handleEdit = id => {
    console.log(`setEditItem ${id}`)
    setEditItem(id)
  }

  let editItemMap = (editItem)=>{
    let itemMap = items.filter(item => item._id === editItem)
    console.log(`itemMap`, itemMap)
    // itemMap
  }
  const editProduct = {
    // mappedInputs: editItemMap(editItem),
    editButton: {
      button: {
        attributes: {
          onClick: e => {
            e.preventDefault()
            // handleUpdate(e, editItem)
            editItemMap(editItem)
          }
        },
        content: 'Update'
      }
    },
    cancelButton: {
      button: {
        attributes: {
          onClick: e => {
            e.preventDefault()
            setEditItem(null)
          }
        },
        content: 'Cancel'
      }
    }
  }
  const getProducts = {
    getButton: {
      button: {
        attributes: {
          onClick: e => {
            e.preventDefault()
            console.log(`Quote button - clicked`)
            // let getItems = console.log("getItems")
            //   let getItems = apiCaller({ route: `/products`, method: `GET` }).then((res) => setItems(res))
            getItems()
            console.log(`Quote button - fin`)
            // return getItems
          }
        },
        content: 'Refresh List'
      }
    },
    createButton: {
      button: {
        attributes: {
          onClick: e => {
            e.preventDefault()
            handleCreate(e, formItem)
          }
        },
        content: 'Create Item'
      }
    }
  }

  const editProductForm = formMaker(editProduct)
  const getProductsForm = formMaker(getProducts)

  let mapItems = () =>
    items.map(item => (
      <div key={item._id}>
        Product id {item._id}: {item.brand} {item.productTitle}
        <br/>
        <button onClick={e => handleEdit(item._id)}>Edit</button>
        <button onClick={e => handleDelete(e, item._id)}>Delete</button>
        {editItem === item._id ? editProductForm : null}
      </div>
    ))

  let showProducts = mapItems()

  useEffect(() => {
    let mounted = true
    getItems().then(items => {
      if (mounted) {
        setItems(items)
      }
    })
    return () => (mounted = false)
  }, [])

  return (
    <div>
      Products
      <hr />
      {getProductsForm}
      <hr />
      {showProducts}
    </div>
  )
}
