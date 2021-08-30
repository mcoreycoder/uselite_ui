import React, { useState, useEffect } from 'react'
import formMaker from '../functions/formMaker'
import apiCaller from '../functions/apiCaller'
import PriceLists from './priceLists/PriceLists'

// let myUserbody = {
//   "billing_address": [],
//   "shipping_address": [],
//   "quotes": [],
//   "orders": [],
//   "email": "test@test.com",
//   "fName": "test",
//   "lName": "4",
//   "password": "test", // throughing error: "UnhandledPromiseRejectionWarning: Error: data and salt arguments required" routes/users.js:54:35
//   "userName": "mcoreycoder"
// }

let myProductBody = {
  pricing: '',
  options: {
    colors: [],
    sizes: [],
    otherOptions: []
  },
  shippingDIMs: '',
  gsa: {
    modNumber: []
  },
  productLinks: [],
  distributors: [],
  colors: [],
  sizes: [],
  otherSeletionOptions: [],
  brand: "Arc'teryx",
  productTitle: `Shirt ${7}`,
  productLink: '',
  gsaListed: false
}

export default function RFQ () {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [cart, setCart] = useState([])

  const rfqFormArr = [
    `firstName`,
    `lastName`,
    `email`,
    `phone`,
    `streetAddress`,
    `city`,
    `state`,
    `zip`
  ]

  const mapArrToForm = arr => {
    let formObj = {}
    arr.map(el => {
      let fillContent = `${el.split(/(?=[A-Z])/).reduce((acc, cur)=>{return acc +` `+cur[0].toUpperCase() + cur.substring(1)},``)}`
      let setFunkName = `set${fillContent.replace(/\s/g, '')}`
      // console.log(`fillContent: ${fillContent}`)

      formObj = {...formObj,
        [el]: {
          label: {
            attributes: {},
            content: fillContent
          },
          input: {
            attributes: {
              name: `${el}`,
              onChange: e => {
                e.preventDefault()
                eval(setFunkName)(e.target.value) //works but need to refactor, find a better way without eval()
                
              }
            }
          }
        }
      }
            // console.log(`formObj: ${Object.keys(formObj)}`)

    })
    return formObj
  }

  // const rfqForm = {
  //   firstName: {
  //     label: {
  //       attributes: {},
  //       content: 'First Name:'
  //     },
  //     input: {
  //       attributes: {name:'firstName', onChange: e => {
  //         e.preventDefault()
  //         setFirstName(e.target.value)
  //       }},
  //     }
  //   },
  //   lastName: {
  //     label: {
  //       attributes: {},
  //       content: 'Last Name:'
  //     },
  //     input: {
  //       attributes: {},
  //     }
  //   },
  //   email: {
  //     label: {
  //       attributes: {},
  //       content: 'Email:'
  //     },
  //     input: {
  //       attributes: {},
  //     }
  //   },
  //   phone: {
  //     label: {
  //       attributes: {},
  //       content: 'Phone:'
  //     },
  //     input: {
  //       attributes: {},
  //     }
  //   },
  //   streetAddress: {
  //     label: {
  //       attributes: {},
  //       content: 'Street Address:'
  //     },
  //     input: {
  //       attributes: {},
  //     }
  //   },
  //   city: {
  //     label: {
  //       attributes: {},
  //       content: 'City:'
  //     },
  //     input: {
  //       attributes: {},
  //     }
  //   },
  //   state: {
  //     label: {
  //       attributes: {},
  //       content: 'State:'
  //     },
  //     input: {
  //       attributes: {},
  //     }
  //   },
  //   zip: {
  //     label: {
  //       attributes: {},
  //       content: 'Zip:'
  //     },
  //     input: {
  //       attributes: {},
  //     }
  //   },
  //   button: {
  //     button: {
  //       attributes: {
  //         onClick: e => {
  //           e.preventDefault()
  //           console.log(`Quote button - clicked`)
  //           // apiCaller({route: `/users/signup`, method:`POST`, body:mybody}) // throughing error see above
  //           apiCaller({route: `/products`, method:`POST`, body: myProductBody})
  //           console.log(`Quote button - fin`)
  //         }
  //       },
  //       content: 'Click Me'
  //     }
  //   }
  // }

  // const quoteForm = formMaker(rfqForm)
  const quoteForm = formMaker(mapArrToForm(rfqFormArr))
let buildCart = (option) => {
  let isInCart = cart.find(el => (el.upc_parent_sku + el.upc_variant_sku) === (option.upc_parent_sku + option.upc_variant_sku))
  if(isInCart === undefined)
  {
    // console.log(`added to cart`, isInCart)
    setCart([...cart,option])
  }
  else{
    let removeItem = cart.filter(el => (el.upc_parent_sku + el.upc_variant_sku) !== (option.upc_parent_sku + option.upc_variant_sku))
    console.log(`removeItem`, removeItem)

    return setCart([...removeItem])
  }
}
  return (
    <div>
      Request a quote
      <hr />
      {quoteForm}
      <PriceLists addToCart={(option)=> buildCart(option)} cartItems={cart} />
    </div>
  )
}
