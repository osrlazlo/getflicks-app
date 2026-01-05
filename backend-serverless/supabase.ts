import { createClient } from "@supabase/supabase-js";

const supabaseURL = import.meta.env.VITE_SUPABASE_URL
const supabaseKEY = import.meta.env.VITE_SUPABASE_KEY

console.log("url, key", supabaseURL, supabaseKEY)

const supabase = createClient(supabaseURL, supabaseKEY);

export default supabase;