import Layout from "@/components/Layout";
import Unauthorized from "@/components/Unauthorized";
import { supabase } from "@/config/index";
import styles from "@/styles/Admin.module.css";
import { useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import AuthContext from "@/context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { YOUTUBE_API_URL } from "@/config/index";

export default function AdminPage() {
    const { user, error } = useContext(AuthContext);
    const router = useRouter();

    const [btnState, setBtnState] = useState("video");

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (user && user.role != 0) {
            router.push("/");
        }
    }, [user]);

    const [embedID, setEmbedID] = useState("");
    const [tags, setTags] = useState("");

    // Courses

    const [courseEmbedID, setCourseEmbedID] = useState("");
    const [courseTags, setCourseTags] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        let data;

        if (btnState === "video") {
            const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${embedID}&key=${YOUTUBE_API_URL}`;
            const res = await fetch(url);
            if (res.ok) {
                const jsonResponse = await res.json();
                const items = jsonResponse["items"];

                var finalTags = [];

                const defTags = items[0].snippet.tags
                    ? items[0].snippet.tags
                    : [];

                if (tags) {
                    let tag_arr = tags.split(",").map(function (item) {
                        return item.trim();
                    });
                    finalTags = defTags.concat(tag_arr);
                }

                data = await supabase.from("videos").insert([
                    {
                        embedID: embedID,
                        title: items[0].snippet.title,
                        tags: finalTags,
                    },
                ]);
            } else {
                toast.error("Something went wrong");
            }
        } else {
            // https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=

            const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${courseEmbedID}&key=${YOUTUBE_API_URL}`;
            const res = await fetch(url);
            if (res.ok) {
                const jsonResponse = await res.json();
                const items = jsonResponse["items"];
                var finalCourseTags = [];

                if (courseTags) {
                    let tag_arr = courseTags.split(",").map(function (item) {
                        return item.trim();
                    });
                    finalCourseTags = tag_arr;
                }

                data = await supabase.from("courses").insert([
                    {
                        embedID: courseEmbedID,
                        title: items[0].snippet.title,
                        tags: finalCourseTags,
                    },
                ]);
            } else {
                toast.error("Something went wrong.");
            }
        }
        setEmbedID("");
        setTags("");
        setCourseEmbedID("");
        setCourseTags("");
        if (data.status === 201) {
            toast.success("Added Successfully!");
            return;
        } else {
            toast.error(data.error.details);
            return;
        }
    };

    if (user) {
        if (user.role === 0) {
            return (
                <Layout title="Admin Portal">
                    <div className={styles.card}>
                        <div className={styles.btn_group}>
                            <button
                                onClick={() => setBtnState("video")}
                                className={styles.main_button}
                                style={
                                    btnState === "video"
                                        ? {
                                              background: "rgb(41, 205, 255)",
                                              color: "white",
                                              boxShadow:
                                                  "0 2px 2px 1px rgba(68, 68, 95, 0.4)",
                                          }
                                        : {}
                                }
                            >
                                Add Video
                            </button>
                            <button
                                onClick={() => setBtnState("course")}
                                className={styles.main_button}
                                style={
                                    btnState === "course"
                                        ? {
                                              background: "rgb(41, 205, 255)",
                                              color: "white",
                                              boxShadow:
                                                  "2px 2px 2px 1px rgba(68, 68, 95, 0.4)",
                                          }
                                        : {}
                                }
                            >
                                Add Course
                            </button>
                        </div>
                        <ToastContainer />
                        {btnState === "video" ? (
                            <div className={styles.edit_form}>
                                <h1 style={{ marginBottom: "1rem" }}>
                                    Admin Area - Add YouTube Videos
                                </h1>

                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="embedID">
                                            YouTube Embed ID
                                        </label>
                                        <input
                                            type="text"
                                            id="embedID"
                                            value={embedID}
                                            onChange={(e) =>
                                                setEmbedID(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="embedID">
                                            Add Optional Tags
                                        </label>
                                        <input
                                            type="text"
                                            id="tags"
                                            value={tags}
                                            onChange={(e) =>
                                                setTags(e.target.value)
                                            }
                                        />
                                    </div>

                                    <input
                                        type="submit"
                                        value="Add"
                                        className="btn"
                                    />
                                </form>
                            </div>
                        ) : (
                            <div className={styles.edit_form}>
                                <h1 style={{ marginBottom: "1rem" }}>
                                    Admin Area - Add Courses
                                </h1>

                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="embedID">
                                            YouTube Embed ID
                                        </label>
                                        <input
                                            type="text"
                                            id="embedID"
                                            value={courseEmbedID}
                                            onChange={(e) =>
                                                setCourseEmbedID(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="embedID">
                                            Add Tags for course
                                        </label>
                                        <input
                                            type="text"
                                            id="tags"
                                            value={courseTags}
                                            onChange={(e) =>
                                                setCourseTags(e.target.value)
                                            }
                                        />
                                    </div>

                                    <input
                                        type="submit"
                                        value="Add"
                                        className="btn"
                                    />
                                </form>
                            </div>
                        )}
                    </div>
                </Layout>
            );
        } else {
            return (
                <Layout title="Admin Portal">
                    <Unauthorized />
                </Layout>
            );
        }
    } else {
        return (
            <Layout title="Admin Portal">
                <Unauthorized />
            </Layout>
        );
    }
}

// export async function getServerSideProps({ req }) {
//     const { token } = parseCookies(req);

//     if (token) {
//         const email = decodeToken(token)["email"];

//         const userData = await supabase
//             .from("users")
//             .select("role")
//             .eq("email", email);
//         return {
//             props: {
//                 role: userData.data[0].role,
//             },
//         };
//     }

//     return {
//         props: {
//             role: null,
//         },
//     };
// }
