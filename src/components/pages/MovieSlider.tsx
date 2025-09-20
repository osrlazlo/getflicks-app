import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import { sortOptions } from "./discover/constants"
import { filterMovies } from "../../../api/filterMovies"
import type { Filters } from "../../../api/filterMovies"
import type { Movie } from "./MovieCard"
import { labelLatest, labelPopular, labelTopRated } from "./home/HomePage"
import "./movie_slider.css"

interface MovieSliderProps {
    label:string
}
interface MoviesFetchRes {
    results:Movie[]
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
    
    async function getMovieList() {
        const movies:MoviesFetchRes = await filterMovies(filters)
        setMovieList(t => movies)
    }
    
    useEffect(() => {
        getMovieList()  
    },[])

    return(
        
        <div className="slider-container">  
        <div className="slider-header">
            <h3>{label} Movies</h3> <SeeMoreButton/>
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

function SeeMoreButton() {
    return(
        <>
        <button>More</button>
        </>
    )
}
