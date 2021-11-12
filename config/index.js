import { createClient } from "@supabase/supabase-js";

export const YOUTUBE_API_URL = process.env.NEXT_PUBLIC_YOUTUBE_API_URL;
export const NEXT_URL =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SUPABASE_API_URL = process.env.NEXT_PUBLIC_SUPABASE_API_URL;
export const supabase = createClient(SUPABASE_API_URL, SUPABASE_ANON_KEY);
export const PER_PAGE = 9;
export const api_token = process.env.NEXT_PUBLIC_AUTH_API_TOKEN;
export const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET.replace(
    /\\n/g,
    "\n"
);
