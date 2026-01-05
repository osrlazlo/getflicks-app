
import type { Router } from "express";
import express from "express"

/*
import supabase from "../supabase.ts";
import bcryptjs from "bcryptjs";
import { validateInput } from "../../api/utils/helpers.ts";
*/

const signupRouter:Router = express.Router()

/*
//user signup 
signupRouter.route("/users/signup").post(async (req, res) => {
    
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
})
*/

export default signupRouter
