import './App.css'
import { createContext, useContext, useState } from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import DiscoverPage from './components/pages/discover/DiscoverPage'
import { homeLabel, latestLabel, discoverLabel, aboutLabel } from './components/header/Navigator'
import ProgressPage from './ProgressPage.jsx'
import clapperBoardIcon from './assets/clapperboard.svg'
import HomePage from './components/pages/home/HomePage'
import Head from 'next/head'

export const ActiveDisplayContext = createContext()
export const OpenDropdownContext = createContext()

function App() {

  //keep track of which dropdown is open
  const [openDropdown, setOpenDropdown] = useState(null)
  function toggleOpenDropdown(dropdown) {
      setOpenDropdown(o => openDropdown === dropdown? null:dropdown)
  }

  const [activeDisplay, setActiveDisplay] = useState(homeLabel)
  function toggleActiveDisplay(display) {
    setActiveDisplay(p => display)
  }

  return (
    <>
    <Head>
      <title>{`${activeDisplay} | getflicks`}</title>
      <link rel="icon" type="image/svg+xml" href={clapperBoardIcon}/>
    </Head>
    <OpenDropdownContext.Provider value={{openDropdown, toggleOpenDropdown}}>
    <ActiveDisplayContext.Provider value={{activeDisplay, toggleActiveDisplay}}>
      <div className='page-container'>
        <div className='page'>
          <header>
            <Header/>
          </header>
          <div className="current-page-display">
            
              {activeDisplay === discoverLabel? <DiscoverPage/>:null}
              {activeDisplay === homeLabel? <HomePage/>:null}
              {activeDisplay === aboutLabel? <ProgressPage/>:null}
              {activeDisplay === latestLabel? <ProgressPage/>:null}

          </div>
          <footer>
            <Footer/>
          </footer>
        </div>
      </div>
    </ActiveDisplayContext.Provider>
    </OpenDropdownContext.Provider>
    </>
  )
}

export default App
