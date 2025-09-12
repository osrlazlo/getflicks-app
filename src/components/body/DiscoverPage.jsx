import { createContext, useState } from "react";
import SideMenuDiscover from "../side_menu/SideMenuDiscover.jsx";
import MovieList from "./MovieList.jsx";

export const FilteredMoviesContext = createContext()

function DiscoverPage() {

    const [filteredMovies, setFilteredMovies] = useState("")
    
    async function sendResults(results) {
        const data = await results
        console.log("results")
        console.log(data)
         setFilteredMovies(m => data)
    }

    return(
        <FilteredMoviesContext.Provider value={{filteredMovies, sendResults}}>
            <SideMenuDiscover/>
            <MovieList/>
        </FilteredMoviesContext.Provider>
    )
}

export default DiscoverPage