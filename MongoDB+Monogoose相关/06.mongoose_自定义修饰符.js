var FocusModel = require("./model/focus.js");
var UserModel = require("./model/users.js");

// set 保存数据的时候格式化
/* var focus = new FocusModel({
    title: "轮播图2",
    pic: "http://www.xxxx.com/x2.jpg",
    redirect: "www.baidu.com"
});
focus.save((err) => {
    if (err) {
        console.log(err);
    } else {
        FocusModel.find({}, (error, doc) => {
            if (err) {
                console.log(error);
            } else {
                console.log(doc);
            }
        });
    }
}); */

// get 获取模型实例数据的时候格式化
var users = new UserModel({
    name: "张三",
    age: 19
});

console.log(users.name, users.age);
