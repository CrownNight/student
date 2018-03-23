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
                        house: item.house,

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
/*
学生外宿信息的api
*/
app.get('/getListInfo', function (req, res) {
    let item = req.query;
    let index = (item.index - 1) * item.size;
    let result = {}
    db.query(`select count(*) count from house`, function (err, rows) {
        if (!err) {
            result.total = rows[0].count;
            let sql = `select * from house order by userId desc limit ${index},${item.size}`;
            db.query(sql, function (e, data) {
                if (!e) {
                    let value = []
                    data.map(key => {
                        value.push({
                            key: key.userId,
                            id: key.userId,
                            username: key.username,
                            department: key.department,
                            house: key.house,
                            isStayOut: key.isStayOut,
                            isStayOutDes: key.stayOutDes == null ? '' : key.stayOutDes,
                            isTuisu: key.isTuisu,
                            isTuisuDes: key.isTuisuDes == null ? '' : key.isTuisuDes,
                            isPass: key.isPass,
                            isPassDes: key.isPassDes,
                            major: key.major,
                            grade: key.grade
                        })
                    })
                    result.returnValue = value;
                    result.flag = true
                } else {
                    result.flag = false;
                    result.errorMessage = '获取列表失败'
                }
                res.send(result)
            })
        }

    })

})

app.post('/updateInfo', function (req, res) {
    let item = req.body;
    let result = {};
    if (item.isPass != undefined) {
        let sql = `update house set username='${item.username}',house='${item.house}',isStayOut='${item.isStayOut}',stayOutDes='${item.isStayOutDes ? item.isStayOutDes : ''}',isTuisu='${item.isTuisu}',isTuisuDes='${item.isTuisuDes ? item.isTuisuDes : ''}',department='${item.department}',isPass='${item.isPass}',isPassDes='${item.isPassDes ? item.isPassDes : ''}',major='${item.major}',grade='${item.grade}' where userId=${item.id}`;
        db.query(sql, function (err, rows) {
            if (!err) {
                result.flag = true;
            } else {
                result.flag = false;
                result.errorMessage = '审核失败，请重试。。。'
            }
            res.send(result);
        })
    } else {
        let sql = `update house set username='${item.username}',house='${item.house}',isStayOut='${item.isStayOut}',stayOutDes='${item.isStayOutDes ? item.isStayOutDes : ''}',isTuisu='${item.isTuisu}',isTuisuDes='${item.isTuisuDes ? item.isTuisuDes : ''}',department='${item.department}',isPass='3',major='${item.major}',grade='${item.grade}' where userId=${item.id}`;
        db.query(sql, function (err, rows) {
            if (!err) {
                result.flag = true;
            } else {
                result.flag = false;
                result.errorMessage = '修改失败，请重试...'
            }
            res.send(result)
        })
    }
})

app.post('/addApplyStayOut', function (req, res) {
    let result = {};
    let item = req.body;
    db.query(`select studentId,isPass from house`, function (err, rows) {
        if (!err) {
            let resu = ''
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].studentId === item.studentId && rows[i].isPass === '3') {
                    resu = 1
                }
            }
            if (resu == '1') {
                result.flag = true;
                result.returnValue = '你已有申请在审核，请不要重复提交'
                res.send(result);
            } else {
                let sql = `insert into house (username,house,major,grade,department,stayOutDes,isPass,studentId,isStayOut,isTuisu,isTuisuDes) values 
    ('${item.username}','${item.house}','${item.major}','${item.grade}','${item.department}','${item.change == 'ws' ? item.isStayOutDes : ''}','3','${item.studentId}','${item.change == 'ws' ? '是' : '否'}','${item.change == 'ts' ? '是' : '否'}',${item.change == 'ts' ? item.isStayOutDes : ''})`;
                db.query(sql, function (e, row) {
                    if (!e) {
                        result.flag = true;
                        result.returnValue = '申请审核成功,请等待审核。。。'
                    } else {
                        result.flag = false;
                        result.errorMessage = '添加审核失败，请重试。。。';
                    }
                    res.send(result);
                })
            }
        }
    })
})


/*
宿舍信息管理
*/

app.get('/getHouseInfoList', function (req, res) {
    let item = req.query;
    let result = {};
    let value = [];
    let index = (item.index - 1) * item.size;
    let sql = `select * from building order by id desc limit ${index},${item.size}`;
    let sql1 = `select count(*) count from building`;
    db.query(sql1, function (err, rows) {
        if (err != null) return;

        result.total = rows[0].count;
        db.query(sql, function (e, row) {
            if (e != null) return;

            row.map(key => {
                value.push({
                    key: key.id,
                    id: key.id,
                    house: key.house,
                    building: key.building,
                    dispenser: key.dispenser,
                    bed: key.bed,
                    tables: key.tables
                })
            })
            result.flag = true;
            result.returnValue = value;
            res.send(result)
        })
    })
})

app.post('/addHouse', function (req, res) {
    let item = req.body;
    let result = {};
    let sql1 = 'select house,building from building';
    db.query(sql1, function (e, row) {
        if (!e) {
            let resu = ''
            row.map(key => {
                if (key.house == item.house && key.building == item.building) {
                    resu = 1
                }
            })
            if (resu == 1) {
                result.flag = true;
                result.returnValue = '已存在该房间，添加失败'
                res.send(result)
            } else {
                let sql = `insert into building (house,building,bed,tables,dispenser) values ('${item.house}','${item.building}','${item.bed}','${item.tables}','${item.dispenser}')`
                db.query(sql, function (err, rows) {
                    if (err) {
                        result.flag = false;
                        result.errorMessage = '添加失败，请重试。。。'
                    } else {
                        result.flag = true;
                        result.returnValue = '添加成功'
                    }
                    res.send(result)
                })
            }
        }
    })

})

app.post('/updateHouse', function (req, res) {
    let result = {};
    let item = req.body;
    let sql = `update building set house='${item.house}',bed='${item.bed}',tables='${item.tables}',dispenser='${item.dispenser}',building='${item.building}' where id=${item.id}`
    db.query(sql, function (err, rows) {
        if (err != null) return;

        result.flag = true;
        result.returnValue = '修改成功';
        res.send(result)
    })
})

app.post('/deleteHouse', function (req, res) {
    let item = req.body;
    let result = {};
    let sql = 'delete from building where id=' + item.id;
    db.query(sql, function (err, rows) {
        if (err != null) return;

        result.flag = true;
        result.returnValue = '删除成功';
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



