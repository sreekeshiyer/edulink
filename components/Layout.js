import Head from "next/head";
import Navbar from "./Navbar";

export default function Layout(props) {
    return (
        <div>
            <Head>
                <title>{props.title}</title>
                <meta charSet="utf-8" />
                <meta
                    name="description"
                    content="Edulink is a video platform that brings the best learning content from YouTube. It aims at creating an ecosystem for students and budding developers, providing them the best content without involving the YouTube algorithm."
                ></meta>
                <meta property="og:title" content={props.title} key="ogtitle" />
                <script
                    src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
                    async=""
                ></script>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar current={props.current} />
            <main>{props.children}</main>
        </div>
    );
}
