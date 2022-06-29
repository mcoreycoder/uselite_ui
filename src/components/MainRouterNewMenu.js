import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { Link } from 'react-router-dom'

let headerStyle = {
  //   paddingTop: `.1em`,
  // paddingBottom: `.5em`,
  // border: `1px solid #a2a2a2`,
  border: '1px solid black',

  backgroundColor: `grey`,
  borderRadius: `25px`,
  display: `flex`,
  justifyContent: `space-evenly`

  // alignItems: `center`,
}

let mainNav = {
  border: '1px solid black',
  borderRadius: `15px`,
  backgroundColor: `grey`,

  padding: `10px 10px`,
  // textTransform: `uppercase`,
  // textAlign: `center`,
  // display: `block`,
  //   color: `#34495e`,
  fontSize: `1.5em`,
  //   flex: `auto`,
  flexDirection: `row-reverse`
}

let selectedMainNav = {
  // position: `fixed`,
  border: '10px solid green',
  borderRadius: `100px`,
  backgroundColor: `black`,

  padding: `10px 10px`,
  // textTransform: `uppercase`,
  // textAlign: `center`,
  // display: `block`,
  //   color: `#34495e`,
  fontSize: `1.5em`,
  //   flex: `auto`,
  flexDirection: `row-reverse`
}

let us_elitegear_logo = {
  //   position: `fixed`,
  border: '1px solid black'
  // left: '18px'
}

export default function MenuState () {
  const [selectedLink, setSelectedLink] = useState(`Home`) // looking to set state to render different background color for selected component

  const chooseStyle = str => {
    return selectedLink === str ? selectedMainNav : mainNav
  }

  return (
    <header style={headerStyle}>
      <h1>
        <img
          style={us_elitegear_logo}
          alt='us-elitegear-logo'
          src='https://cdn.shopify.com/s/files/1/1735/4437/files/us-elite-logo-landscape_06a0d777-82b7-4962-a034-00cc86a6dc4d_x55.png?v=1576742234'
        />
      </h1>
      <h1 style={chooseStyle(`Home`)}>
        <Link
          onClick={e => {
            // e.preventDefault()
            setSelectedLink(`Home`)
          }}
          to='/'
        >
          Home
        </Link>
      </h1>
      <h1 style={chooseStyle(`RFQ`)}>
        <Link
          onClick={e => {
            // e.preventDefault()
            setSelectedLink(`RFQ`)
          }}
          to='/rfq2'
        >
          RFQ2
        </Link>
      </h1>
      <h1 style={chooseStyle(`Order`)}>
        <Link
          onClick={e => {
            // e.preventDefault()
            setSelectedLink(`Order`)
          }}
          to='/order'
        >
          Order
        </Link>
      </h1>

      {/* --- below not in use yet --- */}
      {/* <h1 style={chooseStyle(`Account`)}>
        <Link
          onClick={e => {
            // e.preventDefault()
            setSelectedLink(`Account`)
          }}
          to='/account'
        >
          Catalog
        </Link>
      </h1> */}

      {/* <h1 style={chooseStyle(`Catalog`)}>
        <Link
          onClick={e => {
            // e.preventDefault()
            setSelectedLink(`Catalog`)
          }}
          to='/catalog'
        >
          Catalog
        </Link>
      </h1> */}

    </header>
  )
}
