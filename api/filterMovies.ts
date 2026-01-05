import handleRequestDiscover from "../backend-serverless/routes/discover.js"
import { sortOptions } from "./constants.js"
import { defMinRate, defMinVoteCount } from "./constants.js"
import type { SortOption, Genre, Country } from "./constants.js"
import { SERVER_URL } from "./utils/serverURL.js" 

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

export interface FilterParams {
  page:number,
  rate:number,
  voteCount:number, 
  dateFrom:string|Date, 
  dateTo:string|Date, 
  sortBy:string|SortOption|undefined, 
  genres:string|undefined, 
  country: string|number
}

interface DiscoverResult {
  data:Object
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
      
   /* const response = await fetch(`${SERVER_URL}/discover`, 
      {method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(filterParams)
      })*/
    
    const response = await handleRequestDiscover(filterParams)
    if (!response) throw new Error("API /discover failed to fetch")
    const data = response.data
    console.log("movie",data)
    if (!data) throw new Error("API /discover no data returned")
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



