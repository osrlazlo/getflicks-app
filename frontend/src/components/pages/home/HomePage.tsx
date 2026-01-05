import MovieSlider from "../MovieSlider"
import { homeLabel } from "../../header/Navigator" 
import { useEffect, useContext } from "react"
import { ActiveDisplayContext } from "../../../App"
import "./home_page.css"
import Header from "../../header/Header"
import Footer from "../../footer/Footer"

export const labelTopRated = "Top Rated"
export const labelLatest = "Latest"
export const labelPopular = "Popular"

export default function HomePage() {

    const {toggleActiveDisplay} = useContext(ActiveDisplayContext)!
    
    useEffect(() => {
        toggleActiveDisplay(homeLabel)
    },[]);

    return(
        <div className='page'>
          <header>
            <Header/>
          </header>
          <div className="current-page-display"> 
            <div className="main-content">
                <div className="home-page">
                    <MovieSlider label={labelLatest}/>
                    <MovieSlider label={labelPopular}/>
                    <MovieSlider label={labelTopRated}/>                    
                </div>
            </div>
         </div>
          <footer>
            <Footer/>
          </footer>
        </div>
    )
}