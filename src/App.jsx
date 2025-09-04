import { useState } from 'react'
import './App.css'

import Header from './components/header/Header.jsx'
import SideMenu from './components/side_menu/side_menu.jsx'
import Footer from './components/footer/Footer.jsx'
import BodyManager from './components/body/body_manager.jsx'

function App() {

  return (
    <div className='page-container'>
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
  )
}

export default App
