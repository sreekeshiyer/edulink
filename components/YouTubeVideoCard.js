import styles from "../styles/YouTubeVideoCard.module.css";
import Image from "next/image";
import Link from "next/link";

export default function YouTubeVideoCard(props) {
    return (
        <div className={styles.video_card} style={props.styles}>
            {!props.isCourse ? (
                <Link href={`/video/${props.video.embedId}`}>
                    <a>
                        <Image
                            src={props.video.thumbnail.url}
                            alt={props.video.title}
                            width={400}
                            height={225}
                        ></Image>
                    </a>
                </Link>
            ) : (
                <Link
                    href={`/course/${props.video.playlistId}/${props.number}`}
                >
                    <a>
                        <Image
                            src={props.video.thumbnail.url}
                            alt={props.video.title}
                            width={400}
                            height={225}
                        ></Image>
                    </a>
                </Link>
            )}
            <div
                className="details"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                }}
            >
                <h4>{props.video.title}</h4>
                <p>Date: {props.video.publishedAt}</p>
            </div>
        </div>
    );
}

/* <iframe
                src={`https://www.youtube.com/embed/${props.video.embedId}?rel=0&modestbranding=1&autohide=1&showinfo=0`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
                about="true"
            /> */
