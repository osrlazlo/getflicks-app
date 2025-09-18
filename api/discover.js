import { setCORSHeaders} from "./utils/helpers.js"

async function handler(req, res) {
    setCORSHeaders(res)

    if (req.method === "OPTIONS") {
        return res.status(200).end()
    }

    const filterParams = req.body 

    if (!filterParams) return res.status(400).json({error: "Filter parameters missing"}) 

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_BEARER}`
        }}

    try {

        const url = `https://api.themoviedb.org/3/discover/`+
                    `movie?include_adult=false&include_video=false&language=en-US`+
                    `&page=${filterParams.page ? filterParams.page:1}`+
                    `${filterParams.dateFrom ? "&primary_release_date.gte="+filterParams.dateFrom : ""}`+
                    `${filterParams.dateTo ? "&primary_release_date.lte="+filterParams.dateTo : ""}`+
                    `&sort_by=${filterParams.sortBy}`+
                    `&vote_average.gte=${filterParams.rate}`+`&vote_count.gte=${filterParams.voteCount}`+
                    `${filterParams.genres ? "&with_genres="+filterParams.genres:""}`+
                    `${filterParams.country ? "&with_origin_country="+filterParams.country:""}`
        
        console.log("URL:"+url)
        
        const response = await fetch(url, options)

        if (!response.ok) {
            throw new Error(`TMDB error: ${response.status}`)
        }

        const data = await response.json()
        res.status(200).json(data)
    }
    catch (error) {
        console.error("API /searchMovies failed",error)
        res.status(500).json({error: "Failed to fetch movies"})
    }

}

export default handler
