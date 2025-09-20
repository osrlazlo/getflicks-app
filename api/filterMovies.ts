import { sortOptions } from "../src/components/pages/discover/constants.js"
import { defMinRate, defMinVoteCount } from "../src/components/pages/discover/constants.js"
import type { SortOption, Genre, Country } from "../src/components/pages/discover/constants.js"

export interface Filters {
    page?:number
    rate?:number
    voteCount?:number
    dateFrom?:Date
    dateTo?:Date
    sortBy?:SortOption[]
    genres?:Genre[]
    countries?:Country[]
}

interface Parameters {

}

export function searchMovies(params:Filters) {
    
}

export async function filterMovies(params:Filters) {
    const page = params.page ? params.page:1
    const rate = params.rate ? params.rate:defMinRate
    const voteCount = params.voteCount ? params.voteCount:defMinVoteCount
    const dateFrom = params.dateFrom ? params.dateFrom: ""
    const today = new Date()
    const dateTo = params.dateTo ? params.dateTo : `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
    const genres = params.genres ? params.genres.filter(g => g.isChecked) : ""
    const country = params.countries ? params.countries.filter(c => c.isChecked)[0] : ""
    const sortBy = params.sortBy ? (params.sortBy.find(s => s.isChecked)?.id ?? sortOptions[0]): sortOptions[0]!.id
    
   
    let genreStr = genres ? parametersToString(genres) : ""

    const filterParams = {page:page,
                 rate:rate,
                 voteCount:voteCount, 
                 dateFrom:dateFrom, 
                 dateTo:dateTo, 
                 sortBy:sortBy, 
                 genres:genreStr, 
                 country: country ? (country.id === 0 ? "":country.id):""}
      
    const API_BASE = import.meta.env.VITE_API_BASE
    const response = await fetch(`${API_BASE}/discover`, 
      {method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(filterParams)
      })
    
    if (!response.ok) throw new Error("API /discover.js failed")
    const data = await response.json()
    console.log(data)
    return(data)
}

function parametersToString(list:Genre[]) {
    if (!list) return
    //const blank = "%20"
    const pipe = "%7C"
    let parametersStr = ""
    list.forEach(e => {parametersStr += e.id+pipe})
    return parametersStr
}

export function getMovies() {

}


