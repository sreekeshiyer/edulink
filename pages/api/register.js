import cookie from "cookie";
import { supabase, JWT_SECRET } from "@/config/index";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { api_token } from "@/config/index";

export default async function handler(req, res) {
    if (req.headers["authorization"] === `Bearer ${api_token}`) {
        if (req.method === "POST") {
            const { first_name, last_name, email, password } = req.body;

            const hashedPassword = await bcrypt.hash(password, 10);

            const data = await supabase.from("users").insert([
                {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    password: hashedPassword,
                    tags: "",
                },
            ]);

            if (data.status === 201) {
                // Set cookie
                const token = jwt.sign(
                    { first_name: first_name, email: email },
                    JWT_SECRET,
                    { algorithm: "RS256" }
                );

                res.setHeader(
                    "Set-Cookie",
                    cookie.serialize("token", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== "development",
                        maxAge: 60 * 60 * 24 * 7,
                        sameSite: "strict",
                        path: "/",
                    })
                );

                res.status(200).json({
                    user: data.data[0],
                });
            } else {
                res.status(data.status).json({
                    message: data.statusText,
                });
            }
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
