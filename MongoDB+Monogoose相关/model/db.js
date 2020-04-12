// 模块化

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

// 暴漏链接到数据库的 mongoose
module.exports = mongoose;
