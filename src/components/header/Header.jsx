import "./header.css"
import logo_blue_short from "../../assets/blue_short.svg"

function Header() {
    return(
        <div className="header-container">
            <h2>getflicks</h2>
            <p>&nbsp;powered by&nbsp;</p>
            <div className="logo-container">
                <a href="https://www.themoviedb.org/">
                <img id="header-logo" src={logo_blue_short} alt="TMDB logo blue_long_1"></img>
                </a>
            </div>
        </div>
    )
}

export default Header