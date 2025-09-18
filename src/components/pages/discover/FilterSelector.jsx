import { useState, useRef, createContext, useContext, useEffect } from "react"
import SelectCountry from "./SelectCountry.jsx"
import SelectDate from "./SelectDate.jsx"
import SelectGenre from "./SelectGenre.jsx"
import SelectRating from "./SelectRating.jsx"
import SelectSortBy from "./SelectSortBy.jsx"
import SelectVoteCount from "./SelectVoteCount.jsx"
import { filterMovies } from "../../../../api/filterMovies"
import { ActivePageContext, ParametersContext } from "./DiscoverPage"

import "./filters.css"

function FilterSelector() {
 
    const [rateParam, setParamRate] = useState()
    const [voteCountParam, setParamVoteCount] = useState()
    const [dateFromParam, setParamDateFrom] = useState()
    const [dateToParam, setParamDateTo] = useState()
    const [sortByParam, setParamSortBy] = useState()
    const [genresParam, setParamGenres] = useState()
    const [countriesParam, setParamCountries] = useState()

    const {setParameters} = useContext(ParametersContext)
    const {toggleActivePage} = useContext(ActivePageContext)
     
    return(
        <div className="filter-selector">
            <button id="discover-button" 
            onClick={() => {setParameters(p => p = {page:1,
                                   rate:rateParam,
                                   voteCount:voteCountParam, 
                                   dateFrom:dateFromParam? dateFromParam+"-01-01":"", 
                                   dateTo:dateToParam? dateToParam+"-12-31":"", 
                                   sortBy:sortByParam, 
                                   genres:genresParam, 
                                   countries:countriesParam})
                                   toggleActivePage(1)}} >Recommend!</button>

            
                <SelectSortBy setParamSortBy={setParamSortBy}/>
                <SelectGenre setParamGenres={setParamGenres}/>
                <SelectRating setParamRate={setParamRate}/>
                <SelectVoteCount setParamVoteCount={setParamVoteCount}/>
                <SelectDate setParamDateFrom={setParamDateFrom} setParamDateTo={setParamDateTo}/>
                <SelectCountry setParamCountries={setParamCountries}/>
            
        </div>
    )
}

export default FilterSelector