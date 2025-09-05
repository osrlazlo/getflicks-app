async function handler(req, res) {

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_BEARER}`
        }}

    const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?language=en",
        options)
    
    const data = await response.json()
    res.status(200).json(data)
}

export default handler