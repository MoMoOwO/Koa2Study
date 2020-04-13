var mongoose = require("./db.js");

// 数据校验
var StudentsSchema = mongoose.Schema({
    name: {
        type: String, // 指定数据类型
        require: true, // 必须传入
        minlength: 2 // 最短长度 2
    },
    id: {
        type: Number,
        min: 20100101001 // 最小值
    },
    age: {
        type: Number,
        min: 15, // 最小值
        max: 25 // 最大值
    },
    gender: {
        type: String,
        enum: ["男", "女"] // 枚举，数据值必须为枚举中的一个值。枚举用在字符串类型中
    },
    address: {
        type: String,
        match: /^山东省(.*)/, // 必须以 山东省 开头
        // 通过 validate 自定义验证器，如果通过验证返回 true，否则返回 false
        validate: function (address) {
            return address.length >= 6;
        }
    }
});

module.exports = mongoose.model("Students", StudentsSchema, "students");
