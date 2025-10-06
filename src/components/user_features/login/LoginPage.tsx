import { Link } from "react-router-dom"
import "./login_page.css"
import Footer from "../../footer/Footer"
export default function LoginPage() {

    return(
        <>
        <div className="login-container">
            <h3>Login</h3>
            <input className="login-input" name="username" type="text" placeholder="Username/email"/><br/>
            <input className="login-input" name="password" type="password" placeholder="Password"/><br/>
            <div className="buttons">
                <button className="login">Login</button>
                <Link to="/sign-up">
                    <button className="create-account">Create an account</button>
                </Link>
            </div>  
        </div>
        <Footer/>
        </>
    )
}