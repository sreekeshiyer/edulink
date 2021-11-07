import cookie from "cookie";
import { supabase } from "@/config/index";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    if (req.method === "GET") {
        if (!req.headers.cookie) {
            res.status(403).json({ message: "No User found" });
            return;
        }

        const { token } = cookie.parse(req.headers.cookie);

        const decodedToken = jwt.decode(token);

        const user = await supabase
            .from("users")
            .select("*")
            .eq("email", decodedToken["email"]);

        if (user.status === 200) {
            res.status(200).json({ user: user.data[0] });
        } else {
            res.status(403).json({ message: "User forbidden" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
}
