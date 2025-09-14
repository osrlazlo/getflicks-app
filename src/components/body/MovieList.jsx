import { useContext, useEffect, useState } from "react"
import MovieCard from "./MovieCard.jsx"
import "./body.css"

import { FilteredMoviesContext } from "./DiscoverPage.jsx"
import { defMinRate, defMinVoteCount, filterMovies } from "../../../api/movieList.js"
import { sortOptions } from "./discover/constants.js"


function MovieList() {

    const movieList = [{id:"1", title:"title", desc:"desc", srcPoster:"https://image.tmdb.org/t/p/w1280/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg", rate:"100"},
                        {id:"2", title:"title2", desc:"desc2", srcPoster:"link2", rate:"10"}
    ]

    const {filteredMovies, sendResults} = useContext(FilteredMoviesContext)
    const defaultParam = {page:"", rate:"", voteCount:"", dateFrom:"", dateTo:"", sortBy:"", genres:"", countries:""}
    
    useEffect(() => {
        sendResults(filterMovies(defaultParam))
    }, [])
    
    return(
        
        <div className="dicover-container">
                
        <div className="discover-header-results">
            <h3>{} result(s) found</h3>
        </div>
        <div className="discover-movie-list">
            {filteredMovies? filteredMovies.map(movie => (
                <li key={movie.id}>
                    <MovieCard 
                        id={movie.id}
                        title={movie.title} 
                        desc={movie.overview}
                        srcPoster={movie.poster_path}
                        rate={movie.vote_average}
                        voteCount={movie.vote_count}
                        genreIds = {movie.genre_ids}/>
                </li>
            )):<h4>Select filters and click recommend for result!"</h4>}
        </div>
        </div>
    )
}

export default MovieList