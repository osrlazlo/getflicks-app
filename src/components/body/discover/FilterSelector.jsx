import { useState, createContext } from "react"
import SelectCountry from "./SelectCountry"
import SelectDate from "./SelectDate"
import SelectGenre from "./SelectGenre"
import SelectRating from "./SelectRating"
import SelectSortBy from "./SelectSortBy"
import { filterMovies } from "../../../../api/movieList"

import "./filters.css"

export const OpenDropdownContext = createContext()

function FilterSelector() {

    //keep track of which dropdown is open
    const [openDropdown, setOpenDropdown] = useState(null)
    function toggleOpenDropdown(dropdown) {
        setOpenDropdown(o => openDropdown === dropdown? null:dropdown)
    }

    const [rateParam, setParamRate] = useState()
    const [dateFromParam, setParamDateFrom] = useState()
    const [dateToParam, setParamDateTo] = useState()
    const [sortByParam, setParamSortBy] = useState()
    const [genresParam, setParamGenres] = useState()
    const [countriesParam, setParamCountries] = useState()
    
    return(
        <div className="filter-selector">
            <button id="discover-button" 

            onClick={() => filterMovies({rate:rateParam, 
                                   dateFrom:dateFromParam, 
                                   dateTo:dateToParam, 
                                   sortBy:sortByParam, 
                                   genres:genresParam, 
                                   countries:countriesParam})}>Recommend!</button>

            <OpenDropdownContext.Provider value={{openDropdown, toggleOpenDropdown}}>
                <SelectSortBy setParamSortBy={setParamSortBy}/>
                <SelectGenre setParamGenres={setParamGenres}/>
                <SelectRating setParamRate={setParamRate}/>
                <SelectDate setParamDateFrom={setParamDateFrom} setParamDateTo={setParamDateTo}/>
                <SelectCountry setParamCountries={setParamCountries}/>
            </OpenDropdownContext.Provider>
        </div>
    )
}

export default FilterSelector