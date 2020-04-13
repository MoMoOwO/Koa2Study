var mongoose = require("./db.js");

var NewsSchema = mongoose.Schema({
    // 在 Schema 中配置预定义模式修饰符
    title: {
        type: String,
        trim: true // 保存数据时，该记录自动进行左右去空格操作
    },
    author: {
        type: String,
        lowercase: true // 保存数据时，该记录自动进行字母转小写
    },
    pic: {
        type: String,
        uppercase: true // 保存数据时，该记录自动进行字母转大写
    },
    content: String,
    status: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model("News", NewsSchema, "news");
