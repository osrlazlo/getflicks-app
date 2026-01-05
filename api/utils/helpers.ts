import type { Response } from "express"

export function setCORSHeaders(res:Response) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
}

export interface InputValidation {
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