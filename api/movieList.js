import { sortOptions } from "../src/components/body/discover/constants.js"

let filterParams = ""

export const defMinRate = 7
export const defMinVoteCount = 100

export function searchMovies(params) {
    
}

export async function filterMovies(params) {
    const page = params.page ? params.page:1
    const rate = params.rate ? params.rate:defMinRate
    const voteCount = params.voteCount ? params.voteCount:defMinVoteCount
    const dateFrom = params.dateFrom ? params.dateFrom: ""
    const dateTo = params.dateTo ? params.dateTo: new Date().getFullYear()+1
    const genres = params.genres ? params.genres.filter(g => g.isChecked) : ""
    const country = params.countries ? params.countries.filter(c => c.isChecked)[0] : ""
    const sortBy = params.sortBy ? params.sortBy.filter(s => s.isChecked)[0].id : sortOptions[0].sortCode
    
    if (genres) genres.unshift({paramStr: parametersToString(genres)})

    filterParams = {page:page,
                 rate:rate,
                 voteCount:voteCount, 
                 dateFrom:dateFrom, 
                 dateTo:dateTo, 
                 sortBy:sortBy, 
                 genres:genres, 
                 countries:country.id === 0 ? "":country}  

      const response = await fetch("https://getflicks-app.vercel.app/api/discover", 
        {method: "POST",
         headers: {"Content-Type": "application/json"},
         body: JSON.stringify(filterParams)
        })
    
    if (!response.ok) throw new Error("API /discover.js failed")
    const data = await response.json()
    console.log(data)
    return(data.results)
}

function parametersToString(list) {
    if (!list) return
    //const blank = "%20"
    const pipe = "%7C"
    let parametersStr = ""
    list.forEach(e => {parametersStr += e.id+pipe})
    return parametersStr
}

export function getMovies() {

}


