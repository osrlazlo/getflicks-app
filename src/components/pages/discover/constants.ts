import { API_BASE } from "../../../../api/utils/helpers"

//SORT OPTIONS
export interface SortOption {
    id:string
    name:string
    isChecked?:boolean
}

export const sortOptions:SortOption[] = [        
        {id: "popularity.desc", name: "Most Popular"},
        {id: "popularity.asc", name: "Least Popular"},

        {id: "vote_average.desc", name: "Highest Rating"},
        {id: "vote_average.asc", name: "Lowest Rating"},

        {id: "primary_release_date.desc", name: "Recent Release"},
        {id: "primary_release_date.asc", name: "Oldest Release"},

        {id: "itle.asc", name: "Title (A-Z)"},
        {id: "title.desc", name: "Title (Z-A)"}
    ]

//GENRES
export interface Genre {
    id:number
    name:string
    isChecked?:boolean
}

async function loadGenres() {
    const res = await fetch(`/api/genres`)
    const data = await res.json();
    const genreList:Genre[] = data.genres.map((g:Genre) => g = {id:g.id, name:g.name, isChecked:false})
    return genreList
}

export const genres = await loadGenres()

//MONTHS
export const months = ["January", "February", "March", "April",
                       "May", "June", "July", "August", "September",
                       "October", "November", "December"]

//Countries
export interface Country {
    id:number
    name:string
    flag:string
    isChecked?:boolean
}