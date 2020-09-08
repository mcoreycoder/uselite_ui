import React from 'react'
import './App.css'
import MainRouter from './components/MainRouter'

const us_elitegear_logo = {
  position:'fixed', 
  border: '3px solid green',
  left:'5px'
}

export default function App () {
  return (
    <div className='App'>
      <img
        style={us_elitegear_logo}
        alt='us-elitegear-logo'
        src='https://cdn.shopify.com/s/files/1/1735/4437/files/us-elite-logo-landscape_06a0d777-82b7-4962-a034-00cc86a6dc4d_x55.png?v=1576742234'
      />

      <MainRouter className='App' />
    </div>
  )
}


