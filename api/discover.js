export default async function handleSearch(req, res) {
    
    setCORSHeaders(res)
   
    const filterParams = req.body 

    if (!filterParams) return res.status(500).json({error: "Failed to fetch movies"}) 

    if (req.method === "OPTIONS") return res.status(200).end()

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_BEARER}`
        }}

    try {

        const url = `https://api.themoviedb.org/3/discover/
                    movie?include_adult=false&include_video=false&language=en-US&page=1
                    ${filterParams.dateFrom ? "&primary_release_date.gte="+filterParams.dateFrom+"-01-01" : ""}
                    ${filterParams.dateTo ? "&primary_release_date.lte="+filterParams.dateTo+"-01-01" : ""}
                    &sort_by=${filterParams.sortBy}
                    &vote_average.gte=${filterParams.rate}
                    ${filterParams.genre.length ? "&with_genres="+filterParams:""}
                    ${filterParams.country ? "&with_origin_country="+filterParams.countries.id:""}`
        
        console.log(url)
        
        const response = await fetch(url, options)

        if (!response.ok) {
            throw new Error(`TMDB error: ${response.status}`)
        }
    }
    catch (error) {
        console.error("API /searchMovies failed",error)
        res.status(500).json({error: "Failed to fetch movies"})
    }
}
