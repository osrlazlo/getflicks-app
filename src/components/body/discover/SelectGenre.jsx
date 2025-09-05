import { useEffect, useState } from "react";

function SelectGenre() {

    const [genres, setGenres] = useState()

    useEffect(() => {
        async function loadGenres() {
        const res = await fetch("https://getflicks-app.vercel.app/api/genres");
        const data = await res.json();
        setGenres(g => g = data.genres)
        }
        loadGenres()}, 
    [])

    return(
        <div className="genre-list">
            <ul>
               {genres.map(genre => {
                <li key={genre.id}>{genre.name}</li>
               })}
            </ul>
        </div>
    )
}

export default SelectGenre