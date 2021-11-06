import cookie from "cookie";
import jwt from "jsonwebtoken";
import { YOUTUBE_API_URL } from "../config/index";

export function parseCookies(req) {
    return cookie.parse(req ? req.headers.cookie || "" : "");
}

export function decodeToken(token) {
    return jwt.decode(token);
}

export async function fetchYouTubeVideoDetails(embedID_list) {
    const video_list = [];
    embedID_list.map((video) => video_list.push(video["video_embedID"]));

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

    return vids;
}

export function rankVideos(all_videos, tag_list) {
    all_videos.map((video) => {
        video.tags = smallCase(video.tags);
        const commonValues = tag_list.filter((value) =>
            video.tags.includes(value)
        );

        addCount(video, commonValues.length);
    });

    const sorted_videos = sortByKey(all_videos, "count");

    sorted_videos.map((video) => delete video.count);

    const result_video = sorted_videos.reverse();
    return result_video;
}

function smallCase(array) {
    let result = array.map((ele) => ele.toLowerCase());

    return result;
}

function addCount(obj, count) {
    obj["count"] = count;
}

function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        return x < y ? -1 : x > y ? 1 : 0;
    });
}
