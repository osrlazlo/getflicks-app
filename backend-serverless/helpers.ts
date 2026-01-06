import { validEmailRegex, validPasswordRegex, validUsernameRegex } from "./constants.js"
import supabase from "./supabase.js"

export interface InputValidation {
    isValid:boolean,
    isEmailValid?:boolean,
    isUsernameValid?:boolean,
    isPasswordValid?:boolean,
    msgEmail?:string,
    msgUsername?:string,
    msgPassword?:string,
}

export async function validateInput(email:string, username:string, password:string, passwordConfirm:string) {
    
    let inputValidation:InputValidation = {isValid:false, isEmailValid:false, isUsernameValid:false, isPasswordValid:false}

    //check input validity
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

    //check if user already exists
    const emailExists = await supabase
        .from("user_auth")
        .select("email")
        .eq("email", email)
        console.log(emailExists)
    if (emailExists.data![0]) {
        inputValidation.msgEmail = "A user with this email already exists"
        inputValidation.isEmailValid = false
    }

    const usernameExists = await supabase
        .from("user_auth")
        .select("username")
        .eq("username", username)
    if (usernameExists.data![0]) {
        inputValidation.msgUsername = "A user with this username already exists"
        inputValidation.isUsernameValid = false
    }

    if (inputValidation.isEmailValid && inputValidation.isPasswordValid && inputValidation.isUsernameValid) 
        inputValidation.isValid = true
        
    return inputValidation
}