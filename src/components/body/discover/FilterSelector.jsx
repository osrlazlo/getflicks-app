import { useState, useRef, createContext, useContext, useEffect } from "react"
import SelectCountry from "./SelectCountry"
import SelectDate from "./SelectDate"
import SelectGenre from "./SelectGenre"
import SelectRating from "./SelectRating"
import SelectSortBy from "./SelectSortBy"
import SelectVoteCount from "./SelectVoteCount"
import { filterMovies } from "../../../../api/movieList"
import { ActivePageContext, ParametersContext } from "../DiscoverPage"

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
                                   dateFrom:dateFromParam, 
                                   dateTo:dateToParam, 
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