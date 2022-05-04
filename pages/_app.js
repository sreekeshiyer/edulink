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
            console.log("Checking Activation");
            window.addEventListener("activate", (event) => {
                console.log("service worker activated", event);

                console.log("window", window);
                window.registration.pushManager
                    .subscribe({
                        userVisibleOnly: true,
                        applicationServerKey:
                            urlBase64ToUint8Array(publicVapidKey),
                    })
                    .then((subscription) => {
                        console.log("subscription", subscription);
                    })
                    .catch((err) => {
                        console.log("error in subscribing to push", err);
                    });
            });
            console.log("Activation Done");
        }
    }, []);

    useEffect(() => {
        window.OneSignal = window.OneSignal || [];
        OneSignal.push(function () {
            OneSignal.init({
                appId: "d5fd2054-5501-4b1b-9384-014fb5206333",
                safari_web_id:
                    "web.onesignal.auto.34f3144b-3497-4c5c-a43c-a5d9eb9bdd56",
                notifyButton: {
                    enable: true,
                },
            });
        });
    }, []);

    useEffect(() =>
        window.addEventListener("push", (e) => {
            const data = e.data.json();
            console.log("Push Recieved...");
            window.registration.showNotification(data.title, {
                body: "Notification Received",
            });
        })
    );
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
