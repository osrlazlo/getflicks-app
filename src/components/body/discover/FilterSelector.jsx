import { useState, createContext } from "react"
import SelectCountry from "./SelectCountry"
import SelectDate from "./SelectDate"
import SelectGenre from "./SelectGenre"
import SelectRating from "./SelectRating"
import SelectSortBy from "./SelectSortBy"

export const OpenDropdownContext = createContext()

function FilterSelector() {

    const [openDropdown, setOpenDropdown] = useState(null)
    
    function toggleOpenDropdown(dropdown) {
        setOpenDropdown(o => openDropdown === dropdown? null:dropdown)
    }

    return(
        <div className="filter-selector">
            <button id="discover-button">Recommend</button>
            <OpenDropdownContext.Provider value={{openDropdown, toggleOpenDropdown}}>
                <SelectSortBy/>
                <SelectGenre/>
                <SelectRating/>
                <SelectDate/>
                <SelectCountry/>
            </OpenDropdownContext.Provider>
        </div>
    )
}

export default FilterSelector