import MovieCard from "../MovieCard.jsx"
import "../body.css"
import FilterSelector from "./FilterSelector.jsx"

function Discover() {

    const movieList = [{id:"1", title:"title", desc:"desc", srcPoster:"https://image.tmdb.org/t/p/w1280/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg", rate:"100"},
                        {id:"2", title:"title2", desc:"desc2", srcPoster:"link2", rate:"10"}
                    ]

    return(
        <div className="dicover-container">
        <div className="discover-header">
            <FilterSelector/>
        </div>
        <div className="discover-header-results">
            <h3>{} result(s) found</h3>
        </div>
        <div className="discover-movie-list">
            {movieList.map(movie => (
                <li key={movie.id}>
                    <MovieCard 
                        title={movie.title} 
                        desc={movie.desc}
                        srcPoster={movie.srcPoster}
                        rate={movie.rate}/>
                </li>
            ))}
        </div>
        </div>
    )
}

export default Discover