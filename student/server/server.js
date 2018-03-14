const express = require('express');
let bodyParser = require('body-parser');
const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const app = express();
let db = require('../config/db')

let NODE_ENV = process.env.NODE_ENV || 'production';
let isDev = NODE_ENV === 'development';

const config = isDev ? require('../webpack.dev.js') : require('../webpack.prod.js');
const compiler = webpack(config);

//读取wwwroot下的静态文件
app.use(express.static(path.resolve(__dirname, '../wwwroot')));

app.use(bodyParser.json()); // property parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // property parsing application/x-www-form-urlencoded
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


app.get('/getUserList', function (req, res) {
    db.query('select * from user', function (err, rows) {
        let result = {}
        if (!err) {
            let returnValue = [];
            rows.map(item => {
                returnValue.push({
                    key: item.userId,
                    userId: item.userId,
                    userName: item.username,
                    number: item.userNumber,
                    class: item.userClass,
                    phone: item.phone,
                    sex: item.sex,
                    isAdmin: item.isAdmin,
                    house: item.house
                })
            })
            result.returnValue=returnValue;
            result.flag=true
        }else{
            result.flag=false;
            result.errorMessage='获取列表失败'
        }
        res.send(result)
    })
})




//返回的入口和出口文档类型的必须放在最下面
app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'build') + '/index.html');
});
app.listen(8000, function () {
    console.log('8000端口已启动!\n');
});



