import "./movie_card.css"

function MovieCard(props) {
    const imagePath = "https://image.tmdb.org/t/p/w500/"
    return(
        <div className="movie-card">
           <div className="poster-container">
                <img src={imagePath+props.srcPoster} 
                className="movie-poster" 
                alt={props.title+"-movie-poster"}></img>
                </div>
            <h3 className="title">{props.title}</h3>
            <p className="description">{props.desc}</p>
            <h4 className="rating">{props.rate}</h4>
        </div>
    )
}

export default MovieCard