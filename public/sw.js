if (!self.define) {
    let e,
        s = {};
    const i = (i, n) => (
        (i = new URL(i + ".js", n).href),
        s[i] ||
            new Promise((s) => {
                if ("document" in self) {
                    const e = document.createElement("script");
                    (e.src = i), (e.onload = s), document.head.appendChild(e);
                } else (e = i), importScripts(i), s();
            }).then(() => {
                let e = s[i];
                if (!e)
                    throw new Error(`Module ${i} didn’t register its module`);
                return e;
            })
    );
    self.define = (n, t) => {
        const c =
            e ||
            ("document" in self ? document.currentScript.src : "") ||
            location.href;
        if (s[c]) return;
        let a = {};
        const r = (e) => i(e, c),
            o = { module: { uri: c }, exports: a, require: r };
        s[c] = Promise.all(n.map((e) => o[e] || r(e))).then(
            (e) => (t(...e), a)
        );
    };
}
define(["./workbox-614e2ede"], function (e) {
    "use strict";
    importScripts(),
        self.skipWaiting(),
        e.clientsClaim(),
        e.precacheAndRoute(
            [
                {
                    url: "/_next/static/A935OiHCXG0kKy72wvIJU/_buildManifest.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/A935OiHCXG0kKy72wvIJU/_middlewareManifest.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/A935OiHCXG0kKy72wvIJU/_ssgManifest.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/247-7619912a799cb623.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/37-d9ce96d8d00e0571.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/57-d746ab5dff3effc8.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/framework-5f4595e5518b5600.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/main-50770868367ef490.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/pages/_app-d65ad447e98c08c5.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/pages/_error-2280fa386d040b66.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/pages/account/dashboard-91172f66143cb06a.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/pages/account/edit_profile-c494b8e90181a1fc.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/pages/account/request_video-c6698dd822d52705.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/pages/account/signup-00b48339a7132900.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/pages/admin-area-e2aebef5f3d1f07d.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/pages/course/%5B...slug%5D-6f70f556a86c11e0.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/pages/courses-97e23be7274476b8.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/pages/index-f77d7a850c5bcc5e.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/pages/news-eee2abbbd775019b.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/pages/news/%5Bslug%5D-7e7cac529041964a.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/pages/news/search-52b514f6e8f6471a.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/pages/search-1a20c0e4ad31c4f3.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/pages/video/%5Bslug%5D-86e594bf1d2a23fa.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/chunks/webpack-5752944655d749a0.js",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/css/06b24c7455983095.css",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/css/10beb41d706ee5d3.css",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/css/1d74fc1220ffc24f.css",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/css/2805cdca17d6a9ba.css",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/css/4c733aa02c24b8b1.css",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/css/4f29583104d58277.css",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/css/6b7f9d045c6458fe.css",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/css/6c24136edc6d03b7.css",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/css/8a2f692c4fd123fc.css",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/css/9d17150e55b1c5d6.css",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/css/a907ce300a724f55.css",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/css/aaf6762f4e06c128.css",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/css/be90997a751050f1.css",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/css/f3209411fd5d844d.css",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/_next/static/css/f6c2e128ee8a3113.css",
                    revision: "A935OiHCXG0kKy72wvIJU",
                },
                {
                    url: "/favicon.ico",
                    revision: "bd955b64a35aa3de636aaa84b49d019d",
                },
                {
                    url: "/icon-192x192.png",
                    revision: "a1a4e1f93091737da0fa52b2fa1b3681",
                },
                {
                    url: "/icon-256x256.png",
                    revision: "c1323307fd7220dc809194aa50234949",
                },
                {
                    url: "/icon-384x384.png",
                    revision: "17f69f20de82d39b14ea58f50f91cf97",
                },
                {
                    url: "/icon-512x512.png",
                    revision: "d8ea434cde7c72a5965e803eab67bb19",
                },
                {
                    url: "/manifest.json",
                    revision: "8cb480d7af6b202fe2c0506375c89d24",
                },
                {
                    url: "/vercel.svg",
                    revision: "26bf2d0adaf1028a4d4c6ee77005e819",
                },
            ],
            { ignoreURLParametersMatching: [] }
        ),
        e.cleanupOutdatedCaches(),
        e.registerRoute(
            "/",
            new e.NetworkFirst({
                cacheName: "start-url",
                plugins: [
                    {
                        cacheWillUpdate: async ({
                            request: e,
                            response: s,
                            event: i,
                            state: n,
                        }) =>
                            s && "opaqueredirect" === s.type
                                ? new Response(s.body, {
                                      status: 200,
                                      statusText: "OK",
                                      headers: s.headers,
                                  })
                                : s,
                    },
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
            new e.CacheFirst({
                cacheName: "google-fonts-webfonts",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 31536e3,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
            new e.StaleWhileRevalidate({
                cacheName: "google-fonts-stylesheets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 604800,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-font-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 604800,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-image-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 64,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\/_next\/image\?url=.+$/i,
            new e.StaleWhileRevalidate({
                cacheName: "next-image",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 64,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:mp3|wav|ogg)$/i,
            new e.CacheFirst({
                cacheName: "static-audio-assets",
                plugins: [
                    new e.RangeRequestsPlugin(),
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:mp4)$/i,
            new e.CacheFirst({
                cacheName: "static-video-assets",
                plugins: [
                    new e.RangeRequestsPlugin(),
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:js)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-js-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:css|less)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-style-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\/_next\/data\/.+\/.+\.json$/i,
            new e.StaleWhileRevalidate({
                cacheName: "next-data",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:json|xml|csv)$/i,
            new e.NetworkFirst({
                cacheName: "static-data-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            ({ url: e }) => {
                if (!(self.origin === e.origin)) return !1;
                const s = e.pathname;
                return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
            },
            new e.NetworkFirst({
                cacheName: "apis",
                networkTimeoutSeconds: 10,
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 16,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            ({ url: e }) => {
                if (!(self.origin === e.origin)) return !1;
                return !e.pathname.startsWith("/api/");
            },
            new e.NetworkFirst({
                cacheName: "others",
                networkTimeoutSeconds: 10,
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            ({ url: e }) => !(self.origin === e.origin),
            new e.NetworkFirst({
                cacheName: "cross-origin",
                networkTimeoutSeconds: 10,
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 3600,
                    }),
                ],
            }),
            "GET"
        );
});

// this.addEventListener("fetch", (e) => {
//     if (
//         e.request.url === "https://edulink.vercel.app/static/js/main.chunk.js"
//     ) {
//         e.waitUntil(
//             this.registration.showNotitification("hello", {
//                 body: "Notif Body",
//             })
//         );
//     }
// });

this.addEventListener("push", (e) => {
    e.waitUntil(
        this.registration.showNotification("hello", {
            body: "Notif Body",
        })
    );
});

self.addEventListener("push", (e) => {
    e.waitUntil(
        this.registration.showNotification("hello", {
            body: "Notif Body",
        })
    );
});

window.addEventListener("push", (e) => {
    e.waitUntil(
        this.registration.showNotification("hello", {
            body: "Notif Body",
        })
    );
});

async function subscribeToPush() {
    if (navigator.serviceWorker) {
        const reg = await navigator.serviceWorker.getRegistration();

        if (reg && reg.pushManager) {
            const subscription = await reg.pushManager.getSubscription();

            if (!subscription) {
                const key = await fetch("https://example.com/vapid_key");
                const keyData = await key.text();

                const sub = await reg.pushManager.subscribe({
                    applicationServerKey: keyData,
                    userVisibleOnly: true,
                });

                await fetch("https://example.com/push_subscribe", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        endpoint: sub.endpoint,
                        expirationTime: sub.expirationTime,
                        keys: sub.toJSON().keys,
                    }),
                });
            }
        }
    }
}

await subscribeToPush();
