// 包含 Schema 和 Model，最终将能够操作集合的 model 暴漏

var mongoose = require("./db.js");

var UserSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true // 通过 unique 设置唯一索引
    },
    age: {
        type: Number,
        index: true // 通过 index 属性来设置索引
    },
    status: {
        type: Number,
        default: 1
    }
});

var UserModel = mongoose.model("User", UserSchema, "user");

module.exports = UserModel;
