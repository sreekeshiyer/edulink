import Layout from "../components/Layout";
import YouTubeVideoCard from "../components/YouTubeVideoCard";
import { supabase } from "@/config/index";
import { YOUTUBE_API_URL } from "@/config/index";
import { parseCookies, decodeToken, rankVideos } from "@/helpers/index";

export default function Home({ vids }) {
    return (
        <Layout title="Edulink | Courses" current="courses">
            <h1>Courses</h1>
            <div className="container flex">
                <div className="video-grid">
                    {vids.map((video) => (
                        <YouTubeVideoCard
                            video={video}
                            number={1}
                            isCourse={true}
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
                .from("courses")
                .select("*")
                .order("id", { ascending: true })
        ).data || [];
    const ids = [];

    if (token) {
        const email = decodeToken(token)["email"];

        const userData = await supabase
            .from("users")
            .select("id, tags")
            .eq("email", email);

        const tags = userData.data[0].tags.toLowerCase();
        const tag_list = tags.split(",").map(function (item) {
            return item.trim();
        });

        if (tag_list.length > 1 && all_videos.length > 1) {
            all_videos = rankVideos(all_videos, tag_list);
        }
    }
    all_videos.map((video) => {
        ids.push(video.embedID);
    });

    const vids = [];

    for (let i = 0; i < ids.length; i++) {
        const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId=${ids[i]}&key=${YOUTUBE_API_URL}`;
        const res = await fetch(url);

        const jsonResponse = await res.json();
        const item = jsonResponse["items"][0];
        let new_title = item.snippet.title.replace("&amp;", "&");
        vids.push({
            title: new_title,
            embedId: item.snippet.resourceId.videoId,
            playlistId: item.snippet.playlistId,
            thumbnail: item.snippet.thumbnails.medium,
            publishedAt: item.snippet.publishedAt.slice(0, 10),
        });
    }

    return {
        props: { vids },
    };
}
