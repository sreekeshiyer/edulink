module.exports = {
    images: {
        domains: ["i.ytimg.com", "cdn.vox-cdn.com", "i.gadgets360cdn.com"],
    },
    webpack: (config) => {
        config.experiments = { topLevelAwait: true };
        return config;
    },
};
