import supabase from "../utils/supabase"
import bcryptjs  from "bcryptjs"
import { validEmailRegex, validUsernameRegex } from "./signup"
//import jwt from "jsonwebtoken"

interface LoginResponse {
    status?:number,
    setStatus(status:number): LoginResponse,
    msg?: string,
    setMsg(msg:string): LoginResponse,
    loginValid?:LoginValidation,
}

interface LoginValidation {
    isUsernameValid:boolean,
    isPasswordValid:boolean,
    msg?:string,
}

export default async function handleLogin(emailOrUsername:string, password:string) {

    const res: LoginResponse = {
        setStatus(status:number) {
            this.status = status
            return this
        },
        setMsg(msg:string) {
            this.msg = msg
            return this
        },
        loginValid: { isPasswordValid:false, isUsernameValid: false}
    }
    
    if (emailOrUsername.includes("@")) {
        if (!emailOrUsername.match(validEmailRegex)) {
            res!.loginValid!.msg = "invalid input"
            return res.setStatus(500).setMsg("Error")
        }
    } else {
        if (!emailOrUsername.match(validUsernameRegex)) {
            res!.loginValid!.msg = "invalid input"
            return res.setStatus(500).setMsg("Error")
        }
    }

    try {
    const { data, error } = await supabase
        .from("user_auth")
        .select("password")
        .or(`username.eq.${emailOrUsername}, email.eq.${emailOrUsername}`) 
    
        if (error) throw new Error(error.message)

        if (data.length < 1) {
            res!.loginValid!.msg = "username/email not found"
            return res.setStatus(400).setMsg("Error")
        } else res!.loginValid!.isUsernameValid = true

        //console.log(data, error)
        const hash = data[0]?.password!
        const isMatch = await bcryptjs.compare(password, hash)
        //console.log(isMatch)

        if (!isMatch) {
            res!.loginValid!.msg = "incorrect password"
            return res.setStatus(400).setMsg("Error")
        } else res!.loginValid!.isPasswordValid = true

        if (res.loginValid?.isUsernameValid && res.loginValid.isPasswordValid) {
            //console.log("Success")
            return res.setStatus(200).setMsg("Success")
        } else {
            return res.setStatus(500).setMsg("Error")
        }

    } catch (error) {
        console.error(error)
        return res.setStatus(500).setMsg("Error")
    }
}
