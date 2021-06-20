const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        createProxyMiddleware('/modelEvaluations', {
            target: 'http://0.0.0.0:5000',
            secure: false,
        }),
        createProxyMiddleware('/datasets', {
            target: 'http://0.0.0.0:5000',
            secure: false,
        }),
        createProxyMiddleware('/models', {
            target: 'http://0.0.0.0:5000',
            secure: false,
        }),
    );
};