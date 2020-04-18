// 数据库操作模块
const MongoClient = require("mongodb").MongoClient; // 引入模块
const Config = require("./config.js");


class Db {
    static getInstance() { // 单例，解决多次实例化实力不共享的问题
        if (!Db.instance) {
            Db.instance = new Db();
        }
        return Db.instance;
    }
    constructor() {
        //this.connect(); // 初始化的时候连接数据库
        this.dbClient = ""; // 属性，放 db 对象
    }
    connect() {
        // 连接数据库
        return new Promise((resolve, reject) => {
            if (!this.dbClient) { // 解决数据库多次链接问题，数据库操作的时间大多花费在链接数据库上
                MongoClient.connect(Config.dbUrl, (err, client) => {
                    if (err) {
                        reject(err);
                    } else {
                        this.dbClient = client.db(Config.dbName);
                        resolve(this.dbClient);
                    }
                });
            } else {
                resolve(this.dbClient);
            }
        })
    }
    find(collName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                let result = db.collection(collName).find(json);
                result.toArray((err, docs) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(docs);
                    }
                });
            });
        });
    }
    update() {

    }
    insert() {

    }
}

// var db = new Db();
var db = Db.getInstance();
setTimeout(() => {
    console.time("start");
    db.find("users", {}).then((data) => console.log(data));
    console.timeEnd("start");
}, 100);

setTimeout(() => {
    console.time("start1");
    db.find("users", {}).then((data) => console.log(data));
    console.timeEnd("start1");
}, 300);

// var db2 = new Db();
var db2 = Db.getInstance();
setTimeout(() => {
    console.time("start2");
    db2.find("users", {}).then((data) => console.log(data));
    console.timeEnd("start2");
}, 500);

setTimeout(() => {
    console.time("start3");
    db2.find("users", {}).then((data) => console.log(data));
    console.timeEnd("start3");
}, 600);
