// 包含 Schema 和 Model，最终将能够操作集合的 model 暴漏

var mongoose = require("./db.js");

var UserSchema = mongoose.Schema({
    name: {
        type: String,
        // 使用 get 来对直接从模型实例获取数据时进行格式化
        get(params) {
            return "a001" + params;
        }
    },
    age: Number,
    status: {
        type: Number,
        default: 1
    }
});

var UserModel = mongoose.model("User", UserSchema, "user");

module.exports = UserModel;
