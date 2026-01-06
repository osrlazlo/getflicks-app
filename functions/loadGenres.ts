const API_PATH = import.meta.env.VITE_API_PATH
//GENRES
export interface Genre {
    id:number
    name:string
    isChecked?:boolean
}

export async function loadGenres() {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json"
    }}
    const respone = await fetch(`${API_PATH}/genres`, options)
    const data = await respone?.json()
    //const data = {genres:[]}
    //console.log("data", data)
    const genreList:Genre[] = data.genres.map((g:Genre) => g = {id:g.id, name:g.name, isChecked:false})
    return genreList
}