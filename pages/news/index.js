import Layout from "@/components/Layout";
import styles from "@/styles/NewsPage.module.css";
import NewsCard from "@/components/NewsCard";
import { supabase } from "@/config/index";
import Search from "@/components/Search";

export default function NewsPage({ all_news }) {
    return (
        <Layout title="Edulink | News" current="news">
            <div className="container">
                <div className="jc_end">
                    <Search content="News" push="news/search" />
                </div>
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

export async function getServerSideProps() {
    const all_news = [];

    let data = await supabase
        .from("news")
        .select("id, title, thumbnail, excerpt");

    if (!data.error) {
        all_news.push(data.data);
    }

    return {
        props: { all_news: all_news[0] },
    };
}
