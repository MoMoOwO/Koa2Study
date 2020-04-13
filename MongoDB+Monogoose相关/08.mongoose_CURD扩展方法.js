var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/eggcms", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var UserSchema = mongoose.Schema({
    name: String,
    age: Number,
    status: {
        type: Number,
        default: 1
    }
});

// 通过静态方法进行 CURD 扩展
UserSchema.statics.findByAge = function (age, callback) {
    // 通过 find 方法获取 age 数据，this 关键字获取当前的 model
    this.find({
        "age": age
    }, (err, docs) => {
        callback(err, docs);
    });
};

// 通过实例方法扩展，基本不使用该方法
UserSchema.methods.print = function () {
    console.log("-----------");
    console.log("我是一个实例方法");
    console.log(this); // this 指向调用该方法的 UserModel 实例
    console.log("-----------");
}

var UserModel = mongoose.model("User", UserSchema, "user");

UserModel.findByAge(19, function (err, docs) {
    if (err) {
        console.log(err);
    } else {
        console.log(docs);
    }
});

// 实例化 Model 对象
var user = new UserModel({
    name: "张三啊",
    age: 22
});

user.print(); // 调用自定义的实例方法
