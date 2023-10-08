const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/user', // Proxy all requests under /user
    createProxyMiddleware({
      target: 'http://13.48.67.44',
      changeOrigin: true,
    })
  );
};
