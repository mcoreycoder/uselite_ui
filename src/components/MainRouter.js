import React from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Home from './Home'
import RFQ from './RFQ'
import Order from './Order'

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

          {/* <Link to="/">Home</Link> */}
        </nav>

        <Switch>
          <Route path='/rfq' component={RFQ} />
          <Route path='/order' component={Order} />

          {/* <Route path="/" component={}/> */}

          {/* Last Route should be least specific */}
          <Route path='/' component={Home} />
        </Switch>
      </Router>
    </div>
  )
}
