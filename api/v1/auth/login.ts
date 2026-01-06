import type { Request, Response } from "express"
import handleRequestLogin from "../../../backend-serverless/handlers/login.js"
import { setCORSHeaders } from "../utils/helpers.js"
//import jwt from "jsonwebtoken"

export default async function handler(req:Request, res:Response) {
    setCORSHeaders(res)
    if (req.method === "OPTIONS") {
        res.status(200).end()
        return
    }
    const { emailOrUsername, password, } = req.body
    const loginAttempt = await handleRequestLogin(emailOrUsername, password)
    return res.json(loginAttempt)
}
