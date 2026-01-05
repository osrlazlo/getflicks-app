import handleRequestRegister from "../../backend-serverless/routes/register"
import { SERVER_URL } from "../utils/serverURL" 

export async function handleRegister(email:string, username:string, password:string, passwordConfirm:string) {
    /*const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json"
        },
        body: JSON.stringify({
            email, username, password, passwordConfirm
        })
    }
    const res = await fetch(`${SERVER_URL}/users/signup`, options)*/
    const res = await handleRequestRegister(email, username, password, passwordConfirm)
    return res
}







