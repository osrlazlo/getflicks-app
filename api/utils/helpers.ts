import type { Response } from "express"

export function setCORSHeaders(res:Response) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
}

export const API_BASE = import.meta.env.VITE_API_BASE

