import { Link } from "react-router-dom"
import "./login_page.css"
import Footer from "../../footer/Footer"

export default function SignUpPage() {
    return(
        <>
        <div className="login-container">
            <h3>Create an account</h3>
            <input className="login-input" name="email" type="text" placeholder="Email"/>
            <input className="login-input" name="username" type="text" placeholder="Username"/>
            <input className="login-input" name="password" type="password" placeholder="Password"/>
            <input className="login-input" name="confirm-password" type="password" placeholder="Confirm password"/>
            
            <div className="buttons">
                <button className="create-account">Create account</button>
                <Link to="/login">
                <button className="login">Login</button> 
                </Link>  
            </div>
            
        </div>
        <Footer/></>
    )
}