import Head from "next/head";
import Navbar from "./Navbar";

export default function Layout(props) {
    return (
        <div>
            <Head>
                <title>{props.title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar current={props.current} />
            <main>{props.children}</main>
        </div>
    );
}
