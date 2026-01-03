import { Link } from "react-router-dom"
import "./login_page.css"
import Footer from "../../footer/Footer"
import { BackHomeButton } from "./LoginPage"
import { useEffect, useState, type MouseEvent } from "react"
import { signUp, validateInput } from "../../../../api/auth/signup"

export default function SignUpPage() {

    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [isEmailValid, setIsEmailValid] = useState<undefined|boolean>()
    const [isUsernameValid, setIsUsernameValid] = useState<undefined|boolean>()
    const [isPasswordValid, setIsPasswordValid] = useState<undefined|boolean>()
    

    async function register(event:MouseEvent) {
        event.preventDefault()
        const res = await signUp(email, username, password, passwordConfirm)
        const data = await res.json()
        console.log(res.status, res,)
        const {isEmailValid, isPasswordValid, isUsernameValid} = data.inputValidation
        setIsEmailValid(isEmailValid)
        setIsPasswordValid(isPasswordValid)
        setIsUsernameValid(isUsernameValid)
    }

    useEffect(() => {
        if (email || username || password || passwordConfirm) {
        
            const {isEmailValid, isPasswordValid, isUsernameValid} = validateInput(email, username, password, passwordConfirm)
            setIsEmailValid(isEmailValid)
            setIsPasswordValid(isPasswordValid)
            setIsUsernameValid(isUsernameValid)
        }

    }, [email, username, password, passwordConfirm])

    return(
        <>
        <div className="login-container">
            <BackHomeButton/>
            <h3>Create an account</h3>
            <form id="login-form" onSubmit= {()=>{}}>
            <label>Email</label>
            <input className={`login-input ${isEmailValid == undefined ? '' : (isEmailValid ? 'valid-input':'invalid-input')}`} name="email" type="text" placeholder="Email"
                value={email} onChange={(e) => setEmail(e.target.value)}/>
            <label>Username</label>
            <input className={`login-input ${isUsernameValid == undefined ? '' : (isUsernameValid ? 'valid-input':'invalid-input')}`} name="username" type="text" placeholder="Username"
                value={username} onChange={(e) => setUsername(e.target.value)}/>
            <label>Password</label>
            <input className={`login-input ${isPasswordValid == undefined ? '' : (isPasswordValid ? 'valid-input':'invalid-input')}`} name="password" type="password" placeholder="Password"
                value={password} onChange={(e) => setPassword(e.target.value)}/>
            <label>Confirm Password</label>
            <input className={`login-input ${isPasswordValid == undefined ? '' : (isPasswordValid ? 'valid-input':'invalid-input')}`} name="confirm-password" type="password" placeholder="Confirm password"
                value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
            
            <div className="buttons">
                <button className="create-account" onClick={(e) => register(e)}>Create account</button>
                <Link to="/login">
                <button className="login">Login</button> 
                </Link>  
            </div>
            </form>
            
        </div>
        <Footer/></>
    )
}