const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withPWA({
    pwa: {
        dest: "public",
        swSrc: "sw.js",
//         register: true,
//         runtimeCaching,
    },
    images: {
        domains: ["i.ytimg.com", "cdn.vox-cdn.com", "i.gadgets360cdn.com"],
    },
});
