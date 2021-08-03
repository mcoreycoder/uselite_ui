import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import { Link } from 'react-router-dom'

export default function MenuPopupState () {
  return (
    <PopupState variant='popover' popupId='demo-popup-menu'>
      {popupState => (
        <React.Fragment>
          <Button
            variant='contained'
            color='primary'
            {...bindTrigger(popupState)}
          >
            Open Menu
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={popupState.close}>
              <Link to='/'>Home</Link>
            </MenuItem>

            <MenuItem onClick={popupState.close}>
              <Link to='/arcteryx'>Arc'teryx</Link>
            </MenuItem>

            <MenuItem onClick={popupState.close}>
              <Link to='/brands'>Brands</Link>
            </MenuItem>

            <MenuItem onClick={popupState.close}>
              <Link to='/gsa'>GSA</Link>
            </MenuItem>

            <MenuItem onClick={popupState.close}>
              <Link to='/products'>Products</Link>
            </MenuItem>

            <MenuItem onClick={popupState.close}>
              <Link to='/order'>Order</Link>
            </MenuItem>

            <MenuItem onClick={popupState.close}>
              <Link to='/rfq'>RFQ</Link>
            </MenuItem>

            {/* <MenuItem onClick={popupState.close}><Link to='/controler'>Controler</Link></MenuItem> */}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  )
}
