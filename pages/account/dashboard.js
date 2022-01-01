import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Unauthorized from "@/components/Unauthorized";
import YouTubeVideoCard from "@/components/YouTubeVideoCard";
import styles from "@/styles/Dashboard.module.css";
import { parseCookies, decodeToken } from "@/helpers/index";
import { supabase, YOUTUBE_API_URL } from "@/config/index";
import Link from "next/link";

export default function DashboardPage({ data }) {
    const router = useRouter();

    useEffect(() => {
        if (!data) {
            router.push("/account/signup");
        }
    }, []);

    if (data) {
        return (
            <Layout title="Edulink | Dashboard">
                <div className={styles.container}>
                    <h1>Dashboard</h1>
                </div>
                <div className={styles.link_card}>
                    <Link href="/account/edit_profile">
                        <a
                            className="btn btn-primary"
                            style={{ background: "rgb(255, 182, 72)" }}
                        >
                            <i className="fas fa-edit"></i> Edit Profile
                        </a>
                    </Link>
                    <Link href="/account/request_video">
                        <a
                            className="btn btn-primary"
                            style={{ background: "rgb(72, 118, 255)" }}
                        >
                            <i className="fas fa-share-square"></i> Submit Video
                            Request
                        </a>
                    </Link>
                </div>

                <div className={styles.card}>
                    <h1 style={{ marginBottom: "1rem" }}>Favorites</h1>

                    {data.length > 0 ? (
                        <div className={styles.video_flex}>
                            {data.map((video) => (
                                <YouTubeVideoCard
                                    video={video}
                                    styles={{ margin: "0px 0px" }}
                                    key={data.indexOf(video)}
                                />
                            ))}
                        </div>
                    ) : (
                        <>
                            <p style={{ textAlign: "center" }}>
                                No Favorites Yet.
                            </p>
                        </>
                    )}
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
            .select("id")
            .eq("email", email);

        const data = await supabase
            .from("bookmarked_videos")
            .select("video_embedID")
            .eq("user_id", userData.data[0].id);

        const video_list = [];
        data.data.map((video) => video_list.push(video["video_embedID"]));

        const vids = [];
        const idString = video_list.join("&id=");

        const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${idString}&key=${YOUTUBE_API_URL}`;
        const res = await fetch(url);

        const jsonResponse = await res.json();
        const items = jsonResponse["items"];

        items.map((item) => {
            vids.push({
                title: item.snippet.title,
                embedId: item.id,
                thumbnail: item.snippet.thumbnails.medium,
                publishedAt: item.snippet.publishedAt.slice(0, 10),
            });
        });

        return {
            props: { data: vids },
        };
    }

    return {
        props: { data: null },
    };
}
