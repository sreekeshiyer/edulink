import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import styles from "../styles/Video.module.css";

export default function Video(props) {
    // const videoSrc = {
    //     type: "video",
    //     sources: [
    //         {
    //             src: `${props.embedId}`,
    //             provider: "youtube",
    //         },
    //     ],
    // };
    return (
        <div className={styles.video}>
            {/* <Plyr source={videoSrc} /> */}
            <iframe
                src={`https://www.youtube.com/embed/${props.embedId}?rel=0&modestbranding=1&autohide=1&showinfo=0`}
                frameBorder="0"
                allowFullScreen
                title="Embedded youtube"
                about="true"
            />
        </div>
    );
}
