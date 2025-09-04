import "./movie_card.css"

function MovieCard(props) {
    return(
        <div className="movie-card">
           <div className="poster-container">
                <img src={props.srcPoster} 
                className="movie-poster" 
                alt={props.title.toLowerCase()+"-movie-poster"}></img>
                </div>
            <h3 className="title">{props.title}</h3>
            <p className="description">{props.desc}c</p>
            <h4 className="rating">{props.rate}</h4>
        </div>
    )
}

export default MovieCard