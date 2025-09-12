import { useEffect, useContext, useState } from "react";

import DropdownCheckbox from "./DropdownSelect.jsx";

function SelectGenre({setParamGenres}) {

    const [genres, setGenres] = useState([])
    
    useEffect(() => {
        async function loadGenres() {
            const res = await fetch("https://getflicks-app.vercel.app/api/genres");
            const data = await res.json();
            const genreList = data.genres.map(g => g = {id:g.id, name:g.name, isChecked:false})
            setGenres(g => genreList)
        }
        loadGenres()},[])

   return(<><DropdownCheckbox list={genres} listType="genres" multiple={true} setParam={setParamGenres}/></>)
}

export default SelectGenre