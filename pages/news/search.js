import Layout from "@/components/Layout";
import Link from "next/link";
import styles from "@/styles/NewsPage.module.css";
import NewsCard from "@/components/NewsCard";
import { supabase } from "@/config/index";
import { useRouter } from "next/router";

export default function SearchNewsPage({ all_news }) {
    const router = useRouter();

    return (
        <Layout title={`Search Results for ${router.query.term}`}>
            <div className="container">
                <Link href="/news">
                    <a className="btn btn-primary">Go Back</a>
                </Link>
                <h1>Search Results for {router.query.term} </h1>
            </div>
            <div className="container">
                {all_news.length === 0 && <h3>No Results found.</h3>}
            </div>
            <div className={styles.flex_container}>
                <div className={styles.card_group}>
                    {all_news.map((news) => (
                        <NewsCard
                            key={all_news.indexOf(news)}
                            id={news.id}
                            news={news}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ query: { term } }) {
    const all_news = [];

    let data = await supabase
        .from("news")
        .select("id, title, thumbnail, excerpt")
        .ilike("title", `%${term}%`);

    if (!data.error) {
        all_news.push(data.data);
    }

    return {
        props: { all_news: all_news[0] },
    };
}
