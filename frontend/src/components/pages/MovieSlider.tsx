import { useContext, useEffect, useState } from "react"

//COMPONENTS
import MovieCard from "./MovieCard"

//VARS & FCTS
import { sortOptions } from "../../../../api/constants"
import { filterMovies} from "../../../../api/filterMovies"
import { labelLatest, labelPopular, labelTopRated } from "./home/HomePage"
import { discoverLabel } from "../header/Navigator"

//TYPES
import type { Filters } from "../../../../api/filterMovies"
import type { Movie } from "./MovieCard"

//CONTEXTS
import { ActiveDisplayContext } from "../../App"
import { NavOriginContext } from "../../App"

//STYLES
import "./movie_slider.css"
import { Link } from "react-router-dom"

interface MovieSliderProps {
    label:string
}
interface MoviesFetchRes {
    page:number,
    results:Movie[],
    total_pages:number,
    total_results:number,
}

export default function MovieSlider({label}: MovieSliderProps) {

    let filters:Filters

    switch(label) {
        case labelLatest:
            filters = {sortBy: sortOptions.map(o => o = {...o, isChecked: o.id === "primary_release_date.desc" ? true:false})}
            break
        case labelPopular:
            filters = {sortBy: sortOptions.map(o => o = {...o, isChecked: o.id === "popularity.desc" ? true:false})}
            break
        case labelTopRated:
            filters = {sortBy: sortOptions.map(o => o = {...o, isChecked: o.id === "vote_average.desc" ? true:false}), 
                        voteCount: 300}
            break
        default: filters = {} 
    }
        
    const [movieList, setMovieList] = useState<MoviesFetchRes|undefined>()
    
   
    
    useEffect(() => {
        async function getMovieList() {
            const movies = await filterMovies(filters) as MoviesFetchRes
            setMovieList(movies)
        }
        getMovieList()  
    },[])

    return(
        
        <div className="slider-container">  
        <div className="slider-header">
            <h3>{label} Movies</h3> <SeeMoreButton label={label}/>
        </div>
            <div className="slider-movie-list">
                {movieList? movieList.results.slice(0,10).map(movie => (
                    <li key={movie.id}>
                        <MovieCard 
                            release_date={movie.release_date}
                            id={movie.id}
                            title={movie.title} 
                            overview={movie.overview}
                            poster_path={movie.poster_path}
                            vote_average={movie.vote_average}
                            vote_count={movie.vote_count}
                            genre_ids = {movie.genre_ids}/>
                    </li>
                )):null}
            </div>
        </div>
    )
}


interface SeeMoreProps { label:string }

function SeeMoreButton({label}:SeeMoreProps) {

    const {toggleActiveDisplay} = useContext(ActiveDisplayContext)
    const {toggleNavOrigin} = useContext(NavOriginContext)
    return(
        <Link to="/discover">
        <button onClick={()=> {
            toggleActiveDisplay(discoverLabel),
            toggleNavOrigin(label)}}>More</button>
        </Link>
    )
}
