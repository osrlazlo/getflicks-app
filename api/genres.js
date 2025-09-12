import { setCORSHeaders } from "./utils/helpers.js"

async function handler(req, res) {
    setCORSHeaders(res)

    if (req.method === "OPTIONS") {
        return res.status(200).end()
    }

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_BEARER}`
        }}
    
    try {
        const response = await fetch(
            "https://api.themoviedb.org/3/genre/movie/list?language=en",
            options)  

        if (!response.ok) {
            throw new Error(`TMDB error: ${response.status}`)
        }

        const data = await response.json()
        res.status(200).json(data)
    }
    catch(error) {
        console.error("API /genres failed",error)
        res.status(500).json({error: "Failed to fetch genres"})
    }
}

export default handler