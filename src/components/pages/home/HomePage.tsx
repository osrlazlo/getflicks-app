import MovieSlider from "../MovieSlider"
import { homeLabel } from "../../header/Navigator" 
import { useEffect, useContext } from "react"
import { ActiveDisplayContext } from "../../../App"
import "./home_page.css"

export const labelTopRated = "Top Rated"
export const labelLatest = "Latest"
export const labelPopular = "Popular"

export default function HomePage(label:string) {

    const {toggleActiveDisplay} = useContext(ActiveDisplayContext)
    useEffect(() => {
        toggleActiveDisplay(homeLabel)
    },[])

    return(
            <div className="main-content">
                <div className="home-page">
                    <MovieSlider label={labelLatest}/>
                    <MovieSlider label={labelPopular}/>
                    <MovieSlider label={labelTopRated}/>                    
                </div>
            </div>
    )
}