import handleRequestLogin from "../../backend-serverless/routes/login"
import { SERVER_URL } from "../utils/serverURL" 
//import jwt from "jsonwebtoken"

export async function handleLogin(emailOrUsername:string, password:string) {
    /*const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json"
        },
        body: JSON.stringify({
            emailOrUsername, password
        })
    }
    const res = await fetch(`${SERVER_URL}/users/login`, options)*/
    const res = await handleRequestLogin(emailOrUsername, password)
    return res
}
