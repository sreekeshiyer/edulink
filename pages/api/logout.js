import cookie from "cookie";
import { api_token } from "@/config/index";

export default async function handler(req, res) {
    if (req.headers["authorization"] === `Bearer ${api_token}`) {
        if (req.method === "POST") {
            // Destroy Cookie
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", "", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    expires: new Date(0),
                    sameSite: "strict",
                    path: "/",
                })
            );

            res.status(200).json({
                message: "Success",
            });
        } else {
            res.setHeader("Allow", ["POST"]);
            res.status(405).json({
                message: `Method ${req.method} not allowed.`,
            });
        }
    } else {
        res.status(403).json({ message: "Access Forbidden" });
        return;
    }
}
