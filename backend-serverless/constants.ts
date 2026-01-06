
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

        {id: "title.asc", name: "Title (A-Z)", isChecked:false},
        {id: "title.desc", name: "Title (Z-A)", isChecked:false}
    ]

//GENRES
export interface Genre {
    id:number
    name:string
    isChecked?:boolean
}

interface GenresResponse extends Object {
    genres: Genre[]
}

export async function loadGenres() {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json"
    }}
    const respone = await fetch(`http://localhost:3000/api/v1/genres`, options)
    const data = await respone?.json()
    //const data = {genres:[]}
    //console.log("data", data)
    const genreList:Genre[] = data.genres.map((g:Genre) => g = {id:g.id, name:g.name, isChecked:false})
    return genreList
}

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

export const validEmailRegex = /^[a-z0-9_-]+@[a-z]+\.[a-z]{2,4}(\.[a-z]{2,4})?$/
export const validUsernameRegex = /^(?!.*__)[a-z0-9_]{6,}$/
export const validPasswordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@$%?&*#^]{8,}$/