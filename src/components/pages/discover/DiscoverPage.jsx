import { createContext, useContext, useEffect, useState } from "react";
import SideMenuDiscover from "../../side_menu/SideMenuDiscover";
import MovieList from "./DiscoverMovieList";
import { filterMovies } from "../../../../api/filterMovies";
import { ActiveDisplayContext } from "../../../App";
import { discoverLabel } from "../../side_menu/Navigator";

export const FilteredMoviesContext = createContext()
export const ActivePageContext = createContext()
export const ParametersContext = createContext()

function DiscoverPage() {

    const {toggleActiveDisplay} = useContext(ActiveDisplayContext)
    useEffect(() => {
        toggleActiveDisplay(discoverLabel)
    },[])

    const [filteredMovies, setFilteredMovies] = useState("")
    async function sendResults(results) {
        const data = await results
         setFilteredMovies(m => data)
    }

    const [parameters, setParameters] = useState({page:1, rate:"", voteCount:"", dateFrom:"", dateTo:"", sortBy:"", genres:"", countries:""})

    const [activePage, setActivePage] = useState(1)
    function toggleActivePage(page) {
        console.log(`NEW-PAGE:${page}`)
        setActivePage(p => page)
    }

    useEffect(() => {
        console.log(parameters)
        console.log(filteredMovies)
        sendResults(filterMovies(parameters))
    },[parameters])

    return(
        <ParametersContext.Provider value={{setParameters}}>
        <ActivePageContext.Provider value={{activePage, toggleActivePage}}>
        <FilteredMoviesContext.Provider value={{filteredMovies, sendResults}}>
            <div className="main-content">
                <SideMenuDiscover/>
                <MovieList/>
            </div>
        </FilteredMoviesContext.Provider>
        </ActivePageContext.Provider>
        </ParametersContext.Provider>
    )
}

export default DiscoverPage