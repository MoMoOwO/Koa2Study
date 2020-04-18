/*
    1. 安装 mongodb：npm i mongodb -S

    2. 引入 mongodb 下面的MongoClient

    3. 定义数据库连接的地址，以及配置数据库
        let url = "mongodb://localhost:27107/"
        let dbName = "koa";

    4. node.js 连接数据库
        MongoClient.connect(url, function(){
            const db = db.client.db(dbName); // 数据库 db 对象
        });

    5. 操作数据库
        db.user.insert
        MongoClient.connect(url, function(err,db){
            db.collection("user").insertOne({"name": "张三"}， function(err, result) {
                db.close(); // 关闭连接
            })
        })
*/
const MongoClient = require("mongodb").MongoClient; // 引入模块

const dbUrl = "mongodb://localhost:27017"; // 数据库连接地址

let dbName = "koa"; // 数据库名称
/*
console.time("start");
// 连接数据库
MongoClient.connect(dbUrl, (err, client) => {
    if (err) {
        console.log(err);;
        return;
    } else {
        let db = client.db(dbName);
        console.timeEnd("start");
        // 增加数据
        db.collection("users").insertOne({
            name: "王五",
            age: 21,
            gender: "男",
            status: 1
        }, (error) => {
            if (!error) {
                console.log("增加数据成功！");

                // 关闭数据库链接
                client.close();
            }
        });
    }
}); */
console.time("start test")
MongoClient.connect(dbUrl, (err, client) => {
    if (err) {
        console.log(err);;
        return;
    } else {
        let db = client.db(dbName);
        // 查询数据
        let result = db.collection("users").find({});
        result.toArray((err, docs) => {
            console.log(docs);
        });
        console.timeEnd("start test");
        client.close();
    }
});
