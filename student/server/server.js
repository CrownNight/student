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

/*
basicInfo的信息
获取学生基本信息
*/
app.get('/getUserList', function (req, res) {
    let item = req.query;
    let result = {}
    let index = (item.index - 1) * (item.size)
    db.query('select count(*) count from user', function (err1, rows1) {
        if (!err1) {
            result.total = rows1[0].count
        }
    })
    setTimeout(() => {
        db.query(`select * from user order by userId desc limit ${index},${item.size}`, function (err, rows) {
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
                result.returnValue = returnValue;


                result.flag = true
            } else {
                result.flag = false;
                result.errorMessage = '获取列表失败'
            }

            res.send(result)
        }, 300)
       
    })
})

app.post('/updateUserinfo', function (req, res) {
    let item = req.body;
    let sql = `update user set username='${item.userName}',userNumber=${item.number},sex='${item.sex}',phone=${item.phone},userClass='${item.class}',house='${item.house}' where userId=${item.userId}`
    db.query(sql, function (err, rows) {
        let result = {};
        if (!err) {
            result.flag = true;
            result.returnValue = '修改成功';
            res.send(result);
        }
    })
})

app.post('/addUser', function (req, res) {
    let item = req.body;
    let number = []
    let result = {}
    let resu = {}
    db.query('select userNumber from user ', function (err, rows) {
        if (!err) {
            for (let i = 0; i < rows.length; i++) {
                if (item.number == rows[i].userNumber) {
                    resu.number = rows[i].userNumber
                }
            }
        }
    })
    setTimeout(() => {
        if (resu.number) {
            result.flag = true;
            result.returnValue = '该学生已存在'
            res.send(result);
        } else {
            let sql = `insert into user (userName,sex,phone,userNumber,userClass,house,isAdmin) values ('${item.userName}','${item.sex}','${item.phone}','${item.number}','${item.class}','${item.house}','否')`
            db.query(sql, function (err, rows) {
                if (!err) {
                    result.flag = true;
                    result.returnValue = '添加成功'
                    res.send(result)
                }
            })
        }
    }, 1000)

})

app.post('/deleteUser', function (req, res) {
    let item = req.body;
    let result = {}
    let sql = `delete from user where userId=${item.userId}`;
    db.query(sql, function (err, rows) {
        if (!err) {
            result.flag = true;
        } else {
            result.flag = false
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



