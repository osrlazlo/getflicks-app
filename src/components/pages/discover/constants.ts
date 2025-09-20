//SORT OPTIONS
export interface SortOption {
    id:string
    name:string
    isChecked:boolean
}
export const sortOptions:SortOption[] = [        
        {id: "popularity.desc", name: "Most Popular", isChecked:false},
        {id: "popularity.asc", name: "Least Popular", isChecked:false},

        {id: "vote_average.desc", name: "Highest Rating", isChecked:false},
        {id: "vote_average.asc", name: "Lowest Rating", isChecked:false},

        {id: "primary_release_date.desc", name: "Recent Release", isChecked:false},
        {id: "primary_release_date.asc", name: "Oldest Release", isChecked:false},

        {id: "itle.asc", name: "Title (A-Z)", isChecked:false},
        {id: "title.desc", name: "Title (Z-A)", isChecked:false}
    ]

//GENRES
export interface Genre {
    id:number
    name:string
    isChecked?:boolean
}

const API_BASE = import.meta.env.VITE_API_BASE
async function loadGenres() {
    const res = await fetch(`${API_BASE}/genres`)
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

//Default parameters
export const defMinRate = 0
export const defMinVoteCount = 0
export const maxPage = 500