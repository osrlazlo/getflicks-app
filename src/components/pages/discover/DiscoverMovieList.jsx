import { useContext, useEffect, useRef, useState } from "react"
import MovieCard from "../MovieCard.jsx"
import "../body.css"

import { FilteredMoviesContext, ActivePageContext, ParametersContext} from "./DiscoverPage.jsx"
import PageButton from "./PageButton.jsx"
import { BiChevronsLeft, BiChevronsRight, BiChevronLeft, BiChevronRight } from "react-icons/bi"


function MovieList() {

    const {filteredMovies} = useContext(FilteredMoviesContext)
    const {activePage, toggleActivePage} = useContext(ActivePageContext)
    const {setParameters} = useContext(ParametersContext)
    const [pages, setPages] = useState([])
    const movieListRef = useRef()

    useEffect(() => {
        const totalPages = filteredMovies.total_pages
        let numPages = []
        if (activePage >= 3)
            for (let i=1; i<=totalPages; i++) {
                if (i >= activePage-2 && i <= activePage+2) {
                    if (numPages.push(i) === 5) break   
                }        
            }
        else numPages = [1,2,3,4,5]
        console.log(numPages)
        setPages(p => numPages)
        if (movieListRef.current) movieListRef.current.scrollTo(0,0)
    },[activePage])

    function nextPage() {
        if (activePage >= filteredMovies.total_pages) return
        changePage(activePage+1)
    }

    function prevPage() {
        if (activePage <= 1) return
        changePage(activePage-1)
    }

    function firstPage() {
        if (activePage === 1) return
          changePage(1)
    }

    function lastPage() {
        if (activePage === filteredMovies.total_pages) return
        changePage(filteredMovies.total_pages)
    }

    function changePage(page) {
        toggleActivePage(page)
        setParameters(p => p = {...p, page:(page)})
    }
    
    return(
        
        <div className="dicover-container">  
            <div className="discover-header-results">
                <h3>{filteredMovies.total_results} result(s) found</h3>
            </div>

            <div className="discover-movie-list" ref={movieListRef}>
                {filteredMovies? filteredMovies.results.map(movie => (
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
                )):<h4>Select filters and click recommend for result!"</h4>}
            </div>
            
            <div className="movie-page-nav">
                <BiChevronsLeft className="nav-icon" onClick={()=>firstPage()}/>
                <BiChevronLeft className="nav-icon" onClick={()=>prevPage()}/>
                {pages.map(p => (
                    <div key={p}><PageButton page={p}/></div>
                ))}
                <BiChevronRight className="nav-icon" onClick={()=>nextPage()}/>
                <BiChevronsRight className="nav-icon"onClick={()=>lastPage()}/>
            </div>
        </div>
    )
}

export default MovieList