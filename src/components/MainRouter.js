import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
//old imports
import Home from './pagesOld/Home'
import RFQ from './pagesOld/RFQ'
import Order from './pagesOld/Order'
import Controler from './pagesOld/Controler'
import Products from './pagesOld/Products'
import Brands from './pagesOld/Brands'
import GSA from './pagesOld/gsa/GSAitems'
import Arcteryx from './pagesOld/arcteryx/Arcteryx'
import PriceLists from './pagesOld/priceLists/PriceLists'
import MainRouterMenu from './MainRouterMenu'

//new imports
import MenuState from '../components/MainRouterNewMenu'
import RFQ2 from '../pagesNew/RFQ'




let sampleUser = {
  emails: [`primaryTestEmail@us-elitegear.com`,`secondTestEmail@us-elitegear.com`,`thirdTestEmail@us-elitegear.com`],
  firstName: `Test firstName`,
  lastName: `Test lastName`,
  phoneNums: [`111-111-1111`,`222-222-2222`,`333-333-3333`],
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
      street: `17 Passaic Ave.`,
      city: `Hawthorne`,
      state: `NJ`,
      zip: `07506`
    }
  },
  gsaQualified: `yes`,
  quotes: [],
  orders: [],
}

export default function MainRouter () {
  const [user, setUser] = useState(sampleUser)
  const [cart, setCart] = useState([])

  const myProps = {
    user: user,
    setUser: setUser,
    cart: cart,
    setCart: setCart,
  }
  return (
    <div>
      <Router>
        <nav>
          <MainRouterMenu/>
          <MenuState />
          {/* <Link to='/'>Home</Link>
          <br />
          <Link to='/rfq'>RFQ</Link>
          <br />
          <Link to='/order'>Order</Link>
          <br />
          <Link to='/controler'>Controler</Link>
          <br />
          <Link to='/products'>Products</Link>
          <br />
          <Link to='/brands'>Brands</Link>
          <br />
          <Link to='/gsa'>GSA</Link>
          <br />
          <Link to='/arcteryx'>Arc'teryx</Link> */}

          {/* <Link to="/">Home</Link> */}
        </nav>

        <Switch>
                    {/* <Route path="/" component={}/> */} {/* Example path */}

          {/* old Routes */}
          {/* <Route path='/rfq' render={()=> (<RFQ user={user} setUser={setUser} cart={cart} setCart={setCart}/>)} /> */}
          <Route path='/rfq' render={()=> (<RFQ myProps={myProps} />)} /> 
          {/* Refactored above to pass props */}
          {/* <Route path='/order' component={Order} /> */}
          <Route path='/controler' component={Controler} />
          <Route path='/products' component={Products} />
          <Route path='/brands' component={Brands} />
          <Route path='/gsa' component={GSA} />
          <Route path='/arcteryx' component={Arcteryx} />
          <Route path='/pricelists' component={PriceLists} />
          {/* Last Route should be least specific */}
          {/* <Route path='/' component={Home} /> */}

          {/* new paths */}
          <Route path='/rfq2' render={()=> (<RFQ2 myProps={myProps} />)} /> 
          <Route path='/order' component={Order} />
          {/* two routes below not in use yet */}
          {/* <Route path='/account' component={Account} /> */}
          {/* <Route path='/account' component={Account} /> */}

          <Route path='/' component={Home} />

        </Switch>
      </Router>
    </div>
  )
}
