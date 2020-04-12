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
    title: "string", // 这样表示类型也可以
    author: String,
    pic: String,
    content: String,
    status: Number
});

// 定义数据库模型，操作数据库
// 通过第三个参数来指定要操作的数据库
var News = mongoose.model("News", NewsSchema, "news"); // 操作第三个参数指定的表

// 7. 更新数据
/*
    第一个参数为查询条件，即查询到要修改的数据
    第二个参数为修改条件
*/
/* console.log("-----update------");
News.updateOne({
    "_id": "5e91d387edfdbb061454b417"
}, {
    "title": "修改后的title1"
}, (err, doc) => {
    if (err) {
        console.log(err);
    }
    console.log("Success!");
});

News.find({}, (err, doc) => {
    if (err) {
        console.log(err);
    } else {
        console.log(doc);
    }
}); */


// 8. 删除数据
console.log("------delete------");
// 参数一为要删除的数据的查询条件
News.deleteOne({
    "title": "修改后的title1"
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("删除成功！");
    }
});
