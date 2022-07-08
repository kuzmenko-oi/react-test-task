const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/*',
    createProxyMiddleware({
      target: 'https://jsonplaceholder.typicode.com/',
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite: {
        '^/api': '' // remove 'api' part
      }
    })
  );
};
