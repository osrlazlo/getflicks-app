async function handler(req, res) {

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")

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
        const data = await response.json()
        res.status(200).json(data)
    }
    catch(error) {
        console.error(error)
    }
    

}

export default handler