import Layout from "../components/Layout";
import YouTubeVideoCard from "../components/YouTubeVideoCard";
import { supabase } from "@/config/index";
import { YOUTUBE_API_URL } from "@/config/index";
import { parseCookies, decodeToken, rankVideos } from "@/helpers/index";
import Search from "@/components/Search";

export default function Home({ vids }) {
    return (
        <Layout title="Edulink | Home" current="home">
            <div className="container">
                <div className="jc_end">
                    <Search content="Videos" push="search" />
                </div>
            </div>
            <div className="container flex-column-center">
                <div className="video-grid">
                    {vids.map((video) => (
                        <YouTubeVideoCard
                            video={video}
                            key={vids.indexOf(video)}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ req }) {
    const { token } = parseCookies(req);

    var all_videos = [];
    all_videos =
        (
            await supabase
                .from("videos")
                .select("*")
                .order("id", { ascending: false })
        ).data || [];
    const ids = [];

    if (token) {
        const email = decodeToken(token)["email"];

        const userData = await supabase
            .from("users")
            .select("id, tags")
            .eq("email", email);

        if (userData.data[0].tags) {
            const tags = userData.data[0].tags.toLowerCase();
            const tag_list = tags.split(",").map(function (item) {
                return item.trim();
            });

            if (tag_list.length > 1) {
                all_videos = rankVideos(all_videos, tag_list);
            }
        }
    }
    all_videos.map((video) => {
        ids.push(video.embedID);
    });

    const idString = ids.join("&id=");

    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${idString}&key=${YOUTUBE_API_URL}`;
    const res = await fetch(url);

    const jsonResponse = await res.json();
    const items = jsonResponse["items"];
    const vids = [];

    items.map((item) => {
        let new_title = item.snippet.title.replace("&amp;", "&");
        vids.push({
            title: new_title,
            embedId: item.id,
            thumbnail: item.snippet.thumbnails.medium,
            publishedAt: item.snippet.publishedAt.slice(0, 10),
        });
    });

    return {
        props: { vids },
    };
}
