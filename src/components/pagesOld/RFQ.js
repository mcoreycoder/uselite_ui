import React, { useState, useEffect } from 'react'
import formMaker from '../functionsOld/formMaker'
import apiCaller from '../functionsOld/apiCaller'
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

export default function RFQ (props) {
  const [firstName, setFirstName] = useState(props.myProps.user.firstName)
  const [lastName, setLastName] = useState(props.myProps.user.lastName)
  const [email, setEmail] = useState(props.myProps.user.emails[0])
  const [phone, setPhone] = useState(props.myProps.user.phoneNums[0])
  const [streetAddress, setStreetAddress] = useState(
    props.myProps.user.addressDetails.shipping.street
  )
  const [city, setCity] = useState(
    props.myProps.user.addressDetails.shipping.city
  )
  const [state, setState] = useState(
    props.myProps.user.addressDetails.shipping.state
  )
  const [zip, setZip] = useState(props.myProps.user.addressDetails.shipping.zip)
  // const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showFilledForm, setShowFilledForm] = useState(true)

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

  let userPropSwitch = (prop, props) => {
    let userProp
    switch (prop) {
      case `email`:
        userProp = props.myProps.user.emails[0]
        break
      case `phone`:
        userProp = props.myProps.user.phoneNums[0]
        break
      case `streetAddress`:
        userProp = props.myProps.user.addressDetails.shipping.street
        break
      case `city`:
        userProp = props.myProps.user.addressDetails.shipping.city
        break
      case `state`:
        userProp = props.myProps.user.addressDetails.shipping.state
        break
      case `zip`:
        userProp = props.myProps.user.addressDetails.shipping.zip
        break

      default:
        userProp = props.myProps.user[`${prop}`]
    }
    return userProp
  }

  let labelMaker = input =>
    `${input.split(/(?=[A-Z])/).reduce((acc, cur) => {
      return acc + ` ` + cur[0].toUpperCase() + cur.substring(1)
    }, ``)}`

  const mapArrToForm = arr => {
    let formObj = {}
    arr.map(el => {
      let setFunkName = `set${labelMaker(el).replace(/\s/g, '')}`
      // console.log(`fillContent: ${fillContent}`)
      console.log(`userProp ${userPropSwitch(el, props)}`)

      formObj = {
        ...formObj,
        [el]: {
          label: {
            attributes: {},
            content: labelMaker(el)
          },
          input: {
            attributes: {
              name: `${el}`,
              placeholder: `${userPropSwitch(el, props)}`,
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

  const filledForm = rfqFormArr.map((el, i) => {
    // let userProp
    // switch (el) {
    //   case `email`:
    //     userProp = props.myProps.user.emails[0]
    //     break
    //   case `phone`:
    //     userProp = props.myProps.user.phoneNums[0]
    //     break
    //   case `streetAddress`:
    //     userProp = props.myProps.user.addressDetails.shipping.street
    //     break
    //   case `city`:
    //     userProp = props.myProps.user.addressDetails.shipping.city
    //     break
    //   case `state`:
    //     userProp = props.myProps.user.addressDetails.shipping.state
    //     break
    //   case `zip`:
    //     userProp = props.myProps.user.addressDetails.shipping.zip
    //     break

    //   default:
    //     userProp = props.myProps.user[`${el}`]
    // }

    return (
      <div key={i}>
        {/* form.{`${el}`}: {eval(el)}
        <br /> */}
        {/* props.myProps.{`${el}`}: {userProp} */} {/*// refactored below*/}
        {`${labelMaker(el)}`}: {userPropSwitch(el, props)}
      </div>
    ) //would be good to refactor and find alternet to eval()
  })

  const buildCart = option => {
    let isInCart = props.myProps.cart.find(el => el.fullSKU === option.fullSKU)
    if (isInCart === undefined) {
      return props.myProps.setCart([...props.myProps.cart, option])
    } else {
      return props.myProps.setCart([
        ...props.myProps.cart.filter(el => el.fullSKU !== option.fullSKU)
      ])
    }
  }

  let viewCart = props.myProps.cart.map((item, i) => {
    return (
      <div key={i}>
        {`${i + 1}.`} {item.fullSKU} {item.upc_color} {item.upc_size}
        <button
          onClick={(e) => {
            e.preventDefault()
            buildCart(item)
          }}
        >
          Remove
        </button>
      </div>
    )
  })

  const toggleView = str => {
    switch (str) {
      case `showFilledForm`:
        setShowFilledForm(!showFilledForm)
        break
      case `showCart`:
        setShowCart(!showCart)
        break
      default:
        return null
    }
  }

  let handleFormToggle = (e, str) => {
    e.preventDefault()

    if (showFilledForm) {
      toggleView(str)
    }
    let newUser = {
      emails: [
        email,
        `secondTestEmail@us-elitegear.com`,
        `thirdTestEmail@us-elitegear.com`
      ],
      firstName: firstName,
      lastName: lastName,
      phoneNums: [phone, `222-222-2222`, `333-333-3333`],
      industry: `GOV`,
      organization: `US-Elitegear`,
      addressDetails: {
        billing: {
          street: `17 Passaic Ave.`,
          city: `Hawthorne`,
          state: `NJ`,
          zip: `07506`
        },
        shipping: {
          street: streetAddress,
          city: city,
          state: state,
          zip: zip
        }
      },
      gsaQualified: `yes`,
      quotes: [],
      orders: []
    }
    props.myProps.setUser(newUser)
    toggleView(str)
  }

  return (
    <div>
      Request a quote
      <hr />
      {/* {quoteForm} */}
      {/* {filledForm} */}
      <button onClick={e => handleFormToggle(e, 'showFilledForm')}>
        {showFilledForm ? `Edit Form` : `Save`}
      </button>
      {showFilledForm === true ? filledForm : quoteForm}
      <br />
      Cart:
      <button
        onClick={e => {
          e.preventDefault()
          toggleView(`showCart`)
        }}
      >
        View Cart
      </button>
      {showCart === true ? viewCart : null}
      <PriceLists
        addToCart={option => buildCart(option)}
        cartItems={props.myProps.cart}
      />
    </div>
  )
}
