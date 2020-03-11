const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
    app.use(
        "/geniusApi",
        createProxyMiddleware({
            target: "https://api.genius.com/",
            pathRewrite: {
                "^/geniusApi": ""
            },
            changeOrigin: true
        })
    );
};