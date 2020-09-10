import React from 'react'
import formMaker from '../functions/formMaker'
import apiCaller from '../functions/apiCaller'



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
          apiCaller({route: `/users`})
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
