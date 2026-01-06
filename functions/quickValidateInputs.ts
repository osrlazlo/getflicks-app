import { validEmailRegex, validPasswordRegex, validUsernameRegex } from "../backend-serverless/constants"
import type { InputValidation } from "../backend-serverless/helpers"

export function quickValidateInput(email:string, username:string, password:string, passwordConfirm:string) {
    
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

    if (inputValidation.isEmailValid && inputValidation.isPasswordValid && inputValidation.isUsernameValid) 
        inputValidation.isValid = true
        
    return inputValidation
}