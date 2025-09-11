import { useState } from 'react'
import './App.css'

import Header from './components/header/Header.jsx'
import SideMenu from './components/side_menu/SideMenu.jsx'
import Footer from './components/footer/Footer.jsx'
import BodyManager from './components/body/BodyManager.jsx'

function App() {

  return (
    <div className='page-container'>
      <div className='page'>
        <header>
          <Header/>
        </header>
        <div className="main-content">
          <SideMenu/>
          <BodyManager/>
        </div>
        <footer>
          <Footer/>
        </footer>
      </div>
    </div>
  )
}

export default App
