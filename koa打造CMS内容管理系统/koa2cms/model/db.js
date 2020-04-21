// 数据库操作模块
const MongoClient = require("mongodb").MongoClient; // 引入模块
const ObjectID = require("mongodb").ObjectID;
const Config = require("./config.js");


class Db {
    static getInstance() { // 单例，解决多次实例化实力不共享的问题
        if (!Db.instance) {
            Db.instance = new Db();
        }
        return Db.instance;
    }
    constructor() {
        this.dbClient = ""; // 属性，放 db 对象
        this.connect(); // 初始化的时候连接数据库
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
    update(collName, json1, json2) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collName).updateOne(json1, {
                    $set: json2
                }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                })
            });
        });
    }
    insert(collName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collName).insertOne(json, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    } else {
                        resolve(result);
                    }
                })
            });
        });
    }
    remove(collName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then((db) => {
                db.collection(collName).removeOne(json, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    } else {
                        resolve(result);
                    }
                })
            });
        });
    }
    getObjectID(id) {
        return new ObjectID(id); // 把 mongodb 中的 id 字符串格式化
    }
}

module.exports = Db.getInstance();
