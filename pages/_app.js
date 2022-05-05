import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { AuthProvider } from "@/context/AuthContext";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
    function urlBase64ToUint8Array(base64String) {
        const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, "+")
            .replace(/_/g, "/");

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

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
        }
    }, []);

    useEffect(() => {
        if ("serviceWorker" in navigator) {
            window.addEventListener("push", (e) => {
                console.log("Push Recieved...");

                navigator.serviceWorker.getRegistration().then(function (fn) {
                    fn.showNotification("Title", {
                        body: "Body",
                    });
                });
            });
            window.self.addEventListener("push", (e) => {
                console.log("Push Recieved...");

                navigator.serviceWorker.getRegistration().then(function (fn) {
                    fn.showNotification("Title", {
                        body: "Body",
                    });
                });
            });
            self.addEventListener("push", (e) => {
                console.log("Push Recieved...");

                navigator.serviceWorker.getRegistration().then(function (fn) {
                    fn.showNotification("Title", {
                        body: "Body",
                    });
                });
            });
        }
    });

    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
