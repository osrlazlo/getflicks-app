import supabase from "../supabase.ts";
import bcryptjs from "bcryptjs";
import { validateInput, type InputValidation } from "../helpers.ts"
import { createServerlessResponse } from "../interfaces.ts";

export interface SignupResponseData {
    msg:string,
    inputValidation:InputValidation,
}

//user signup 
export async function handleRequestRegister(email:string, username:string, password:string, passwordConfirm:string) {
    
    const res = createServerlessResponse()
 
    const inputValidation = await validateInput(email, username, password, passwordConfirm)
    res.addData({inputValidation})
    
    if (!inputValidation.isValid) {
        return res.setStatus(400).addData({msg: "Invalid inputs"})
    }

    const hash = await bcryptjs.hash(password, 10);

    try {

        const fetchNextId = await supabase
                .from("next_id")
                .select("next_id")
                .eq("name", "next_user_id");

            if (fetchNextId.error) throw new Error()

        console.log("data", fetchNextId.data[0])
        const nextId:number = fetchNextId.data[0]?.next_id

        const updateNextId = await supabase
            .from("next_id")
            .update({next_id: nextId+1})
            .eq("name", "next_user_id")

            if (updateNextId.error) throw new Error()

        const signUpAttempt = await supabase
            .from("user_auth")
            .insert({id: nextId, username, email, password:hash});

            if (signUpAttempt.error) throw new Error() 

        console.log("Success")
        return res.setStatus(200).addData({msg: "Success"})

    } catch (error) {
        console.error(error)
        return res.setStatus(500).addData({msg: "Error"})
    }
}