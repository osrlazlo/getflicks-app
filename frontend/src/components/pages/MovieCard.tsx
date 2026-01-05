import { useRef, useState, useEffect, useContext } from "react";
import { FaPlusSquare, FaMinusSquare } from "react-icons/fa";
import "./movie_card.css"
import {createPopper, offset, viewport} from "@popperjs/core";
import { OpenDropdownContext, ActiveDisplayContext, GenresContext } from "../../App";
import { months, type Genre } from "../../../../api/constants";
import posterPlaceholder from "../../assets/poster-placeholder.png";
import { homeLabel } from "../header/Navigator";

export interface Movie {
    id:number
    title:string
    overview:string
    poster_path:string
    vote_average:number
    vote_count:number
    genre_ids:number[]
    release_date:Date
};

export default function MovieCard(props:Movie) {
    const imagePath = "https://image.tmdb.org/t/p/w500/";
    const date = new Date(props.release_date);
    const cardDate = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
    const {activeDisplay} = useContext(ActiveDisplayContext)!;

    return(
        <div className="movie-card">
            <div className="image">
                {activeDisplay === homeLabel ? 
                null:<MoreInfo 
                    desc={props.overview} 
                    id={props.id.toString()} 
                    rate={props.vote_average} 
                    voteCount={props.vote_count}
                    genreIds={props.genre_ids}/>}

                <img src={props.poster_path===null? posterPlaceholder:imagePath+props.poster_path} 
                className="movie-poster" 
                alt={props.title+"-movie-poster"}
                onError={e => {(e.currentTarget as HTMLImageElement).src=posterPlaceholder}}></img>
            </div>      
            <h3 className="title">{props.title}</h3>
            <h5 className="card-date">{cardDate}</h5>
            <h4 className="rating">{props.vote_average}</h4>
        </div>
    );
}

//More info component - Dropdown with movie desc
    interface MoreInfoProps {
        desc:string
        id:string
        rate:number
        voteCount:number 
        genreIds:number[]
    };

function MoreInfo({desc, id, rate, voteCount, genreIds}:MoreInfoProps) {

    const [genreList, setGenreList] = useState<Genre[]>()
    const {genres} = useContext(GenresContext)

    useEffect(() => {
        async function getGenres() {
            setGenreList(genres?.filter(g => genreIds.includes(g.id)))
        }
        getGenres()
    },[])

    const {openDropdown, toggleOpenDropdown} = useContext(OpenDropdownContext)!;
    const isOpen = openDropdown === id ? true:false;
    
    const buttonRef = useRef<HTMLDivElement|null>(null);
    const dropdownRef = useRef<HTMLDivElement|null>(null);


    useEffect(() => {
        
        function handler(e:Event) {
            if (!isOpen) return;
            if (!dropdownRef.current) return;
            if (e.target instanceof Node && !dropdownRef.current.contains(e.target)) {
                    toggleOpenDropdown(id);
                }
            };
        document.addEventListener("click", handler);
        return () => {
            document.removeEventListener("click", handler);
        }
    });

    useEffect(() => {
        if (dropdownRef.current && buttonRef.current) {
            createPopper(buttonRef.current, dropdownRef.current,
                {modifiers: [{name: "offset", options: {offset: [0,5]}},
                            {name: "preventOverflow", options: {boundary: "viewport", padding: 8}},
                            {name: "preventOverflow", options: {boundary: "clippingParents", padding: 8}},
                            {name: "flip", options: {fallbackPlacements: ["top", "left"]}}] }
            );
        }
    });

    return(
        <>                
        <div ref={buttonRef} className="button-dropdown"
                onClick={(e) => {e.stopPropagation(); toggleOpenDropdown(id)}}>
            {isOpen ? <FaMinusSquare className="icon"/>:<FaPlusSquare className="icon"/>}
        </div>  
        
        <div className={"dropdown-box"+(isOpen? "-open":"")} ref={dropdownRef}>
                <h4>{`ID: ${id}`}</h4>
            <div className="desc-genres-box">
                {genreList?.map(g => (
                <button key={g.id} className="desc-genres">{g.name}</button>
                ))} </div>
                <p>{desc}<br/><br/>
                <b>{`Avg: ${rate} - ${voteCount} votes`}</b></p> 
        </div> 
        </>
    );
}


