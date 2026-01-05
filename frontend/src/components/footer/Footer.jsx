import logo_blue_short from "../../assets/blue_short.svg"
import { FaGithubSquare, FaLinkedin } from "react-icons/fa"

function Footer() {
    return(
        <>
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
        <div className="contact-info">
            <p>Developped by Abdoul Kone (osrlazlo)</p>
            <a href="https://github.com/osrlazlo" target="blank"><FaGithubSquare className="contact-icon"/></a>
            <a href="https://www.linkedin.com/in/abdoul-kone-a23a94353/" target="blank"><FaLinkedin className="contact-icon"/></a>
        </div>
        </>
    )
}

export default Footer