import type { Request, Response } from "express";
import { setCORSHeaders } from "./utils/helpers.ts";
import { handleRequestDiscover } from "../../backend-serverless/handlers/discover.ts";

export default async function handler(req:Request, res:Response) {
    setCORSHeaders(res)
    if (req.method === "OPTIONS") {
        res.status(200).end()
        return
    }
    
    const { filters } = req.body

    try {

        const movies = await handleRequestDiscover(filters)
        return res.json(movies)

    } catch (error) {
        console.error(error)
    }
    
}