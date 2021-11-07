import styles from "@/styles/FavoriteStar.module.css";

export default function FavoriteStar(props) {
    return (
        <button
            style={{ background: props.color }}
            onClick={props.onClick}
            className={styles.star_button}
        >
            {props.text} <i className="fas fa-star"></i>
        </button>
    );
}
