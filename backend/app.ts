import express from "express";
import type { Express } from "express";
import cors from "cors"
import path, { dirname } from "path"
import { fileURLToPath } from "url";
import signupRouter from "./routes/signupRouter.ts";
import loginRouter from "./routes/loginRouter.ts";
import genresRouter from "./routes/genres.ts";
import discoverRouter from "./routes/discover.ts";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api", signupRouter)
app.use("/api", loginRouter)
app.use("/api", genresRouter)
app.use("/api", discoverRouter)

app.use(express.static(path.join(__dirname, "../dist")))
app.get("/{*any}", (_, res) => {
    res.sendFile(path.join(__dirname, "../dist/index.html"))
})

export default app