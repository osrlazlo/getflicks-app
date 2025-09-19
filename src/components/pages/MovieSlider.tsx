import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import { sortOptions } from "./discover/constants"
import { filterMovies } from "../../../api/filterMovies"
import type { SortOption, Genre, Country } from "./discover/constants"
import { labelLatest, labelPopular, labelTopRated } from "./home/HomePage"
import "./movie_slider.css"

interface Movie {
    id:number
    title:string
    overview:string
    poster_path:string
    vote_average:Number
    vote_count:Number
    genre_ids:Number[]
    release_date:Date
}
interface MovieSliderProps {
    label:string
}
interface MoviesFetchRes {
    results:Movie[]
}

interface Filters {
    page?:number
    rate?:number
    voteCount?:number
    dateFrom?:Date
    dateTo?:Date
    sortBy?:SortOption[]
    genres?:Genre[]
    country?:Country[]
}

function SeeMoreButton() {
    return(
        <>
        <button>See More</button>
        </>
    )
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
                            releaseDate={movie.release_date}
                            id={movie.id}
                            title={movie.title} 
                            desc={movie.overview}
                            srcPoster={movie.poster_path}
                            rate={movie.vote_average}
                            voteCount={movie.vote_count}
                            genreIds = {movie.genre_ids}/>
                    </li>
                )):null}
            </div>
        </div>
    )
}
