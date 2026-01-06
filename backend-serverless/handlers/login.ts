import supabase from "../supabase.js";
import bcryptjs from "bcryptjs";
import { createServerlessResponse } from "../interfaces.js";
import { validEmailRegex, validUsernameRegex } from "../constants.js";

interface LoginValidation {
    isUsernameValid:boolean,
    isPasswordValid:boolean,
    msg?:string,
}

async function handleRequestLogin(emailOrUsername:string, password:string) {

    const res = createServerlessResponse()
    const login: LoginValidation = {
        isUsernameValid:false,
        isPasswordValid:false,
    }

    if (emailOrUsername.includes("@")) {
        if (!emailOrUsername.match(validEmailRegex)) {
            return res.setStatus(400).addData({msg: "Invalid input"})
        }
    } else {
        if (!emailOrUsername.match(validUsernameRegex)) {
            return res.setStatus(400).addData({msg: "Invalid input"})
        }
    }

    try {
    const { data, error } = await supabase
        .from("user_auth")
        .select("password")
        .or(`username.eq.${emailOrUsername}, email.eq.${emailOrUsername}`) 
    
        if (error) throw new Error(error.message)

        if (data.length < 1) {
            return res.setStatus(404).addData({msg: "Username/Email not found"})
        } else login.isUsernameValid = true

        //console.log(data, error)
        const hash = data[0]?.password!
        const isMatch = await bcryptjs.compare(password, hash)
        //console.log(isMatch)

        if (!isMatch) {
            return res.setStatus(400).addData({msg: "Incorrect password"})
        } else login.isPasswordValid = true

        if (login.isUsernameValid && login.isPasswordValid) {
            //console.log("Success")
            return res.setStatus(200).addData({msg: "Success"})
        } else {
            return res.setStatus(500).addData({msg: "An unexpeected error ocured"})
        }

    } catch (error) {
        console.error(error)
        return res.setStatus(500).addData({msg: "An unexpeected error ocured"})
    }
}

export default handleRequestLogin