import { createContext, useContext, useEffect, useState } from "react";
import SideMenuDiscover from "../../side_menu/SideMenuDiscover";
import MovieList from "./DiscoverMovieList";
import { ActiveDisplayContext, NavOriginContext } from "../../../App";
import { discoverLabel, homeLabel } from "../../header/Navigator";
import { labelLatest, labelPopular, labelTopRated } from "../home/HomePage";
import { sortOptions } from "../../../../../backend-serverless/constants";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { fetchMovies } from "../../../../../functions/fetchMovies";
export const FilteredMoviesContext = createContext()
export const ActivePageContext = createContext()
export const ParametersContext = createContext()

function DiscoverPage() {

    const {toggleActiveDisplay} = useContext(ActiveDisplayContext)
    useEffect(() => {
        toggleActiveDisplay(discoverLabel)
    },[])

    const {navOrigin} = useContext(NavOriginContext)
   

    const [filteredMovies, setFilteredMovies] = useState("")
    async function sendResults(results) {
        const data = await results
         setFilteredMovies(m => data)
    } 

    const [activePage, setActivePage] = useState(1)
    function toggleActivePage(page) {
        console.log(`NEW-PAGE:${page}`)
        setActivePage(p => page)
    }
    
    const [parameters, setParameters] = useState(() => {
        switch (navOrigin) {
            case homeLabel:
            case labelPopular: return {page:1, rate:"", voteCount:"", dateFrom:"", dateTo:"", sortBy:"", genres:"", countries:""}
            case labelTopRated: return {sortBy: sortOptions.map(o => o = {...o, isChecked: o.id === "vote_average.desc" ? true:false}), voteCount:300}
            case labelLatest: return {sortBy: sortOptions.map(o => o = {...o, isChecked: o.id === "primary_release_date.desc" ? true:false})}
        }})

    useEffect(() => {
        console.log(parameters)
        //console.log(filteredMovies)
        sendResults(fetchMovies(parameters))
    },[parameters])

    return(
        <ParametersContext.Provider value={{setParameters}}>
        <ActivePageContext.Provider value={{activePage, toggleActivePage}}>
        <FilteredMoviesContext.Provider value={{filteredMovies, sendResults}}>
        <div className='page'>
          <header>
            <Header/>
          </header>
          <div className="current-page-display">  <div className="discover-main-content">
                <SideMenuDiscover/>
                <MovieList/>
            </div>
             </div>
          <footer>
            <Footer/>
          </footer>
        </div>
        </FilteredMoviesContext.Provider>
        </ActivePageContext.Provider>
        </ParametersContext.Provider>
    )
}

export default DiscoverPage