import cookie from "cookie";
import { supabase } from "@/config/index";
import jwt from "jsonwebtoken";
import { api_token } from "@/config/index";

export default async function handler(req, res) {
    if (req.headers["authorization"] === `Bearer ${api_token}`) {
        if (req.method === "GET") {
            if (!req.headers.cookie) {
                res.status(200).json({ message: "No User found" });
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
                res.status(403).json({ message: "User Invalid" });
            }
        } else {
            res.setHeader("Allow", ["GET"]);
            res.status(405).json({
                message: `Method ${req.method} not allowed`,
            });
        }
    } else {
        res.status(403).json({ message: "Access Forbidden" });
        return;
    }
}

/*

if (req.headers["authorization"] === `Bearer ${api_token}`) {}

else {
        res.status(403).json({ message: "Access Forbidden" });
        return;
    }

*/
