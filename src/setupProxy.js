// Work around for webpackDevServer issue.
// From https://github.com/facebook/create-react-app/issues/11762
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://localhost:3001',
      changeOrigin: true,
    })
  );
};