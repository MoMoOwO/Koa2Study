// 引入 mongoose
const mongoose = require("mongoose");

// 链接数据库
// useNewUrlParser 这个属性会在 url 里识别验证用户所需的 db，为生计钱是不需要指定的，升级后一定要指定
mongoose.connect("mongodb://localhost:27017/eggcms", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log("数据库连接失败！" + err);
    } else {
        console.log("数据库链接成功！");
    }
});

// 定义集合映射 Schema，注意字段名称必须和数据库保持一致
var UserSchema = mongoose.Schema({
    name: String,
    age: Number,
    status: {
        // 通过对字段指定一个对象，对象中 type 指定字段类型，default 指定默认参数，
        // 即在插入数据时，如果没有为该字段赋值，则会使用该默认参数
        type: Number,
        default: 1
    }
});

// 定义 model 操作集合
var UserModel = mongoose.model("User", UserSchema, "user");

UserModel.find({}, (err, doc) => {
    if (err) {
        console.log(err);
    } else {
        console.log(doc);
    }
});

// mongoose 默认参数：增加数据的时候如果不传入数据则会使用默认配置的数据

// 定义增加的数据
// 1. 此时数据库中存入数据没有 status 字段（没有指定默认参数情况下）
/* var u = new UserModel({
    name: "王五",
    age: 21
}); */
// 2. 此时数据库中存入数据没有 gender 字段
/* var u = new UserModel({
    name: "王六",
    age: 21,
    status: 1,
    gender: "男"
}); */
// 3. Schema 中定义了默认参数，则插入数据时，如果没有为该字段赋值，则会使用该默认参数
var u = new UserModel({
    name: "王七",
    age: 19
});
u.save();
