// ES6 单例模式
// 单例就是无论实例化多少次，构造函数只执行一次
// 例如我们操作数据库的时候只连接一次
class Db {
    static getInstance() { // 静态方法实现单例
        if (!Db.instance) {
            Db.instance = new Db();
        }
        return Db.instance;
    }
    constructor() {
        console.log("实例化的时候会触发构造函数");
        this.connect();
    }
    connect() {
        console.log("连接数据库");
    }
    find() {
        console.log("查询数据库");
    }
}

var myDb = new Db();
var myDb1 = new Db();
var myDb2 = new Db();

console.log("-----");

var myDb = Db.getInstance();
var myDb1 = Db.getInstance();
var myDb2 = Db.getInstance();
