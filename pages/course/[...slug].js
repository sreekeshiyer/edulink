import Layout from "../../components/Layout";
import Video from "../../components/Video";
import SuggestedVideos from "../../components/SuggestedVideos";
import { useRouter } from "next/router";
import ReactStars from "react-rating-stars-component";
import { YOUTUBE_API_URL } from "@/config/index";

export default function VideoPage({ video, vid_list }) {
    const router = useRouter();

    const ratingChanged = (newRating) => {
        console.log(newRating);
    };

    return (
        <Layout title={video.title}>
            <div className="container">
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        router.push("/");
                    }}
                    className="btn btn-primary"
                >
                    Go Back
                </button>

                <div className="video-player-grid">
                    <div className="player">
                        <Video embedId={video.id} />
                        <h2>{video.title}</h2>
                        {/* <ReactStars
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            activeColor="#ffd700"
                        /> */}
                    </div>
                    <SuggestedVideos vid_list={vid_list} isCourse={true} />
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    let playlist = params.slug[0];

    const res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${playlist}&key=${YOUTUBE_API_URL}`
    );
    const full_resp = await res.json();

    const result = full_resp["items"][Number(params.slug[1]) - 1];

    const video = {
        title: result.snippet.title,
        id: result.snippet.resourceId.videoId,
        description: result.snippet.description,
        author: result.snippet.channelTitle,
        publishedAt: result.snippet.publishedAt.slice(0, 10),
    };

    const vid_list = [];
    let all_vids = full_resp["items"];

    for (let i = 0; i < all_vids.length; i++) {
        if (Number(params.slug[1]) !== i + 1) {
            vid_list.push({
                title: all_vids[i].snippet.title,
                playlistId: all_vids[i].snippet.playlistId,
                embedId: all_vids[i].snippet.resourceId.videoId,
                thumbnail: all_vids[i].snippet.thumbnails.medium,
                publishedAt: all_vids[i].snippet.publishedAt.slice(0, 10),
                number: i + 1,
            });
        }
    }

    return {
        props: { video, vid_list },
    };
}
