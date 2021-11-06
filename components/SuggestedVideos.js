import styles from "../styles/SuggestedVideos.module.css";
import YouTubeVideoCard from "./YouTubeVideoCard";

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_URL;

export default function SuggestedVideos(props) {
    return (
        <div className={styles.video_page_flex}>
            {props.vid_list.map((video) => (
                <YouTubeVideoCard
                    styles={{ marginBottom: "1rem", width: "350px" }}
                    video={video}
                    number={video.number}
                    key={props.vid_list.indexOf(video)}
                    isCourse={props.isCourse}
                />
            ))}
        </div>
    );
}
