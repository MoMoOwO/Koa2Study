// 1. 引入 mongoose
const mongoose = require("mongoose");

// 2. 链接数据库
mongoose.connect("mongodb://localhost:27017/eggcms", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 如果有账户密码需要次啊用下面的连接方式
//mongoose.connect("mongodb://eggadmin:123456@localhost:27017/eggcms");

// 3. 操作 user 表（集合），定义一个 Schema
// Schema 中的字段需要与数据库中的字段一一对应，并对字段格式进行规定
var UserSchema = mongoose.Schema({
    name: String,
    age: Number,
    status: Number
});

// 4. 定义数据库模型，操作数据库
/*
    model 里面的第一个参数要注意： 首字母大写， 要和数据库表（ 集合） 名称对应，
    这个模型会和模型名称相同的复数的数据库建立连接，如下默认操作 users 集合
*/
//var User = mongoose.model("User", UserSchema);
// 通过第三个参数来指定要操作的数据库
var User = mongoose.model("User", UserSchema, "user");

// 5. 查询 users 表的数据
User.find({}, (err, doc) => {
    if (err) {
        console.log("查询出错：" + err);
    } else {
        console.log(doc);
    }
});

// 6. 增加数据
