import { sortOptions } from "../src/components/body/discover/sortOptionsModule.js"
import { setCORSHeaders} from "./utils/helpers.js"

let movieList = []
let filterParams = ""
let apiParams = ""

export const defMinRate = 7

export function searchMovies(params) {
    
}

export async function filterMovies(params) {
    const rate = params.rate ? params.rate:defMinRate
    const dateFrom = params.dateFrom ? params.dateFrom: ""
    const dateTo = params.dateTo ? params.dateTo: new Date().getFullYear()+1
    const genres = params.genres ? params.genres.filter(g => g.isChecked) : ""
    const country = params.countries ? params.countries.filter(c => c.isChecked)[0] : ""
    const sortBy = params.sortBy ? params.sortBy.filter(s => s.isChecked)[0] : sortOptions[0]
    
    if (genres) genres.unshift({paramStr: parametersToString(genres)})

    filterParams = {rate:rate, 
                 dateFrom:dateFrom, 
                 dateTo:dateTo, 
                 sortBy:sortBy, 
                 genres:genres, 
                 countries:country.id === 0 ? "":country}  

    console.log(filterParams)
    const response = await fetch("https://getflicks-app.vercel.app/api/discover", 
        {method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(filterParams)
        })
    
    if (!response.ok) throw new Error("API /discover.js failed")
    const data = await response.json() 
    console.log(data)
    return data 
}

function parametersToString(list) {
    if (!list) return
    //const blank = "%20"
    const pipe = "%7C"
    let parametersStr = ""
    list.forEach(e => {parametersStr += e.id+pipe})
    console.log(parametersStr)
    return parametersStr
}

export function getMovies() {

}


