const express = require('express');
let bodyParser = require('body-parser');
let multer = require('multer'); // v1.0.5
let upload = multer(); // for parsing multipart/form-data
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const app = express();

let NODE_ENV = process.env.NODE_ENV || 'production';
let isDev = NODE_ENV === 'development';

const config = isDev ? require('../webpack.dev.js') : require('../webpack.prod.js');
const compiler = webpack(config);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

    app.use(webpackDevMiddleware(compiler, {
        //noInfo: true,
        publicPath: config.output.publicPath,
        stats: {
            colors: true
        },
        headers: {
            "Access-Control-Allow-Origin": "*",//处理跨域请求
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    }));
    //热加载
    app.use(webpackHotMiddleware(compiler));

    app.get('/*', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'build') + '/index.html');
    });


    app.listen(8000, function () {
        console.log('8000端口已启动!\n');
    });



