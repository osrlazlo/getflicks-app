import './App.css'
import { createContext, useContext, useState } from 'react'
import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import DiscoverPage from './components/body/DiscoverPage.jsx'
import { homeLabel, latestLabel, discoverLabel, aboutLabel } from './components/side_menu/Navigator.jsx'
import ProgressPage from './ProgressPage.jsx'
import clapperBoardIcon from './assets/clapperboard.svg'

export const ActiveDisplayContext = createContext()

function App() {

  const [activeDisplay, setActiveDisplay] = useState(discoverLabel)
  function toggleActiveDisplay(display) {
    setActiveDisplay(p => display)
  }

  return (
    <>
    <head>
      <title>{`${activeDisplay} | getflicks`}</title>
      <link rel="icon" type="image/svg+xml" href={clapperBoardIcon}/>
    </head>
    <div className='page-container'>
      <div className='page'>
        <header>
          <Header/>
        </header>
        <div className="current-page-display">
          <ActiveDisplayContext.Provider value={{activeDisplay, toggleActiveDisplay}}>
            {activeDisplay === discoverLabel? <DiscoverPage/>:
            <ProgressPage/>}
          </ActiveDisplayContext.Provider>
        </div>
        <footer>
          <Footer/>
        </footer>
      </div>
    </div>
    </>
  )
}

export default App
