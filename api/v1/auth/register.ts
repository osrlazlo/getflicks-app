import type { Request, Response } from "express"
import { handleRequestRegister } from "../../../backend-serverless/handlers/register.ts"
import { setCORSHeaders } from "../utils/helpers.ts"

export default async function handler(req:Request, res:Response) {
    setCORSHeaders(res)
    if (req.method === "OPTIONS") {
        res.status(200).end()
        return
    }
    const { email, username, password, passwordConfirm } = req.body
    console.log(email, username, password)

    const registerAttempt = await handleRequestRegister(email, username, password, passwordConfirm)
    return res.json(registerAttempt)
}







