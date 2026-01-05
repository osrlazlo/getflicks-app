import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

export default function ProgressPage() {
    return(
        <div className='page'>
          <header>
            <Header/>
          </header>
          <div className="current-page-display"> 
            <div className="progress">
                <p>This page is in progress</p>
            </div>
         </div>
          <footer>
            <Footer/>
          </footer>
        </div>
    )
}