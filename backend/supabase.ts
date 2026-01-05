import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv"

dotenv.config({path:".env.local"})
const supabaseURL = process.env.SUPABASE_URL!
const supabaseKEY = process.env.SUPABASE_KEY!

console.log("url, key", supabaseURL, supabaseKEY)

const supabase = createClient(supabaseURL, supabaseKEY);

export default supabase;


