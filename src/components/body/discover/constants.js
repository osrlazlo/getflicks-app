export const sortOptions = [        
        {sortCode: "popularity.desc", name: "Most Popular"},
        {sortCode: "popularity.asc", name: "Least Popular"},

        {sortCode: "vote_average.desc", name: "Highest Rating"},
        {sortCode: "vote_average.asc", name: "Lowest Rating"},

        {sortCode: "primary_release_date.desc", name: "Recent Release"},
        {sortCode: "primary_release_date.asc", name: "Oldest Release"},

        {sortCode: "original_title.asc", name: "Title (A-Z)"},
        {sortCode: "original_title.desc", name: "Title (Z-A)"}
    ]

async function loadGenres() {
    console.log("load genres called")
    const res = await fetch("https://getflicks-app.vercel.app/api/genres");
    const data = await res.json();
    const genreList = data.genres.map(g => g = {id:g.id, name:g.name, isChecked:false})
    return genreList
}

export const genres = await loadGenres()

export const months = ["January", "February", "March", "April",
                       "May", "June", "July", "August", "September",
                       "October", "November", "December"]