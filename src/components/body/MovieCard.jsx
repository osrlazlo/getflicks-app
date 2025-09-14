import { useRef, useState, useEffect, useContext } from "react";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import "./movie_card.css"
import "./dropdown.css"
import {createPopper, offset, viewport} from "@popperjs/core"
import {OpenDropdownContext} from "./DiscoverPage.jsx"
import { genres } from "./discover/constants.js";

function MoreInfo({desc, id, rate, voteCount, genreIds}) {
    const {openDropdown, toggleOpenDropdown} = useContext(OpenDropdownContext)
    const isOpen = openDropdown === id ? true:false
    
    const buttonRef = useRef()
    const dropdownRef = useRef()
    const genreList = genres.filter(g => genreIds.includes(g.id))
    console.log(`${id}IDS:${genreIds}`)
    console.log({genreList})
    useEffect(() => {
        
        function handler(e) {
            if (!isOpen) return
            if (!dropdownRef.current) return
            if (!dropdownRef.current.contains(e.target)) {
                    toggleDropdown()
                }
            }
        document.addEventListener("click", handler)
        return () => {
            document.removeEventListener("click", handler)
        }
    })

    useEffect(() => {
        if (dropdownRef.current && buttonRef.current) {
            createPopper(buttonRef.current, dropdownRef.current,
                {placement: "bottom-start", 
                modifiers: [{name: "offset", options: {offset: [0,5]}},
                            {name: "preventOverflow", options: {boundary: "viewport", padding: 8}},
                            {name: "preventOverflow", options: {boundary: "clippingParents", padding: 4}},
                            {name: "flip", options: {fallbackPlacements: ["top","right"]}}] }
            )
        }
    })

    function toggleDropdown() {
        toggleOpenDropdown(id)
    }

    return(
        <div className="dropdown">
            <div className="button-dropdown" ref={buttonRef}
                onClick={(e) => {e.stopPropagation(); toggleDropdown()}}>
                {isOpen ? <FaMinusSquare className="icon"/> : <FaPlusSquare className="icon"/> } 
            </div>

            {isOpen ?
            <div className={"dropdown-box"+(isOpen? "-open":"")} ref={dropdownRef}>
                 <h4>{`ID: ${id}`}</h4>
                <div>{genreList.map(g => (
                    <button className="desc-genres">{g.name}</button>
                 ))} </div>
                    <p>{desc}<br/><br/>
                    <b>{`Avg: ${rate} - ${voteCount} votes`}</b></p> 
            </div> : null}
        </div>
    )
}

function MovieCard(props) {
    const imagePath = "https://image.tmdb.org/t/p/w500/"
    return(
        <div className="movie-card">
           
                <img src={imagePath+props.srcPoster} 
                className="movie-poster" 
                alt={props.title+"-movie-poster"}></img>
               
            <h3 className="title">{props.title}</h3>
            <h4 className="rating">{props.rate}</h4>
            <MoreInfo desc={props.desc} 
                        id={props.id} 
                        rate={props.rate} 
                        voteCount={props.voteCount}
                        genreIds={props.genreIds}/>
        </div>
    )
}

export default MovieCard