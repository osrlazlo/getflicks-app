import { createServerlessResponse } from "../interfaces.js"

async function handleRequestGenres() {
    const res = createServerlessResponse()
    
    let tmdbBearer = process.env.TMDB_BEARER

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${tmdbBearer}`
        }}
    
    try {
        const response = await fetch(
            "https://api.themoviedb.org/3/genre/movie/list?language=en",
            options)  

        if (!response.ok) {
            throw new Error(`TMDB error: ${response.status}`)
        }
        //console.log(response)
        const data = await response.json()
        const genres = data.genres
        if (!genres) throw new Error("Error fetching genres")

        return res.setStatus(response.status).addData({genres})
    }
    catch(error) {
        console.error("API /genres failed",error)
        return res.setStatus(500)
    }
}

export default handleRequestGenres