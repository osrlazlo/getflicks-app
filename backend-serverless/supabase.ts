import { createClient } from "@supabase/supabase-js";

let supabaseURL = import.meta.env.VITE_SUPABASE_URL
if (!supabaseURL) supabaseURL = process.env.SUPABASE_URL

let supabaseKEY = import.meta.env.VITE_SUPABASE_KEY
if (!supabaseKEY) supabaseKEY = process.env.SUPABASE_KEY

console.log("supabase url, supabase key", supabaseURL, supabaseKEY)

const supabase = createClient(supabaseURL, supabaseKEY);

export default supabase;