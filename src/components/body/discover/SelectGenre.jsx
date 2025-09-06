import { useEffect, useState } from "react";
import "./filter_selector.css"

import {FaChevronDown} from "react-icons/fa"
import {FaChevronUp} from "react-icons/fa"

function SelectGenre() {

    const [genres, setGenres] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        async function loadGenres() {
            const res = await fetch("https://getflicks-app.vercel.app/api/genres");
            const data = await res.json();
            const genreList = data.genres.map(g => g = {id:g.id, name:g.name, isChecked:false})
            setGenres(g => genreList)
            console.log(genreList)
        }
        loadGenres()},[])

    function toggleAll(value) {
        const genreList = genres.map(g => g = {id:g.id, name:g.name, isChecked:value})
        setGenres(g => genreList)
    }

    function checkItem(index) {
        const updtSelect = genres.map((g,i) => 
            i === index ? {...g, isChecked:!g.isChecked} : g
        )
        setGenres(g => updtSelect)
    }

    function countChecked() {
        const count = genres.filter(g => g.isChecked == true)
        return count.length
    }

    return(
        <>
        <div className="button-select-genres" onClick={() => setIsOpen(s => !s)}>
            Genres {`(${countChecked()})`}
           {isOpen ? <FaChevronUp className="icon"/> : <FaChevronDown className="icon"/> } 
        </div>
        <div className={"genre-list"+(isOpen? "-open":"")}>
            <div className="header">
                <button id="select-all-genres" onClick={() => toggleAll(true)}>All</button>
                <button id="select-none-genres" onClick={() => toggleAll(false)}>None</button>
             </div> 
             {isOpen? genres.map((g,i) => (
                    <li key={g.id} 
                        className={"genre-item"+(g.isChecked? "-checked":"")} 
                        onClick={() => checkItem(i)}>
                    <input 
                    className="genre-checkbox"
                    id={`checkbox_${g.id}`} 
                    type="checkbox"
                    checked={g.isChecked}
                    onChange={() => checkItem(i)}/>
                    {g.name}
                </li>
               )) : null}
        </div>
        </>
    )
}

export default SelectGenre