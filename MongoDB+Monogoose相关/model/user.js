// 包含 Schema 和 Model，最终将能够操作集合的 model 暴漏

var mongoose = require("./db.js");

var UserSchema = mongoose.Schema({
    name: String,
    age: Number,
    status: {
        type: Number,
        default: 1
    }
});

var UserModel = mongoose.model("User", UserSchema, "user");

module.exports = UserModel;
