var mongoose = require("./db.js");

var FocusSchema = mongoose.Schema({
    // 在 Schema 中配置预定义模式修饰符
    title: {
        type: String,
        trim: true // 保存数据时，该记录自动进行左右去空格操作
    },
    pic: String,
    redirect: {
        type: String,
        // 使用 set 来创建自定义模式修饰符，在使用模型实例保存数据时，将对数据进行格式化
        set(params) { // 增加数据的时候对当前字段进行处理
            // params 为获取的传递的当前字段的值，返回的为数据库中实际保存的值
            /*
                www.baidu.com -> http://www.baidu.com
                http://www.baidu.com -> http://www.baidu.com
            */
            if (!params) {
                return '';
            } else {
                if (params.indexOf("http://") !== 0 && params.indexOf("https://") !== 0) {
                    return "http://" + params;
                }
                return params;
            }
        }
    },
    status: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model("Focus", FocusSchema, "focus");
