import React from 'react'
import formMaker from '../functions/formMaker'
import apiCaller from '../functions/apiCaller'

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
  "pricing": "",
  "options": {
      "colors": [],
      "sizes": [],
      "otherOptions": []
  },
  "shippingDIMs": "",
  "gsa": {
      "modNumber": []
  },
  "productLinks": [],
  "distributors": [],
  "colors": [],
  "sizes": [],
  "otherSeletionOptions": [],
  "brand": "Arc'teryx",
  "productTitle": `Shirt ${7}`,
  "productLink": "",
  "gsaListed": false,
}

const rfqForm = {
  firstName: {
    label: {
      attributes: {},
      content: 'First Name:'
    },
    input: {
      attributes: {},
      content: ''
    }
  },
  lastName: {
    label: {
      attributes: {},
      content: 'Last Name:'
    },
    input: {
      attributes: {},
      content: ''
    }
  },
  email: {
    label: {
      attributes: {},
      content: 'Email:'
    },
    input: {
      attributes: {},
      content: ''
    }
  },
  phone: {
    label: {
      attributes: {},
      content: 'Phone:'
    },
    input: {
      attributes: {},
      content: ''
    }
  },
  streetAddress: {
    label: {
      attributes: {},
      content: 'Street Address:'
    },
    input: {
      attributes: {},
      content: ''
    }
  },
  city: {
    label: {
      attributes: {},
      content: 'City:'
    },
    input: {
      attributes: {},
      content: ''
    }
  },
  state: {
    label: {
      attributes: {},
      content: 'State:'
    },
    input: {
      attributes: {},
      content: ''
    }
  },
  zip: {
    label: {
      attributes: {},
      content: 'Zip:'
    },
    input: {
      attributes: {},
      content: ''
    }
  },
  button: {
    button: {
      attributes: {
        onClick: e => {
          e.preventDefault()
          console.log(`Quote button - clicked`)
          // apiCaller({route: `/users/signup`, method:`POST`, body:mybody}) // throughing error see above
          apiCaller({route: `/products`, method:`POST`, body: myProductBody})
          console.log(`Quote button - fin`)
        }
      },
      content: 'Click Me'
    }
  }
}

const quoteForm = formMaker(rfqForm)

export default function RFQ () {
  return (
    <div>
      Request a quote
      <hr />
      {quoteForm}
    </div>
  )
}
