import { createContext, useContext, useEffect, useState } from "react";
import SideMenuDiscover from "../side_menu/SideMenuDiscover.jsx";
import MovieList from "./MovieList.jsx";
import { filterMovies } from "../../../api/movieList.js";
import { ActiveDisplayContext } from "../../App.jsx";
import { discoverLabel } from "../side_menu/Navigator.jsx";

export const FilteredMoviesContext = createContext()
export const OpenDropdownContext = createContext()
export const ActivePageContext = createContext()
export const ParametersContext = createContext()

function DiscoverPage() {

    const {toggleActiveDisplay} = useContext(ActiveDisplayContext)
    useEffect(() => {
        toggleActiveDisplay(discoverLabel)
    },[])

    //keep track of which dropdown is open
    const [openDropdown, setOpenDropdown] = useState(null)
    function toggleOpenDropdown(dropdown) {
        setOpenDropdown(o => openDropdown === dropdown? null:dropdown)
    }

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
        <OpenDropdownContext.Provider value={{openDropdown, toggleOpenDropdown}}>
        <FilteredMoviesContext.Provider value={{filteredMovies, sendResults}}>
            <div className="main-content">
                <SideMenuDiscover/>
                <MovieList/>
            </div>
        </FilteredMoviesContext.Provider>
        </OpenDropdownContext.Provider>
        </ActivePageContext.Provider>
        </ParametersContext.Provider>
    )
}

export default DiscoverPage