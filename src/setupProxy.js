const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    // ...You can now register proxies as you wish!
    app.use(proxy('/userservice', {
        target: 'http://localhost:4001/user-service-api/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/userservice": "/"
        },
    }));
    app.use(proxy('/productservice', {
        target: 'http://localhost:4001/product-service-api/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/productservice": "/"
        },
    }));
    app.use(proxy('/orderservice', {
        target: 'http://localhost:4001/order-service-api/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/orderservice": "/"
        },
    }));
    app.use(proxy('/publicservice', {
        target: 'http://localhost:4001/public-service-api/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/publicservice": "/"
        },
    }));

};