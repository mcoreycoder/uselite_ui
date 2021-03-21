import React, { useState, useEffect } from 'react'
import formMaker from '../functions/formMaker'
import apiCaller from '../functions/apiCaller'

let myProductBody = {
  brand: "Arc'teryx",
  sku: '23689',
  productTitle: 'COLD WX HOODY LT GEN 2',
  pricing: {
    wholesale: 0,
    map: 0,
    msrp: 422.0
  },
  countryOfOrigin: 'Canada',
  options: {
    colors: ['Coyote', 'Multicam'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    otherOptions: []
  },
  unitOfMeasure: 'EA',
  productLinks: [
    'https://leaf.arcteryx.com/us/en/shop/mens/cold-wx-hoody-lt-gen-2'
  ],
  shippingDIMs: {
    weigth: '',
    lenght: '',
    width: '',
    height: ''
  },
  gsa: {
    listed: true,
    price: 0
  },
  distributors: ['US Elite']
}
// let myOtherProductBody = {
//   brand: "Arc'teryx",
//   sku: '7188',
//   productTitle: 'H150 Riggers Belt',
//   pricing: {
//     wholesale: 64.5,
//     map: 103.2,
//     msrp: 129.0
//   },
//   countryOfOrigin: 'Canada',
//   options: {
//     colors: ['Coyote', 'Multicam'],
//     sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
//     otherOptions: []
//   },
//   unitOfMeasure: 'EA',
//   productLinks: [],
//   shippingDIMs: {
//     weigth: '',
//     lenght: '',
//     width: '',
//     height: ''
//   },
//   gsa: {
//     listed: true,
//     price: 102.43
//   },
//   distributors: ['US Elite']
// }

export default function Products () {
  const [items, setItems] = useState([])
  const [formItem, setFormItem] = useState(myProductBody) //use myProductBody for quick create
  const [editItem, setEditItem] = useState(null) // this is just the id for the item selected to be edited
  const [itemMapped, setItemMapped] = useState({})

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

  let handleUpdate = (e, id) => { ////update button onChange event handler
    e.preventDefault()
    console.log(`Trying to Update ID: ${id}`)
    apiCaller({ route: `/products/${id}`, method: `PUT`, body: formItem })
      .then(res => res.response)
      .then(res => {
        console.log(`handleUpdate res : `, res)
        getItems()
          .then(items => {
            setItems(items)
          })
          .then(() => {
            setEditItem(null)
            setItemMapped({})
          })
      })
    console.log(`Updated`)
  }

  let onEdit = (e) => { //edit input onChange event handler
    // console.log(`*** e.target.name *** `, e.target.name)
    // console.log(`*** e.target.value *** `, e.target.value)
    const { name, value } = e.target;
    setFormItem({...formItem, [name]: value})
  }

  let editItemMap = item => {
    // let itemMap = items.filter(item => item._id === editItemId)[0]
    console.log(`itemMap`, item)
    // setFormItem(item)
    let mappingItem = {}
    for (const property in item) {
      console.log(`${property}: ${item[property]}`)
      mappingItem = {
        ...mappingItem,
        [property]: {
          label: {
            attributes: {},
            content: `${property}`
          },
          input: {
            attributes: {name: `${property}`, placeholder: `${item[property]}`, onChange: (e)=>onEdit(e) },
            content: ''
          }
        }
      }

      if (typeof item[property] === 'object') {
        console.log('*** we have an object', mappingItem)
      }
    }
    return setItemMapped(mappingItem) //comment out
  }

  let handleEdit = item => {
    console.log(`setEditItem ${item._id}`)
    setEditItem(item._id)
    // add item edit form
    editItemMap(item)
    setFormItem(item)

  }

  //form objects
  const editProduct = {
    // mappedInputs: editItemMap(editItem),
    editButton: {
      button: {
        attributes: {
          onClick: e => {
            e.preventDefault()
            handleUpdate(e, editItem)
            // editItemMap(editItem)
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

  // rendered forms
  const editProductForm = formMaker(editProduct) //edit/delete buttons
  const editItemForm = formMaker(itemMapped) //dont think this is the best way

  const getProductsForm = formMaker(getProducts)

  let mapItems = () =>
    items.map(item => (
      <div key={item._id}>
       Product id: {item._id}
       <br/>
        {item.brand} {item.productTitle}
        <br />
        {editItem === item._id ? (
          <div>
            {' '}
           {editItemForm}  {/* inputs */}
            <hr /> 
            {editProductForm}  {/* edit/delete buttons*/}
            {' '}
          </div>
        ) : (
          <div>
            <button onClick={e => handleEdit(item)}>Edit</button>
            <button onClick={e => handleDelete(e, item._id)}>Delete</button>
          </div>
        )}
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
