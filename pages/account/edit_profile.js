import Layout from "@/components/Layout";
import styles from "@/styles/EditProfile.module.css";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Unauthorized from "@/components/Unauthorized";
import { supabase } from "@/config/index";
import { parseCookies, decodeToken } from "@/helpers/index";

export default function EditProfilePage({ user }) {
    const [first_name, setFirstName] = useState(user.first_name);
    const [last_name, setLastName] = useState(user.last_name);
    const [bio, setBio] = useState(user.bio ? user.bio : "");
    const [tags, setTags] = useState(user.tags ? user.tags : "");

    const handleTagChange = (e) => {
        const { value } = e.target;
        setTags(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const values = {
            first_name,
            last_name,
        };

        const hasEmptyFields = Object.values(values).some(
            (element) => element === ""
        );

        if (hasEmptyFields) {
            toast.error("First Name and Last Name can't be empty.");
            return;
        }

        const data = await supabase
            .from("users")
            .update({
                first_name: first_name,
                last_name: last_name,
                bio: bio,
                tags: tags,
            })
            .eq("id", user.id);

        if (data.status === 200 || data.status === 201 || data.status === 202) {
            toast.success("Successfully Updated");
        }

        if (data.error) {
            toast.error(err);
        }
    };

    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/account/signup");
        }
    }, []);

    if (user) {
        return (
            <Layout title="Edulink | Edit Profile">
                <div className={styles.card}>
                    <div className={styles.edit_form}>
                        <h1 style={{ marginBottom: "1rem" }}>Edit Profile</h1>
                        <ToastContainer />
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="first_name">First Name</label>
                                <input
                                    type="text"
                                    id="first_name"
                                    value={first_name}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="last_name">Last Name</label>
                                <input
                                    type="text"
                                    id="last_name"
                                    value={last_name}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <label htmlFor="bio">Bio</label>
                                <input
                                    type="textarea"
                                    id="bio"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="tags">Add Your Tags</label>
                                <input
                                    type="text"
                                    id="tags"
                                    placeholder="Add your tags separated by commas eg. nextjs, supabase, docker"
                                    value={tags}
                                    onChange={handleTagChange}
                                />
                            </div>

                            <input type="submit" value="Save" className="btn" />
                        </form>
                    </div>
                </div>
            </Layout>
        );
    } else {
        return <Unauthorized />;
    }
}

export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req);

    if (token) {
        const email = decodeToken(token)["email"];

        const userData = await supabase
            .from("users")
            .select("*")
            .eq("email", email);

        const user = userData.data[0];

        return {
            props: { user: user },
        };
    }

    return {
        props: { user: null },
    };
}
