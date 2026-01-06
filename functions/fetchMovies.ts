import type { Filters } from "../backend-serverless/handlers/discover"

const API_PATH = import.meta.env.VITE_API_PATH
export async function fetchMovies(filters:Filters) {
    
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            filters,
    })}
    
    const login = await fetch(`${API_PATH}/discover`, options)
    const result = await login.json()
    return result
}