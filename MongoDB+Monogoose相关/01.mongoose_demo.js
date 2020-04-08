// 1. 引入 mongoose
const mongoose = require("mongoose");

// 2. 链接数据库
mongoose.connect("mongodb://127.0.0.1:27107/eggcms");

// 如果有账户密码需要次啊用下面的连接方式
//mongoose.connect("mongodb://eggadmin:123456@localhost:27017/eggcms");
