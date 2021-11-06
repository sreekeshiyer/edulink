import styles from "@/styles/NewsCard.module.css";
import Link from "next/link";
import Image from "next/image";

export default function NewsCard(props) {
    return (
        <div className={styles.news_card}>
            <Link href={`/news/${props.news.id}`}>
                <a>
                    <Image
                        src={props.news.thumbnail}
                        height={180}
                        width={320}
                    />
                </a>
            </Link>
            <Link href={`/news/${props.news.id}`}>
                <a className={styles.desc}>
                    <h2>{props.news.title}</h2>
                    <p>{props.news.excerpt}</p>
                </a>
            </Link>
        </div>
    );
}
