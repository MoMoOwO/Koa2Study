// 引入 mongoose
const mongoose = require("mongoose");

// 链接数据库
mongoose.connect("mongodb://localhost:27017/eggcms", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 操作 user 表（集合），定义一个 Schema
// Schema 中的字段需要与数据库中的字段一一对应，并对字段格式进行规定
var NewsSchema = mongoose.Schema({
    title: String,
    author: String,
    pic: String,
    content: String,
    status: 1
});

// 定义数据库模型，操作数据库
// 通过第三个参数来指定要操作的数据库
var User = mongoose.model("User", UserSchema, "user"); // 操作第三个参数指定的表

// 7. 更新数据


User.find({}, (err, doc) => {
    if (err) {
        console.log("查询出错：" + err);
    } else {
        console.log(doc);
    }
});
