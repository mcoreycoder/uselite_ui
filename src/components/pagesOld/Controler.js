import React, { useState } from 'react'
import formMaker from '../functionsOld/formMaker'
import apiCaller from '../functionsOld/apiCaller'

export default function Controler () {
  const [deleteInput, setDeleteInput] = useState(``)

  let controlsObject = {
    deleteProduct: {
      label: {
        attributes: {},
        content: 'Delete Product by Id:'
      },
      input: {
        attributes: {
          name: `deletebutton`,
          onChange: e => {
            e.preventDefault()
            console.log(`delete input`)
            setDeleteInput(e.target.value)
          }
        },
        content: ''
      },
      button: {
        attributes: {
          name: `deletebutton`,
          onClick: e => {
            e.preventDefault()
            console.log(`Trying to Delete ID: ${deleteInput}`)
            // apiCaller({route: `/users/signup`, method:`POST`, body:mybody}) // throughing error see above
            apiCaller({ route: `/products/${deleteInput}`, method: `DELETE` })
            console.log(`Deleted`)
          }
        },
        content: 'Delete'
      }
    }
  }

  const controlerForm = formMaker(controlsObject)

  return (
    <div>
      Controls
      <hr />
      {controlerForm}
    </div>
  )
}
