import Layout from "@/components/Layout";
import { supabase } from "@/config/index";
import styles from "@/styles/NewsContent.module.css";
import Image from "next/image";
import Link from "next/link";

export default function NewsArticlePage({ news }) {
    return (
        <Layout title={news[0].title}>
            <div className="container">
                <Link href="/news">
                    <a className="btn btn-primary">Go Back</a>
                </Link>

                {news.length > 0 ? (
                    <div className={styles.news}>
                        <h1>{news[0].title}</h1>
                        <hr noshade="true" />
                        <div className={styles.flex_container}>
                            <Image
                                src={news[0].thumbnail}
                                width="600px"
                                height="350px"
                            />
                        </div>

                        <p>{news[0].content}</p>
                        <br />
                        <p id={styles.author}>
                            Written by : <span>{news[0].written_by}</span>
                        </p>
                        <p id={styles.date}>
                            {new Date(news[0].created_at).toLocaleDateString()}
                        </p>
                    </div>
                ) : (
                    <>
                        <h3>No News Found.</h3>
                    </>
                )}
            </div>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    let data = await supabase
        .from("news")
        .select("*")
        .eq("id", Number(params.slug));

    const news = [];
    if (!data.error) {
        news.push(data.data[0]);
    }

    return {
        props: { news },
    };
}
