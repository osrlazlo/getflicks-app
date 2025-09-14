import { createContext, useState } from "react";
import SideMenuDiscover from "../side_menu/SideMenuDiscover.jsx";
import MovieList from "./MovieList.jsx";

export const FilteredMoviesContext = createContext()
export const OpenDropdownContext = createContext()

function DiscoverPage() {

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

    return(
        <OpenDropdownContext.Provider value={{openDropdown, toggleOpenDropdown}}>
        <FilteredMoviesContext.Provider value={{filteredMovies, sendResults}}>
            <div className="main-content">
                <SideMenuDiscover/>
                <MovieList/>
            </div>
        </FilteredMoviesContext.Provider>
        </OpenDropdownContext.Provider>
    )
}

export default DiscoverPage