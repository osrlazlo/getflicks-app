import { Link } from "react-router-dom"
import "./login_page.css"
import Footer from "../../footer/Footer"
import { useState, type MouseEvent } from "react"
import handleLogin from "../../../../api/auth/login"

export default function LoginPage() {

    const [email_username, setEmail_Username] = useState("")
    const [password, setPassword] = useState("")
    
    async function login(event:MouseEvent) {
        event.preventDefault()
        const res = await handleLogin(email_username, password)
        console.log(res.status, res.msg, res.loginValid)
        //const {isEmailValid, isPasswordValid, isUsernameValid} = res.inputValidation!
        /*setIsEmailValid(isEmailValid)
        setIsPasswordValid(isPasswordValid)
        setIsUsernameValid(isUsernameValid)*/
    }

    /*useEffect(() => {
        if (email || username || password || passwordConfirm) {
        
            const {isEmailValid, isPasswordValid, isUsernameValid} = validateInput(email, username, password, passwordConfirm)
            setIsEmailValid(isEmailValid)
            setIsPasswordValid(isPasswordValid)
            setIsUsernameValid(isUsernameValid)
        }

    }, [email, username, password, passwordConfirm])*/

    return(
        <>
        <div className="login-container">
            <BackHomeButton/>
            <h3>Login</h3>
            <form id="login-form" onSubmit= {()=>{}}>
            <label>Email/Username</label>
            <input className={`login-input`} name="email" type="text" placeholder="Email"
                value={email_username} onChange={(e) => setEmail_Username(e.target.value)}/>
            <label>Password</label>
            <input className={`login-input`} name="password" type="password" placeholder="Password"
                value={password} onChange={(e) => setPassword(e.target.value)}/>
            
            <div className="buttons">
                <button className="create-account" onClick={(e) => login(e)}>Login</button>
                <Link to="/signup">
                <button className="login">Create Account</button> 
                </Link>  
            </div>
            </form>
            
        </div>
        <Footer/></>
    )
}

export function BackHomeButton() {
    return (
    <Link to="/">
        <button className="back-home-button"> Home </button>
    </Link>
    )
}