import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { AuthProvider } from "@/context/AuthContext";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", function () {
                navigator.serviceWorker.register("/sw.js").then(
                    function (registration) {
                        console.log(
                            "Service Worker registration successful with scope: ",
                            registration.scope
                        );
                    },
                    function (err) {
                        console.log(
                            "Service Worker registration failed: ",
                            err
                        );
                    }
                );
            });

            window.addEventListener("push", (e) => {
                const payload = JSON.parse(e.data.text());
                console.log(payload);
                e.waitUntil(
                    self.registration.showNotification(payload.title, {
                        body: payload.body,
                    })
                );
            });
            console.log("Activation Done");
        }

        window.addEventListener("push", (e) => {
            const payload = JSON.parse(e.data.text());
            console.log(payload);
            e.waitUntil(
                self.registration.showNotification(payload.title, {
                    body: payload.body,
                })
            );
        });
    }, []);
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
