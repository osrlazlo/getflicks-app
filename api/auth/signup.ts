import type { Request, Response } from "express";
import { API_BASE, setCORSHeaders } from "../utils/helpers";
import supabase from "../utils/supabase";
import bcryptjs  from "bcryptjs";

export async function signUp(email:string, username:string, password:string, passwordConfirm:string) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            accept: "application/json"
        },
        body: JSON.stringify({
            email, username, password, passwordConfirm
        })
    }
    
    const res = await fetch(`${API_BASE}/api/auth/signup`, options)
    return res
}

export default async function handleSignUp(req:Request, res:Response) {
    setCORSHeaders(res)
    const {email, username, password, passwordConfirm} = req.body;
 
    const inputValidation = validateInput(email, username, password, passwordConfirm)
    
    if (inputValidation.isValid) {
        return res.status(400).json({msg: "Invalid inputs", result: inputValidation})
    }

    const hash = await bcryptjs.hash(password, 10);

    try {

        const fetchNextId = await supabase
                .from("next_id")
                .select("next_id")
                .eq("name", "next_user_id");

            if (fetchNextId.error) throw new Error(fetchNextId.error.message)

        console.log("data", fetchNextId.data[0])
        const nextId:number = fetchNextId.data[0]?.next_id

        const signUpAttempt = await supabase
            .from("user_auth")
            .insert({id: nextId, username, email, password:hash});

            if (signUpAttempt.error) throw new Error(signUpAttempt.error.message)
        
        const updateNextId = await supabase
            .from("next_id")
            .update({next_id: nextId+1})
            .eq("name", "next_user_id")

            if (updateNextId.error) throw new Error(updateNextId.error.message)
            
        console.log("Success")
        return res.status(200).json({msg: "Success", result: inputValidation})

    } catch (error) {
        console.error(error)
        return res.status(500).json({msg: "Error", result: inputValidation})
    }
}

interface InputValidation {
    isValid:boolean,
    isEmailValid?:boolean,
    isUsernameValid?:boolean,
    isPasswordValid?:boolean,
    msgEmail?:string,
    msgUsername?:string,
    msgPassword?:string,
}

export const validEmailRegex = /^[a-z0-9_-]+@[a-z]+\.[a-z]{2,4}(\.[a-z]{2,4})?$/
export const validUsernameRegex = /^(?!.*__)[a-z0-9_]{6,}$/
const validPasswordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])[a-zA-Z0-9!@$%?&*#^]{8,}$/

export function validateInput(email:string, username:string, password:string, passwordConfirm:string) {
    
    let inputValidation:InputValidation = {isValid:false, isEmailValid:false, isUsernameValid:false, isPasswordValid:false}

    if (email.length < 1 || !email.match(validEmailRegex) ) {
        inputValidation.msgEmail = "Please enter a valid email" 
    } else inputValidation.isEmailValid = true

    if (!username.match(validUsernameRegex)) {
        inputValidation.msgUsername = "Please enter a valid username"
    } else inputValidation.isUsernameValid = true

    if (password == passwordConfirm) {
        if (!password.match(validPasswordRegex)) {
            inputValidation.msgPassword = "Please enter a valid passowrd"  
        } else inputValidation.isPasswordValid = true
    
    } else inputValidation.msgPassword = "Passwords do not match"

    if (inputValidation.isEmailValid && inputValidation.isPasswordValid && inputValidation.isUsernameValid) 
        inputValidation.isValid = true
        
    return inputValidation
}




