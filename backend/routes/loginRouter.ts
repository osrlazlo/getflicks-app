import type { Router } from "express";
import express from "express"
import supabase from "../supabase.ts";
import bcryptjs from "bcryptjs";
import { validEmailRegex, validUsernameRegex } from "../../api/utils/helpers.ts"

const loginRouter:Router = express.Router()

interface LoginValidation {
    isUsernameValid:boolean,
    isPasswordValid:boolean,
    msg?:string,
}

loginRouter.route("/users/login").post(async (req, res) => {

    const login: LoginValidation = {
        isUsernameValid:false,
        isPasswordValid:false,
    }

    const {emailOrUsername, password} = req.body

    if (emailOrUsername.includes("@")) {
        if (!emailOrUsername.match(validEmailRegex)) {
            return res.status(400).json({msg: "Invalid input"})
        }
    } else {
        if (!emailOrUsername.match(validUsernameRegex)) {
            return res.status(400).json({msg: "Invalid input"})
        }
    }

    try {
    const { data, error } = await supabase
        .from("user_auth")
        .select("password")
        .or(`username.eq.${emailOrUsername}, email.eq.${emailOrUsername}`) 
    
        if (error) throw new Error(error.message)

        if (data.length < 1) {
            return res.status(404).json({msg: "Username/Email not found"})
        } else login.isUsernameValid = true

        //console.log(data, error)
        const hash = data[0]?.password!
        const isMatch = await bcryptjs.compare(password, hash)
        //console.log(isMatch)

        if (!isMatch) {
            return res.status(400).json({msg: "Incorrect password"})
        } else login.isPasswordValid = true

        if (login.isUsernameValid && login.isPasswordValid) {
            //console.log("Success")
            return res.status(200).json({msg: "Success"})
        } else {
            return res.status(500).json({msg: "An unexpeected error ocured"})
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json({msg: "An unexpeected error ocured"})
    }
})

export default loginRouter