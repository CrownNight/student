const express = require('express');
let bodyParser = require('body-parser');
let moment = require('moment');
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
登录注册
*/
app.post('/userLogin', function (req, res) {
    let item = req.body;
    let result = {};
    let sql = `select * from user where username='${item.username}' and password='${item.password}'`;
    db.query(sql, function (err, rows) {
        if (err) {
            result.flag = false;
            result.returnValue = '登录失败，请重试。。。';
            res.send(result)
        } else {
            if (rows[0] == undefined) {
                result.flag = false;
                result.returnValue = '用户名或密码错误';
                res.send(result)
            } else {
                result.flag = true;
                result.returnValue = rows
                res.send(result);
            }
        }
    })
})
/**
 * 注册
 */
app.post('/register', function (req, res) {
    let item = req.body;
    let result = {};
    let sql1 = `select userId from user where idCard='${item.idCard}'`;
    let sql = `insert into user (isAdmin,username,phone,idCard,password,sex) values ('${item.type}','${item.username}','${item.phone}',
    '${item.idCard}','${item.pass}','${item.sex}')`
    db.query(sql, function (err, rows) {
        if (err != null) return;

        db.query(sql1, function (e, row) {
            result.flag = e != null ? false : true;
            result.returnValue = e != null ? '注册失败，请重试...' : row;
            res.send(result)
        })
    })
})

/**
 * 获取不同专业的人数
 */
app.post('/getDataForStudent', function (req, res) {
    let result = {};
    let item = req.body;
    let arr = [];
    item.map(key => {
        db.query(`select count(*) count from user where college='${key}'`, function (err, rows) {
            if (err != null) return;

            result.flag = true
            arr.push({ count: rows[0].count, college: key })
        })
    })

    setTimeout(() => {
        result.returnValue = arr;
        res.send(result)
    }, 300)
})
/**
 * 退宿外宿不同状态人数
 */
app.get('/getCountForStatus', function (req, res) {
    let result = {};
    let arr = []
    let text = [1, 2, 3]
    text.map(i => {
        db.query(`select count(*) count from house where isPass='${i}'`, function (err, rows) {
            if (err != null) return;

            result.flag = true;
            arr.push({
                value: rows[0].count, number: i
            })
        })
    })
    setTimeout(() => {
        result.returnValue = arr;
        res.send(result);
    }, 300)
})
/*
basicInfo的信息
获取学生基本信息
*/

