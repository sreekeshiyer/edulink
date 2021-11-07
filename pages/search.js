import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { supabase, YOUTUBE_API_URL } from "../config/index";
import YouTubeVideoCard from "@/components/YouTubeVideoCard";
import Link from "next/link";

export default function SearchPage({ videos }) {
    const router = useRouter();

    return (
        <Layout title={`Search Results for ${router.query.term}`}>
            <div className="container">
                <Link href="/">
                    <a className="btn btn-primary">Go Back</a>
                </Link>
                <h1>Search Results for {router.query.term} </h1>
            </div>
            <div className="container">
                {videos.length === 0 && <h3>No Videos to Show</h3>}
            </div>
            <div className="container flex">
                <div className="video-grid">
                    {videos.map((video) => (
                        <YouTubeVideoCard
                            video={video}
                            key={videos.indexOf(video)}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ query: { term } }) {
    const all_videos =
        (
            await supabase
                .from("videos")
                .select("id, embedID, title")
                .ilike("title", `%${term}%`)
        ).data || [];

    if (all_videos.length === 0) {
        return {
            props: { videos: [] },
        };
    }

    const ids = [];
    all_videos.map((video) => {
        ids.push(video.embedID);
    });

    const idString = ids.join("&id=");

    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${idString}&key=${YOUTUBE_API_URL}`;
    const res = await fetch(url);

    const jsonResponse = await res.json();
    const items = jsonResponse["items"];
    const videos = [];

    items.map((item) => {
        videos.push({
            title: item.snippet.title,
            embedId: item.id,
            thumbnail: item.snippet.thumbnails.medium,
            publishedAt: item.snippet.publishedAt.slice(0, 10),
        });
    });

    return {
        props: { videos: videos },
    };
}
