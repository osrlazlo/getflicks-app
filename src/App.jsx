import './App.css'

import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import DiscoverPage from './components/body/DiscoverPage.jsx'

function App() {

  return (
    <div className='page-container'>
      <div className='page'>
        <header>
          <Header/>
        </header>
        <div className="main-content">
          <DiscoverPage/>
        </div>
        <footer>
          <Footer/>
        </footer>
      </div>
    </div>
  )
}

export default App
