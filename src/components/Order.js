import React from 'react'
import formMaker from '../formMaker'

const orderRequestForm = {
  rfqNum: {
    label: {
      attributes: { id: 'someId', className: 'someId-className' },
      content: 'RFQ#:'
    },
    input: {
      attributes: { className: 'className' },
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
      attributes: {onClick:((e)=>{
          e.preventDefault();
          console.log(`Order button clicked`)
        })},
      content: 'Click Me'
    },
  },
}



const orderForm = formMaker(orderRequestForm)

export default function Order () {
  return (
    <div>
      Place and Order
      <hr />
      {orderForm}
    </div>
  )
}
