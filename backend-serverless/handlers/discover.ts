import { createServerlessResponse } from "../interfaces.ts"
import { sortOptions, defMinRate, defMinVoteCount } from "../constants.ts"
import type { SortOption, Country } from "../constants.ts"
import type { Genre } from "../../functions/loadGenres.ts"

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

export async function handleRequestDiscover(params:Filters) {
    const page = params?.page ? params.page:1
    const rate = params?.rate ? params.rate:defMinRate
    const voteCount = params?.voteCount ? params.voteCount:defMinVoteCount
    const dateFrom = params?.dateFrom ? params.dateFrom: ""
    const today = new Date()
    const dateTo = params?.dateTo ? params.dateTo : `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
    const genres = params?.genres ? params.genres.filter(g => g.isChecked) : ""
    const country = params?.countries ? params.countries.filter(c => c.isChecked)[0] : ""
    const sortBy = params?.sortBy ? (params.sortBy.find(s => s.isChecked)?.id ?? sortOptions[0]): sortOptions[0]!.id
    
   
    let genreStr = genres ? parametersToString(genres) : ""

    const filterParams = {
                page,
                rate,
                voteCount, 
                dateFrom, 
                dateTo, 
                sortBy, 
                genres:genreStr, 
                country: country ? (country.id === 0 ? "":country.id):""}
      
   /* const response = await fetch(`${SERVER_URL}/discover`, 
      {method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(filterParams)
      })*/
    
    const response = await fetchMovies(filterParams)
    if (!response) throw new Error("API /discover failed to fetch")
    const data = response.data
    //console.log("movie",data)
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

async function fetchMovies(filterParams:FilterParams) {

    const res = createServerlessResponse()

    if (!filterParams) return res.setStatus(400).addData({error: "Filter parameters missing"}) 
    
    let tmdbBearer = process.env.TMDB_BEARER

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${tmdbBearer}`
        }}

    try {
        const url = `https://api.themoviedb.org/3/discover/`+
            `movie?include_adult=false&include_video=false&language=en-US`+
            `&page=${filterParams.page}`+
            `${filterParams.dateFrom ? "&primary_release_date.gte="+filterParams.dateFrom+"-01-01" : ""}`+
            `${filterParams.dateTo ? "&primary_release_date.lte="+filterParams.dateTo+"-12-31" : ""}`+
            `&sort_by=${filterParams.sortBy}`+
            `&vote_average.gte=${filterParams.rate}`+`&vote_count.gte=${filterParams.voteCount}`+
            `${filterParams.genres ? "&with_genres="+filterParams.genres:""}`+
            `${filterParams.country ? "&with_origin_country="+filterParams.country:""}`
        
        //console.log("URL:"+url)
        
        const response = await fetch(url, options)

        if (!response.ok) {
            throw new Error(`TMDB error: ${response.status}`)
        }

        const data = await response.json()
        return res.setStatus(200).addData(data)
    }
    catch (error) {
        console.error("API /searchMovies failed",error)
        return res.setStatus(500).addData({error: "Failed to fetch movies"})
    }
}
