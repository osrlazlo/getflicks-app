import type { Request, Response } from "express";
import handleRequestGenres from "../../backend-serverless/handlers/genres.ts";
import { setCORSHeaders } from "./utils/helpers.ts";

export default async function handler(req:Request, res:Response) {
    setCORSHeaders(res)
    if (req.method === "OPTIONS") {
        res.status(200).end()
        return
    }

    try {

        const genres = await handleRequestGenres()
        return res.json(genres.data)

    } catch (error) {
        console.error(error)
    }
    
}