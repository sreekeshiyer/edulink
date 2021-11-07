import Layout from "../../components/Layout";
import Video from "../../components/Video";
import SuggestedVideos from "../../components/SuggestedVideos";
import { useRouter } from "next/router";
import ReactStars from "react-rating-stars-component";
import { supabase, YOUTUBE_API_URL } from "@/config/index";
import { parseCookies, decodeToken } from "@/helpers/index";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoriteStar from "@/components/FavoriteStar";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { useState } from "react";

export default function VideoPage({ video, vid_list, rating, isFavorite }) {
    const router = useRouter();

    const [fav, setFav] = useState(isFavorite);

    const { user } = useContext(AuthContext);

    const addFavorite = async () => {
        let data = await supabase.from("bookmarked_videos").insert({
            user_id: rating[0].user_id,
            video_embedID: router.query.slug,
        });

        if (data.error) {
            toast.error("Something went wrong");
            return;
        }
        setFav(true);
        toast.success("Added To Favorites!");
    };

    const removeFavorite = async () => {
        let data = await supabase
            .from("bookmarked_videos")
            .delete()
            .eq("user_id", rating[0].user_id)
            .eq("video_embedID", router.query.slug);

        if (data.error) {
            toast.error("Something went wrong");
            return;
        }

        setFav(false);
        toast.success("Removed From Favorites!");
    };

    const ratingChanged = async (newRating) => {
        var data;

        if (rating[0].rating === 0) {
            data = await supabase
                .from("ratings")
                .insert({
                    rating: newRating,
                    user_id: rating[0].user_id,
                    embedID: router.query.slug,
                })
                .eq("user_id", rating[0].user_id)
                .eq("embedID", router.query.slug);
        } else {
            data = await supabase
                .from("ratings")
                .update({
                    rating: newRating,
                })
                .eq("user_id", rating[0].user_id)
                .eq("embedID", router.query.slug);
        }

        if (data.error) {
            toast.error("Something went wrong!");
            console.log(data.error.details);
        } else {
            toast.success("Rating Updated");
        }
    };
    const slug = router.query.slug;

    return (
        <Layout title={video.title}>
            <ToastContainer />
            <div className="container">
                <Link href="/">
                    <a className="btn btn-primary">Go Back</a>
                </Link>

                <div className="video-player-grid">
                    <div className="player">
                        <Video embedId={slug} />
                        <h2>{video.title}</h2>
                        {user && rating.length > 0 ? (
                            <>
                                <ReactStars
                                    value={rating[0].rating}
                                    count={5}
                                    onChange={ratingChanged}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                                {fav === false ? (
                                    <FavoriteStar
                                        text="Add to Favorites"
                                        onClick={addFavorite}
                                    />
                                ) : (
                                    <FavoriteStar
                                        text="Remove From Favorites"
                                        color="#333"
                                        onClick={removeFavorite}
                                    />
                                )}
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                    <SuggestedVideos vid_list={vid_list} />
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ req, params }) {
    const res = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&id=${params.slug}&key=${YOUTUBE_API_URL}`
    );
    const full_resp = await res.json();

    const result = full_resp["items"][0];

    const video = {
        title: result.snippet.localized.title,
        description: result.snippet.description,
        author: result.snippet.channelTitle,
        publishedAt: result.snippet.publishedAt.slice(0, 10),
    };

    let channel_id = result.snippet.channelId;

    const res2 = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_URL}&channelId=${channel_id}&part=snippet&order=date&maxResults=20`
    );
    let vids = await res2.json();

    let all_vids = vids.items;

    const vid_list_temp = [];

    all_vids.map((item) => {
        let new_title = item.snippet.title.replace("&amp;", "&");
        vid_list_temp.push({
            title: new_title,
            embedId: item.id.videoId,
            thumbnail: item.snippet.thumbnails.medium,
            publishedAt: item.snippet.publishedAt.slice(0, 10),
        });
    });

    for (let i = vid_list_temp.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [vid_list_temp[i], vid_list_temp[j]] = [
            vid_list_temp[j],
            vid_list_temp[i],
        ];
    }

    const vid_list = vid_list_temp.slice(0, 4);

    const rating = [];

    const { token } = parseCookies(req);
    var isFavorite = false;

    if (token) {
        const email = decodeToken(token)["email"];

        const userData = await supabase
            .from("users")
            .select("id")
            .eq("email", email);

        const supaRatingRes = await supabase
            .from("ratings")
            .select("*")
            .eq("user_id", userData.data[0].id)
            .eq("embedID", params.slug);

        if (supaRatingRes.data.length > 0) {
            rating.push(supaRatingRes.data[0]);
        } else {
            rating.push({
                embedID: params.slug,
                user_id: userData.data[0].id,
                rating: 0,
            });
        }

        // Favorite Check
        let supaFav = await supabase
            .from("bookmarked_videos")
            .select("*")
            .eq("user_id", userData.data[0].id)
            .eq("video_embedID", params.slug);

        if (supaFav.data.length > 0) {
            isFavorite = true;
        }
    }

    return {
        props: { video, vid_list, rating, isFavorite },
    };
}
