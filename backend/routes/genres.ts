import type { Router } from "express";
import express from "express"

const genresRouter:Router = express.Router()

genresRouter.route("/genres").get(async (_, res) => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.TMDB_BEARER}`
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

        return res.status(response.status).json({genres})
    }
    catch(error) {
        console.error("API /genres failed",error)
        return res.status(500)
    }
})

export default genresRouter