app.get('/getUserList', function (req, res) {
    let item = req.query;
    let result = {}
    let index = (item.index - 1) * (item.size)
    db.query(`select count(*) count from user where isAdmin='${item.type}'`, function (err1, rows1) {
        if (!err1) {
            result.total = rows1[0].count
        }
    })
    setTimeout(() => {
        db.query(`select * from user where isAdmin='${item.type}' order by userId desc limit ${index},${item.size}`, function (err, rows) {
            if (!err) {
                let returnValue = [];
                rows.map(item => {
                    returnValue.push({
                        key: item.userId,
                        userId: item.userId,
                        userName: item.username,
                        number: item.userNumber,
                        phone: item.phone,
                        sex: item.sex,
                        isAdmin: item.isAdmin,
                        house: item.house,
                        profession: item.profession,
                        grade: item.grade,
                        college: item.college,
                        idCard: item.idCard
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

app.get('/basicSearch',function(req,res){
    let item=req.query;
    let index = (item.index - 1) * (item.size)
    let sql=`select * from user where username like '%${item.keywords}%' or userNumber like '%${item.keywords}%' or house like '%${item.keywords}%'
    or grade like '%${item.keywords}%' or sex like '%${item.keywords}%' order by userId desc limit ${index},${item.size} `;
    let result={};
    db.query(sql,function(err,row){
        if (!err) {
            let returnValue = [];
            row.map(item => {
                returnValue.push({
                    key: item.userId,
                    userId: item.userId,
                    userName: item.username,
                    number: item.userNumber,
                    phone: item.phone,
                    sex: item.sex,
                    isAdmin: item.isAdmin,
                    house: item.house,
                    profession: item.profession,
                    grade: item.grade,
                    college: item.college,
                    idCard: item.idCard
                })
                result.total=returnValue.length
            })
            result.returnValue = returnValue;           
            result.flag = true
        } else {
            result.flag = false;
            result.errorMessage = '获取列表失败'
        }
    })
   setTimeout(()=>{ res.send(result)},100)
})

app.post('/updateUserinfo', function (req, res) {
    let item = req.body;
    let sql = `update user set username='${item.userName}',userNumber=${item.number ? item.number : ''},sex='${item.sex}',phone=${item.phone},
    house='${item.house ? item.house : ''}',profession='${item.profession ? item.profession : ''}',
    college='${item.college ? item.college : ''}',grade='${item.grade ? item.grade : ''}',idCard='${item.idCard}' where userId=${item.userId}`
    db.query(sql, function (err, rows) {
        let result = {};
        console.log(err)
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
    let resu = ''
    db.query('select userNumber from user ', function (err, rows) {
        if (!err) {
            for (let i = 0; i < rows.length; i++) {
                if (item.number == rows[i].userNumber) {
                    resu = 1
                }
            }
            if (resu == 1) {
                result.flag = true;
                result.returnValue = '该信息已存在'
                res.send(result);
            } else {
                let sql = `insert into user (userName,sex,phone,userNumber,profession,house,isAdmin,college,grade,idCard) values ('${item.userName}','${item.sex}','${item.phone}','${item.number ? item.number : ''}',
                '${item.profession ? item.profession : ''}','${item.house ? item.house : ''}','${item.type}','${item.college ? item.college : ''}','${item.grade ? item.grade : ''}','${item.idCard}')`
                db.query(sql, function (err, rows) {
                    if (!err) {
                        result.flag = true;
                        result.returnValue = '添加成功'
                        res.send(result)
                    }
                })
            }
        }
    })
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
    db.query(`select count(*) count from house where isPass='${item.type}'`, function (err, rows) {
        if (!err) {
            result.total = rows[0].count;
            let sql = `select * from house where isPass='${item.type != '' ? item.type : ''}' order by userId desc limit ${index},${item.size}`;
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
    let sql = `select * from building where `+ (item.count==0 ? `empty=${item.count}`:`empty!=0`)  +` order by id desc limit ${index},${item.size}`;
    let sql1 = `select count(*) count from building where `+(item.count==0 ? ` empty=${item.count}`:` empty!=0`);
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
                    tables: key.tables,
                    empty: key.empty,
                    haspeople: key.haspeople
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
    let emp = item.haspeople <= item.bed ? item.bed - item.haspeople : 0;
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
                let sql = `insert into building (house,building,bed,tables,dispenser,empty,haspeople) values ('${item.house}','${item.building}','${item.bed}','${item.tables}','${item.dispenser}',
            '${emp}','${item.haspeople <= item.bed ? item.haspeople : item.bed}')`
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
    let sql = `update building set house='${item.house}',bed='${item.bed}',tables='${item.tables}',dispenser='${item.dispenser}',building='${item.building}',empty=${item.bed - item.haspeople},haspeople=${item.haspeople} where id=${item.id}`
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

app.get('/getEmptyHouse', function (req, res) {
    let result = {};
    let arr = [];
    db.query(`select count(*) count from building`, function (err, rows) {
        if (err != null) return;

        let countData = rows[0].count;
        db.query('select count(*) data from building where empty=0', function (e, row) {
            if (e != null) return;

            let emptyData = countData - row[0].data;
            result.returnValue = [{ value: emptyData, name: '未住满' }, { value: row[0].data, name: '已住满' }]
            result.flag = true;
            res.send(result)
        })
    })
})

/*
来访信息登记api
*/

app.get('/getRegisterInfo', function (req, res) {
    let result = {};
    let item = req.query;
    let index = (item.index - 1) * item.size;
    let sql = `select * from register where type='${item.type}' order by id desc limit ${index},${item.size}`
    db.query(`select count(*) count from register where type='${item.type}' `, function (err, rows) {
        if (err != null) return;

        result.total = rows[0].count;
        db.query(sql, function (e, row) {
            if (e != null) return;

            let data = [];
            row.map(key => {
                data.push({
                    key: key.id,
                    id: key.id,
                    studentName: key.name,
                    visName: key.visName,
                    startTime: key.startTime,
                    relationship: key.relationship,
                    idCard: key.idCard,
                    des: key.Des,
                    endTime: key.endTime,
                    status: key.status,
                    repaireHouse: key.repaireHouse,
                    class: key.class,
                    borrowSth: key.borrowSth,
                    discipline: key.discipline
                })
            })
            result.flag = true;
            result.returnValue = data;
            res.send(result)
        })
    })
})
app.post('/updateRegisterInfo', function (req, res) {
    let result = {};
    let item = req.body;
    let month = item.startTime.substr(6,1);
    let year = item.startTime.substr(0,4)
    let sql = `update register set name='${item.studentName ? item.studentName : ''}',visName='${item.visName ? item.visName : ''}',
    startTime='${item.startTime ? item.startTime : ''}',endTime='${item.endTime ? item.endTime : ''}',
    relationship='${item.relationship ? item.relationship : ''}',idCard='${item.idCard ? item.idCard : ''}',
    Des='${item.des ? item.des : ''}',status='${item.status ? item.status : ''}',repaireHouse='${item.repaireHouse ? item.repaireHouse : ''}',
    class='${item.class ? item.class : ''}',borrowSth='${item.borrowSth ? item.borrowSth : ''}',discipline='${item.discipline ? item.discipline : ''}',
    month='${month}',year='${year}' where id=${item.id}`;

    db.query(sql, function (err, rows) {
        result.flag = err == null ? true : false;
        result.returnValue = err == null ? '修改成功' : '修改失败，请重试。。。';
        res.send(result)
    })
})
app.post('/deleteRegisterInfo', function (req, res) {
    let result = {};
    let item = req.body;
    let sql = `delete from register where id=${item.id}`;
    db.query(sql, function (err, rows) {
        result.flag = err == null ? true : false;
        result.returnValue = err == null ? '删除成功' : '删除失败，请重试。。。';
        res.send(result);
    })
})
app.post('/addRegisterInfo', function (req, res) {
    let result = {};
    let item = req.body;
    let month = item.startTime.substr(6,1)
    let year = item.startTime.substr(0,4) 
    let sql = `insert into register (name,visName,startTime,endTime,relationship,idCard,Des,status,repaireHouse,class,borrowSth,discipline,type,month,year) values 
    ('${item.studentName ? item.studentName : ''}','${item.visName ? item.visName : ''}','${item.startTime ? item.startTime : ''}','${item.endTime ? item.endTime : ''}',
    '${item.relationship ? item.relationship : ''}','${item.idCard ? item.idCard : ''}','${item.des ? item.des : ''}','${item.status ? item.status : ''}',
    '${item.repaireHouse ? item.repaireHouse : ''}','${item.class ? item.class : ''}','${item.borrowSth ? item.borrowSth : ''}','${item.discipline ? item.discipline : ''}',
    '${item.type}','${month}','${year}')`;
    db.query(sql, function (err, rows) {
        result.flag = err == null ? true : false;
        result.returnValue = err == null ? '添加成功' : '添加失败，请重试。。。'
        res.send(result)
    })
})

app.post('/examineRegisterInfo', function (req, res) {
    let result = {};
    let item = req.body;
    let sql = `update register set status='${item.status}',endTime='${item.endTime}' where id=${item.id}`;
    db.query(sql, function (err, rows) {
        result.flag = err != null ? false : true;
        result.returnValue = err != null ? '审核失败，请重试。。。' : '审核成功';
        res.send(result)
    })
})

//每日来访的人数
app.get('/getDateForVister', function (req, res) {
    let item = req.query
    let result = {};
    let row = []
    let sql=''
    if(item.datetype=='day'){
        sql = `select startTime from register where type='${item.type}'`;
    }else if(item.datetype=='month'){
        sql=`select month from register where type='${item.type}'`
    }else{
        sql=`select year from register where type='${item.type}'`
    }

    db.query(sql, function (err, rows) {
        if (err != null) return;

        rows.map(key => {
            row.push(key.startTime||key.month||key.year)
        })
        setTimeout(() => {
            result.flag = true
            result.returnValue = row;
            res.send(result)
        }, 300)
    })
})
app.post('/getCountForVister', function (req, res) {
    let result = {};
    let arr = [];
    let item = req.body;
    let ty = req.query
    let type=''
    if(ty.datetype=='day'){
        type='startTime'
    }else if(ty.datetype=='month'){
        type='month'
    }else{
        type='year'
    }
    
    item.map(key => {
        let sql=`select count(*) count from register where ${type}='${key}' and type='${ty.type}'`
        db.query(sql, function (err, rows) {
            if (err != null) return;

            arr.push(rows[0].count)
        })
    })

    setTimeout(() => {
        result.flag = true;
        result.returnValue = arr;
        res.send(result)
    }, 300)
})

/**
 * 维修信息解决状态的数量
 */
app.get('/getRegisterInfo1', function (req, res) {
    let result = {};
    let item = req.query;
    let index = (item.index - 1) * item.size;
    let sql = `select * from register where type='${item.type}' and status='${item.status}' order by id desc limit ${index},${item.size}`
    db.query(`select count(*) count from register where type='${item.type}' and status='${item.status}' `, function (err, rows) {
        if (err != null) return;

        result.total = rows[0].count;
        db.query(sql, function (e, row) {
            if (e != null) return;

            let data = [];
            row.map(key => {
                data.push({
                    key: key.id,
                    id: key.id,
                    studentName: key.name,
                    visName: key.visName,
                    startTime: key.startTime,
                    relationship: key.relationship,
                    idCard: key.idCard,
                    des: key.Des,
                    endTime: key.endTime,
                    status: key.status,
                    repaireHouse: key.repaireHouse,
                    class: key.class,
                    borrowSth: key.borrowSth,
                    discipline: key.discipline
                })
            })
            result.flag = true;
            result.returnValue = data;
            res.send(result)
        })
    })
})
app.get('/getRepaireStatus', function (req, res) {
    let item = req.query;
    let data = ['未解决', '已解决'];
    let result = {};
    let newArr = [];
    data.map(key => {
        db.query(`select count(*) count from register where status='${key}' and type='${item.type}'`, function (err, rows) {
            if (err != null) return;

            newArr.push({ value: rows[0].count, name: key })
        })
    });
    setTimeout(() => {
        result.flag = true;
        result.returnValue = newArr
        res.send(result)
    }, 300)
})


/**
 * 获取报修信息的日期和日期对应的报修数量
 */
app.get('/getDateForRepaire', function (req, res) {
    let item = req.query;
    let result = {};
    let sql=''
    if(item.datetype=='day'){
       sql = `select startTime from register where type='${item.type}'`;
    }else if(item.datetype=='month'){
        sql = `select month from register where type='${item.type}'`;
    }else{
        sql = `select year from register where type='${item.type}'`;        
    }
    db.query(sql, function (err, rows) {
        if (err != null) return;

        let arr = [];
        rows.map(key => {
            arr.push(key.startTime||key.month||key.year);
        })
        setTimeout(() => {
            result.flag = true;
            result.returnValue = arr;
            res.send(result)
        }, 300)
    })
})
app.post('/getCountForRepaire', function (req, res) {
    let item = req.body;
    let date = req.query;
    let result = {};
    let newArr = [];
    let dateType=''
    if(date.datetype=='day'){
        dateType='startTime'
    }else if(date.datetype=='month'){
        dateType='month'
    }else{
        dateType='year'
    }
    item.map(key => {
        let sql=`select count(*) count from register where ${dateType}='${key}' and type='${date.type}' and status='未解决'`
        db.query(sql, function (err, rows) {
            if (err != null) return;

            newArr.push(rows[0].count)
        })
    })
    setTimeout(() => {
        result.flag = true;
        result.returnValue = newArr;
        res.send(result)
    }, 400)
})
/*
个人信息
*/

app.get('/getPersonalInfo', function (req, res) {
    let item = req.query;
    let result = {};
    let sql = `select * from user where userId=${item.id}`;
    db.query(sql, function (err, rows) {
        result.flag = err != null ? false : true;
        result.returnValue = err != null ? '获取个人信息失败' : rows;
        res.send(result)
    })
})

app.post('/updatePersonalInfo', function (req, res) {
    let item = req.body;
    let result = {};
    let sql = `update user set username='${item.username}',userNumber='${item.number}',phone='${item.number}',college='${item.college}',profession='${item.profession}',
    grade='${item.grade}',sex='${item.sex}',house='${item.house}',idCard='${item.idCard}' where userId=${item.id}`;
    db.query(sql, function (err, rows) {
        result.flag = err != null ? false : true;
        result.returnValue = err != null ? '修改失败，请重试...' : '修改成功';
        res.send(result);
    })
})

/*
新闻和公告信息
*/

app.get('/getNewsList', function (req, res) {
    let item = req.query;
    let result = {};
    let index = (item.index - 1) * item.size
    let sql = `select * from news where type='${item.type}' order by id desc limit ${index},${item.size}`;
    let sql1 = `select count(*) count from news where type='${item.type}' `
    db.query(sql1, function (e, row) {
        if (e != null) return;
        result.total = row[0].count;
        db.query(sql, function (err, rows) {
            result.flag = err != null ? false : true;
            result.returnValue = err != null ? '获取列表失败' : rows;
            res.send(result);
        })
    })
})
app.post('/addNewsList', function (req, res) {
    let item = req.body;
    let result = {};
    let sql = `insert into news (type,ad,adTitle,news,newsTitle) values ('${item.type}',
    '${item.type == 'ad' ? item.content : ''}','${item.type == 'ad' ? item.title : ''}',
    '${item.type == 'new' ? item.content : ''}','${item.type == 'new' ? item.title : ''}')`
    db.query(sql, function (err, rows) {
        result.flag = err != null ? false : true;
        result.returnValue = err != null ? '添加失败，请重试。。。' : '添加成功';
        res.send(result);
    })
})

/**
 * 修改密码
 */
app.post('/updatePassword', function (req, res) {
    let item = req.body;
    let result = {};
    let sql = `update user set password='${item.newpass}' where username='${item.username}' and idCard='${item.idCard}'`;
    db.query(sql, function (err, rows) {
        result.flag = err != null ? false : true;
        result.returnValue = err != null ? '修改失败，请重试。。。' : '修改成功'
        res.send(result)
    })
})


/**
 * 获取物品借用的日期和数量
 */
app.get('/getDateForBorrow', function (req, res) {
    let item = req.query;
    let result = {};
    let date = [];
    let sql = '';
    if(item.datetype=='day'){
        sql=`select startTime from register where type='${item.type}' and status='${item.status}'`
    }else if(item.datetype=='month'){
        sql=`select month from register where type='${item.type}' and status='${item.status}'`        
    }else{
        sql=`select year from register where type='${item.type}' and status='${item.status}'`        
    }
    db.query(sql, function (err, rows) {
        if (err != null) return;

        rows.map(key => {
            date.push(key.startTime||key.month||key.year)
        })
        setTimeout(() => {
            result.flag = true;
            result.returnValue = date;
            res.send(result)
        }, 300)
    })
})

app.post('/getCountForBorrow', function (req, res) {
    let date = req.body;
    let item = req.query;
    let result = {};
    let count = [];
    let name=''
    if(item.datetype=='day'){
        name='startTime'
    }else if(item.datetype=='month'){
        name='month'
    }else{
        name='year'
    }
    date.map(key => {
        db.query(`select count(*) data from register where status='${item.status}' and ${name}='${key}'`, function (err, rows) {
            if (err != null) return;

            count.push(rows[0].data)
        })
    });
    setTimeout(() => {
        result.flag = true;
        result.returnValue = count;
        res.send(result)
    }, 300)
})
app.get('/getDataForPie', function (req, res) {
    let item = req.query;
    let result = {};
    let sta = ['已归还', '未归还'];
    let newArr = []
    sta.map(key => {
        db.query(`select count(*) data from register where status='${key}' and type='${item.type}'`, function (err, rows) {
            if (err != null) return;

            newArr.push({ value: rows[0].data, name: key })
        })
    });
    setTimeout(() => {
        result.flag = true;
        result.returnValue = newArr;
        res.send(result)
    }, 300)
})

/**
 * 违纪信息
 */
app.get('/getDataOfDisc', function (req, res) {
    let type = req.query.type;
    let sta = ['一般', '严重', '非常严重']
    let arr = [];
    let result = {}
    sta.map(key => {
        db.query(`select count(*) count from register where type='${type}' and discipline='${key}'`, function (err, rows) {
            if (err != null) return;

            arr.push({ value: rows[0].count, name: key })
        })
    });
    setTimeout(() => {
        result.flag = true;
        result.returnValue = arr;
        res.send(result)
    }, 300)
})
app.get('/getDateOfDisc', function (req, res) {
    let item = req.query;
    let result = {};
    let dateArr = [];
    let sql='';
    if(item.datetype=='day'){
        sql=`select startTime from register where type='${item.type}'`
    }else if(item.datetype=='month'){
        sql=`select month from register where type='${item.type}'`        
    }else{
        sql=`select year from register where type='${item.type}'`        
    }
    
    db.query(sql, function (err, rows) {
        if (err != null) return;

        rows.map(key => {
            dateArr.push(key.startTime||key.month||key.year)
        })
    })
    setTimeout(() => {
        result.flag = true;
        result.returnValue = dateArr;
        res.send(result)
    }, 300)
})
app.post('/getCountOfDisc', function (req, res) {
    let item = req.body;
    let date = req.query;
    let result = {};
    let newData = [];
    let name=''
    if(date.datetype=='day'){
        name='startTime'
    }else if(date.datetype=='month'){
        name='month'
    }else{
        name='year'
    }
    item.map(key => {
        db.query(`select count(*) count from register where type='${date.type}' and ${name}='${key}'`, function (err, rows) {
            if (err != null) return;

            newData.push(rows[0].count)
        })
    })
    setTimeout(() => {
        result.flag = true;
        result.returnValue = newData;
        res.send(result)
    }, 300)
})
app.get('/getRegisterInfoOfDisc', function (req, res) {
    let result = {};
    let item = req.query;
    let index = (item.index - 1) * item.size;
    let sql = `select * from register where type='${item.type}' and discipline='${item.discipline}' order by id desc limit ${index},${item.size}`
    db.query(`select count(*) count from register where type='${item.type}' and discipline='${item.discipline}' `, function (err, rows) {
        if (err != null) return;

        result.total = rows[0].count;
        db.query(sql, function (e, row) {
            if (e != null) return;

            let data = [];
            row.map(key => {
                data.push({
                    key: key.id,
                    id: key.id,
                    studentName: key.name,
                    visName: key.visName,
                    startTime: key.startTime,
                    relationship: key.relationship,
                    idCard: key.idCard,
                    des: key.Des,
                    endTime: key.endTime,
                    status: key.status,
                    repaireHouse: key.repaireHouse,
                    class: key.class,
                    borrowSth: key.borrowSth,
                    discipline: key.discipline
                })
            })
            result.flag = true;
            result.returnValue = data;
            res.send(result)
        })
    })
})












































//返回的入口和出口文档类型的必须放在最下面
app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'build') + '/index.html');
});
app.listen(8000, function () {
    console.log('8000端口已启动!\n');
});



