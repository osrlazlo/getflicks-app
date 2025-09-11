import logo_blue_short from "../../assets/blue_short.svg"
import "./footer.css"

function Footer() {
    return(
        <div className="footer-container">
            <p>&copy; {new Date().getFullYear()} getflicks - All data sourced from &nbsp;</p>
        <div className="logo-container">
            <a href="https://www.themoviedb.org/" target="blank">
            <img id="logo" src={logo_blue_short} alt="TMDB logo blue_short"></img>
            </a>
        </div>
        <div className="logo-container">
                <a href="https://restcountries.com/#rest-countries" target="blank">
                <h3>REST Countries</h3>
                </a>
        </div>
        </div>
    )
}

export default Footer