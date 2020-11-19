import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from './pages/Home'
import RFQ from './pages/RFQ'
import Order from './pages/Order'
import Controler from './pages/Controler'
import Products from './pages/Products.js'

export default function MainRouter () {
  return (
    <div>
      <Router>
        <nav>
          <Link to='/'>Home</Link>
          <br />
          <Link to='/rfq'>RFQ</Link>
          <br />
          <Link to='/order'>Order</Link>
          <br />
          <Link to='/controler'>Controler</Link>
          <br />
          <Link to='/products'>Products</Link>

          {/* <Link to="/">Home</Link> */}
        </nav>

        <Switch>
          <Route path='/rfq' component={RFQ} />
          <Route path='/order' component={Order} />
          <Route path='/controler' component={Controler} />
          <Route path='/products' component={Products} />

          {/* <Route path="/" component={}/> */}

          {/* Last Route should be least specific */}
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    </div>
  )
}
