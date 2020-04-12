// 引入操作集合的 Model
var UserModel = require("./model/user.js");
var NewsModel = require("./model/news.js");

UserModel.find({}, (err, doc) => {
    if (err) {
        console.log(err);
    } else {
        console.log(doc);
    }
    console.log("------------");
});

var u = new UserModel({
    name: "张三三",
    age: 18
});
u.save((err) => {
    if (err) {
        console.log(err);
    }
    // 保存后获取新数据
    console.log("保存成功！");
    UserModel.find({}, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            console.log(doc);
        }
        console.log("------------");
    });
});


NewsModel.find({}, (err, doc) => {
    if (err) {
        console.log(err);
    } else {
        console.log(doc);
    }
});
