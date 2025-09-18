import SideMenu from "../../side_menu/SideMenu"
import LatestMovies from "./LatestMovies"
import PopularMovies from "./PopularMovies"
import MovieSlider from "../MovieSlider"


import { homeLabel } from "../../side_menu/Navigator"
import { useEffect, useContext } from "react"
import { ActiveDisplayContext } from "../../../App"

export const labelTopRated = "Top Rated"
export const labelLatest = "Latest"
export const labelPopular = "Popular"

export default function HomePage(label:string) {

    const {toggleActiveDisplay} = useContext(ActiveDisplayContext)
    useEffect(() => {
        toggleActiveDisplay(homeLabel)
    },[])

    return(
        <>
            <div className="main-content">
                <SideMenu/>
                <div className="home-page">
                    <MovieSlider label={labelTopRated}/>
                    <MovieSlider label={labelLatest}/>
                    <MovieSlider label={labelPopular}/>
                </div>
            </div>
        </>
    )
}