import Layout from "@/components/Layout";
import styles from "@/styles/RequestVideo.module.css";
import { ToastContainer, toast } from "react-toastify";
import { supabase } from "@/config/index";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "@/context/AuthContext";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

export default function RequestVideo() {
    const { user, error } = useContext(AuthContext);
    const router = useRouter();
    const [embedID, setEmbedID] = useState("");

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (!user) {
            router.push("/");
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let data = await supabase.from("requested_videos").insert({
            video_embedID: embedID,
        });

        setEmbedID("");

        if (data.error) {
            if (
                data.error.details ===
                `Key ("video_embedID")=(${embedID}) already exists.`
            ) {
                toast.error("Video has already been suggested.");
                return;
            }

            toast.error("Something went wrong");
            return;
        }

        toast.success("Thank you for your suggestion!");
    };

    return (
        <Layout title="Edulink | Request Video">
            <ToastContainer />
            <div className={styles.card}>
                <div className={styles.form}>
                    <h1 style={{ marginBottom: "1rem" }}>
                        Request Video Additions to EduLink
                    </h1>

                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="embedID">
                                YouTube Video Embed ID
                            </label>
                            <input
                                type="text"
                                id="embedID"
                                value={embedID}
                                onChange={(e) => setEmbedID(e.target.value)}
                            />
                        </div>
                        <input type="submit" value="Add" className="btn" />
                    </form>
                </div>
            </div>
        </Layout>
    );
}
