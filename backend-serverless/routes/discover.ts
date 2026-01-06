import type { FilterParams } from "../../api/filterMovies"
import { createServerlessResponse } from "../interfaces"

export async function handleRequestDiscover(filterParams:FilterParams) {

    const res = createServerlessResponse()

    if (!filterParams) return res.setStatus(400).addData({error: "Filter parameters missing"}) 
    
    let tmdbBearer = import.meta.env.VITE_TMDB_BEARER
    if (!tmdbBearer) tmdbBearer = process.env.TMDB_BEARER

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${tmdbBearer}`
        }}

    try {
        const url = `https://api.themoviedb.org/3/discover/`+
            `movie?include_adult=false&include_video=false&language=en-US`+
            `&page=${filterParams.page ? filterParams.page:1}`+
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

export default handleRequestDiscover