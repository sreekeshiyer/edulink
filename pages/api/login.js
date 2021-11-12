import cookie from "cookie";
import { supabase, JWT_SECRET, api_token } from "@/config/index";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
    if (req.headers["authorization"] === `Bearer ${api_token}`) {
        if (req.method === "POST") {
            const { email, password } = req.body;

            const data = await supabase
                .from("users")
                .select(`*`)
                .eq("email", email);

            if (data.status === 200) {
                if (data.data.length === 1) {
                    // Check if user has entered correct password

                    const match = await bcrypt.compare(
                        password,
                        data.data[0].password
                    );

                    if (match) {
                        // Set cookie
                        const token = jwt.sign(
                            {
                                first_name: data.data[0].first_name,
                                email: email,
                            },
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
                        res.status(401).json({
                            message: "Invalid Credentials",
                        });
                    }
                } else {
                    res.status(401).json({
                        message: "Invalid Credentials",
                    });
                }
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
