export function setCORSHeaders(res) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173/")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
}

export const API_BASE = window.location.hostname === "localhost" ?
    "https://getflicks-app.vercel.app/api" : "/api"
