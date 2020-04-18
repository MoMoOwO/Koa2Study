# Koa2 学习记录

1. [视频链接](http://www.bilibili.com/video/av38925557)，该教程包含 Node.js 及 Express 框架，P27 之后的为 Koa2 框架。

2. 笔记为个人纪录，章节号与文件夹序号对应。

## MongoDB + mongoose

1. 由于该教程内容，牵扯到对 MongoDB 的数据库操作，所以添加了一部分该内容的学习。

2. 我之前再学习该老师的 express 教程的时候，发现老师在使用 Node.js 操作 MondoDB 数据库是使用的原生的方式，然而 mongoose 能够提供更加健壮的功能，且更容易操作 MongoDB 数据库。

3. 这部分内容，与整个教程的教授老师为同一人，[视频链接](http://www.bilibili.com/video/av41033371)。

### MongoDB 数据库导出与导入

1. 在 Mongodb 中我们使用 `mongodump` 命令来备份MongoDB 数据。该命令可以导出所有数据到指定目录中。`mongodump` 命令可以通过参数指定导出的数据量级转存的服务器。使用mongorestore 命令来恢复备份的数据。

2. 导入与导出命令

    ``` bash
    mongodump -h dbhost -d dbname -o dbdirectory

    mongorestore -h dbhost -d dbname path
    ```

    ![数据库导出与导入](http://image.acmx.xyz/msj%2Fdb.jpg)

### mongoose 入门以及 mongoose 实现数据的增删改查

1. [mongoose 官网](https://mongoosejs.com/)

2. mongoose 介绍：Monogoose 是 Node.js 异步 环境下对 mongodb 进行便捷操作的对象模型工具。Mongoose 是 NodeJS 的驱动，不能作为其它语言的驱动。

3. Mongoose 有两个特点

    (1) 通过关系型数据库的思想设计非关系型数据库

    (2) 基于 MongoDB 驱动，简化操作

### mongoose 安装以及使用

1. 安装：`npm i mongoose --save`

2. 引入 mongoose 并连接数据库

    ``` JavaScript
    // 引入 mongoose
    const mongoose = require("mongoose");

    // 链接数据库
    mongoose.connect("mongodb://localhost:27017/eggcms", { useNewUrlParser: true, useUnifiedTopology: true });
    // 如果有账户密码需要次啊用下面的连接方式
    //mongoose.connect("mongodb://eggadmin:123456@localhost:27017/eggcms");
    ```

3. 定义 Schema：数据库中的 Schema，为数据库对象的集合。schema 是 mongoose 里会用到的一种数据模式，可以理解为表结构的定义；每个 schema 会映射到 mongodb 中的一个 collection，他不具备操作数据库的能力。

    ``` JavaScript
    // 操作 user 表（集合），定义一个 Schema
    // Schema 中的字段需要与数据库中的字段一一对应，并对字段格式进行规定
    var UserSchema = mongoose.Schema({
        name: String,
        age: Number,
        status: Number
    });
    ```

4. 创建数据库模型

    (1) 定义好了 Schema，接下来就是生成 Model。Model 是由 schema 生成的模型，可以对数据库进行操作。

    (2) 注意：

    - `mongoose.model()` 里面可以传入两个参数，也可以传入三个参数，`mongoose.model(参数 1：模型名称（首字母大写）, 参数 2：Schema)` 或 `mongoose.model(参数 1：模型名称（首字母大写）, 参数 2: Schema, 参数 3：数据库集合名称)`
    - 如果传入 2 个参数的话：这个模型会和模型名称相同的复数的数据库建立连接；如通过 `var User = mongoose.model("User", UserSchema)` 方法创建模型，那么这个模型将会操作 Users 这个集合。
    - 如果传入 3 个参数的话：模型默认操作第三个参数定义的集合名称。

        ``` JavaScript
        // 定义数据库模型，操作数据库
        /*
            model 里面的第一个参数要注意： 首字母大写， 要和数据库表（ 集合） 名称对应，
            这个模型会和模型名称相同的复数的数据库建立连接，如下默认操作 users 集合
        */
        var User = mongoose.model("User", UserSchema);
        // 通过第三个参数来指定要操作的数据库
        //var User = mongoose.model("User", UserSchema, "user");
        ```

5. 查找数据

    ``` JavaScript
    User.find({}, (err, doc) => {
        if (err) {
            console.log("查询出错：" + err);
        } else {
            console.log(doc);
        }
    });
    ```

6. 增加数据

    ``` JavaScript
    /*
        实例化 Model，通过实例化的 Model 创建增加的数据
        实例.save()
    */
    var u = new User({
        name: "孙一",
        age: 20,
        status: 1
    });
    u.save(err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("success!");
        }
    });
    ```

7. 更新数据

    ``` JavaScript
    /*
        第一个参数为查询条件，即查询到要修改的数据
        第二个参数为修改条件
    */
    News.updateOne({
        "_id": "5e91d387edfdbb061454b417"
    }, {
        "title": "修改后的title1"
    }, (err, doc) => {
        if (err) {
            console.log(err);
        }
        console.log("Success!");
    });
    ```

8. 删除数据

    ``` JavaScript
    // 参数一为要删除的数据的查询条件
    News.deleteOne({
        "title": "修改后的title1"
    }, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("删除成功！");
        }
    });
    ```

9. mongoose 默认参数：增加数据的时候如果不传入数据则会使用默认配置的数据

    ``` JavaScript
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
    // Schema 中定义了默认参数，则插入数据时，如果没有为该字段赋值，则会使用该默认参数
    var u = new UserModel({
        name: "王七",
        age: 19
    });
    u.save();

    ```

10. 模块化

### Mongoose 预定义模式修饰符 Getters 与 Setters 自定义修饰符

1. Mongoose 预定义模式修饰符：Mongoose 提供了预定义修饰符，可以对我们增加的数据进行一些格式化。如 `lowercase`、`uppercase`、`trim`。

    ``` JavaScript
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
    ```

2. Mongoose Getters 与 Setters 自定义修饰符：除了 mongoose 内置修饰符以外，我们还可以通过 set（建议使用）修饰符在增加数据的时候对数据进行格式化。也可以通过 get（不建议使用）在模型实例获取数据的时候对进行格式化。

    ``` JavaScript
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
    ```

### Mongoose 索引、Mongoose 内置 CURD 方法、扩展 Mongoose Model 的静态方法和实例

1. Mongoose 索引

    (1) 索引是对数据库表中一列活多列的值进行排序的一种结构，可以让我们查询数据库变得更快。MongoDB 的索引几乎与传统的关系型数据库一摸一样，之其中也包括一些基本的查询优化技巧。

    (2) mongoose 中除了使用 MongoDB 原生方式创建索引以外，我们也可以在定义 Schema 的时候指定创建索引。

    ``` JavaScript
    var UserSchema = mongoose.Schema({
         name: {
             type: String,
             unique: true // 通过 unique 设置唯一索引
         },
         age: {
             type: Number,
             index: true  // 通过 index 属性来设置索引
         },
         status: {
             type: Number,
             default: 1
         }
     });
    ```

2. Mongoose 内置 CURD，[官方介绍](https://mongoosejs.com/docs/queries.html)：`Model.deleteMany()`、`Model.deleteOne()`、`Model.find()`、`Model.findById()`、`Model.findByIdAndDelete()`、`Model.findByIdAndRemove()`、`Model.findByIdAndUpdate()`、`Model.findOne()`、`Model.findOneAndDelete()`、`Model.findOneAndRemove()`、`Model.findOneAndReplace()`、`Model.findOneAndUpdate()`、`Model.replaceOne()`、`Model.updateMany()`、`Model.updateOne()`。

3. 扩展 Mongoose CURD 方法

    (1) 通过静态方法扩展

    ``` JavaScript
    // ....
    // 通过静态方法进行 CURD 扩展
    UserSchema.statics.findByAge = function (age, callback) {
        // 通过 find 方法获取 age 数据，this 关键字获取当前的 model
        this.find({
            "age": age
        }, (err, docs) => {
            callback(err, docs);
        });
    };

    var UserModel = mongoose.model("User", UserSchema, "user");

    UserModel.findByAge(19, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            console.log(docs);
        }
    });
    ```

    (2) 通过实例方法扩展

    ``` JavaScript
    // ...
    // 通过实例方法扩展，基本不使用该方法
    UserSchema.methods.print = function () {
        console.log("我是一个实例方法");
        console.log(this); // this 指向调用该方法的 UserModel 实例
    }
    var UserModel = mongoose.model("User", UserSchema, "user");
    // 实例化 Model 对象
    var user = new UserModel({
        name: "张三啊",
        age: 22
    });
    user.print(); // 调用自定义的实例方法
    ```

### Mongoose 数据校验

1. mongoose 校验参数

    (1) 用户通过 mongoose 对数据库增加数据的时候对数据合法性的检验就叫做数据校验。

    (2) 内置校验参数

    | 参数名    | 校验内容                                                     |
    | :-------- | :----------------------------------------------------------- |
    | required  | 表示这个数据必须传递                                         |
    | max       | 用于 Number 类型数据，规定最大值                             |
    | min       | 用于 Number 类型数据，规定最小值                             |
    | enum      | 枚举类型，要求数据必须满足枚举值，如 `enum: ["0", "1", "2"]` |
    | match     | 增加的数据必须符合 match（正则）的规则                       |
    | maxlength | 最大长度                                                     |
    | minlength | 最小长度                                                     |

    ``` JavaScript
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
            match: /^山东省(.*)/ // 必须以 山东省 开头
        }
    });
    ```

2. mongoose 自定义验证器，通过 `validate` 自定义验证器。

    ``` JavaScript
    // 数据校验
    var StudentsSchema = mongoose.Schema({
        // ...
        address: {
            type: String,
            match: /^山东省(.*)/, // 必须以 山东省 开头
            // 通过 validate 自定义验证器，如果通过验证返回 true，否则返回 false
            validate: function (address) {
                return address.length >= 6;
            }
        }
    });
    ```

### Mongoose 中使用 aggregate 聚合管道

1. MongoDB 聚合管道（Aggregation Pipeline）

    (1) 使用聚合管道可以对集合中的文档进行变换和组合。实际项目中常用于表关联查询、数据的统计。

    (2) MongoDB 中使用 `db.collection_name.aggregate([{stage}, ... ])` 方法来构建和使用聚合管道。如下为一个官方示例：
    ![聚合管道使用](http://image.acmx.xyz/msj%2Fmoag.jpg)

2. MongoDB Aggregation 管道操作符与表达式

    (1) 管道操作符

    | 管道操作符 | 描述                                         |
    | :--------- | :------------------------------------------- |
    | $project   | 增加、删除、重命名字段                       |
    | $match     | 条件匹配。只有满足条件的文档才能进入下一阶段 |
    | $limit     | 限制结果的数据                               |
    | $skip      | 跳过文档的数量                               |
    | $sort      | 条件排序                                     |
    | $group     | 条件组合结果，统计                           |
    | $lookup    | 用以引入其他集合的数据（表关联查询）         |

    (2) Sql 中的查询表达式与 NoSql 中的管道操作符的对比

    | Sql      | NoSql    |
    | :------- | :------- |
    | WHERE    | $match   |
    | GROUP BY | $group   |
    | HAVING   | $match   |
    | SELECT   | $project |
    | ORDER BY | $sort    |
    | LIMIT    | $linit   |
    | SUM()    | $sum     |
    | COUNT()  | $sum     |
    | JOIN     | $lookup  |

    (3) 管道表达式：管道操作为作为“键”，所对应的“值”叫做管道表达式。例如 `{$match:{status: "A"}}` 中 `$match` 称为管道操作符，而 `status: "A"` 称为管道表达式，是管道操作符的操作数（Operand）。每个 管道表达式是一个文档结构，它是由字段名、字段值和一些表达式操作符组成的。

    | 常用表达式操作符 | 描述                   |
    | :--------------- | :--------------------- |
    | $addToSet        | 将文档指定字段的值去重 |
    | $max             | 文档指定字段的最大值   |
    | $min             | 文档指定字段的最小值   |
    | $sum             | 文档指定字段求和       |
    | $avg             | 文档指定字段求平均     |
    | $gt              | 大于给定值             |
    | $lt              | 小于给定值             |
    | $gte             | 大于等于给定的值       |
    | $lte             | 小于等于给定的值       |
    | $eq              | 等于给定值             |

    (4) 案例数据

    ``` bash
    db.order.insert({"order_id":1,"uid":10,"trade_no":111,"all_price":100,"all_num":2})
    db.order.insert({"order_id":2,"uid":7,"trade_no":222,"all_price":90,"all_num":2})
    db.order.insert({"order_id":3,"uid":9,"trade_no":333,"all_price":20,"all_num":6})
    db.order_item.insert({"order_id":1,"title":"商品鼠标1","price":50,num:1})
    db.order_item.insert({"order_id":1,"title":"商品键盘2","price":50,num:1})
    db.order_item.insert({"order_id":1,"title":"商品键盘3","price":0,num:1})
    db.order_item.insert({"order_id":2,"title":"牛奶","price":50,num:1})
    db.order_item.insert({"order_id":2,"title":"酸奶","price":40,num:1})
    db.order_item.insert({"order_id":3,"title":"矿泉水","price":2,num:5})
    db.order_item.insert({"order_id":3,"title":"毛巾","price":10,num:1})
    ```

    (5) 案例

    - 通过 `$project` 之查找获取 order 集合的 trade_no 和 all_price 字段。

        ``` bash
        db.order.aggregate([
            {
                $project: {trade_no: 1, all_price: 1}
            }
        ])
        ```

    - 通过 `$match` 来获取 all_price 大于 90 的记录，类似于直接在 `find()` 中添加查询条件。

        ``` bash
        db.order.aggregate([
            {
                $project: {trade_no: 1, all_price: 1}
            },
            {
                $match: {"all_price": {$gt: 90}}
            }
        ])
        ```

    - 通过 `$group` 统计每个订单的订单数量，按照订单号分组。

        ``` bash
        db.order_item.aggregate([
            {
                $group: {_id: "$order_id", total: {$sum: "$num"}}
            }
        ])
        ```

    - 通过 `$sort` 对查询结果进行排序

        ``` bash
        db.order.aggregate([
            {
                $project: {trade_no: 1, all_price: 1}
            },
            {
                $match: {"all_price": {$gt: 90}}
            },
            {
                $sort: {"all_price": -1}
            }
        ])
        ```

    - 通过 `$limit` 限制查询记录条数

        ``` bash
        db.order.aggregate([
            {
                $project:{ trade_no:1, all_price:1 }
            },
            {
                $match:{"all_price":{$gte:90}}
            },
            {
                $sort:{"all_price":-1}
            },
            {
                $limit: 1
            }
        ])
        ```

    - 通过 `$skip` 指定跳过的记录数

        ``` bash
        db.order.aggregate([
            {
                $project:{ trade_no:1, all_price:1 }
            },
            {
                $match:{"all_price":{$gte:90}}
            },
            {
                $sort:{"all_price":-1}
            },
            {
                $skip: 1
            }
        ])
        ```

    - 通过 `$lookup` 进行表关联查询

        ``` bash
        db.order.aggregate([
            {
                $lookup:
                {
                    from: "order_item",
                    localField: "order_id",
                    foreignField: "order_id",
                    as: "items"
                }
            }
        ])
        ```

3. Mongoose 中使用 aggregate 多表关联查询

    ``` JavaScript
    // 查询 order 表，即 order 下面的 order_item
    OrderModel.aggregate([{
        $lookup: {
            from: "order_item", // 要关联的表
            localField: "order_id", // 关联所使用的字段
            foreignField: "order_id", // 关联的表中对应的字段
            as: "items" // 关联后存放的字段
        }
    }], (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            console.log(JSON.stringify(docs));
        }
    });
    ```

4. mongoose 中获取 ObjectId：`mongoose.Types.ObjectId()`

### Mongoose 中使用 populate 实现关联查询

1. Mongoose populate [官方文档](https://mongoosejs.com/docs/populate.html)

2. populate 使用

    (1) 定义 ref

    ``` JavaScript
    var ArticleSchema = mongoose.Schema({
        title: {
            type: String,
            unique: true
        },
        cid: {
            type: mongoose.Types.ObjectId,
            ref: "ArticleCate" // 通过 ref 引用，指定关联的 集合，ref 的值为可以操作集合的 Model
        },
        author_id: {
            type: mongoose.Types.ObjectId,
            ref: "Author"
        },
        author_name: String,
        description: String,
        content: String
    });
    ```

    (2) 通过 `populate` 接口实现关联查询

    ``` JavaScript
    ArticleModel.find({}).populate("cid").populate("author_id").exec((err, docs) => {
        if (err) {
            console.log(err);
        } else {
            console.log(docs);
        }
    });
    ```

## Koa2

### koa2 框架介绍与环境搭建及预备知识

1. koa 框架介绍

    (1) Node.js 是一个异步的世界，官方API 支持的都是 callback 形式的异步编程模型，这会带来许多问题，例如：callback 嵌套问题，异步函数中可能同步调用 callback 返回数据，带来不一致性。为了解决以上问题 Koa2 出现了。

    (2) Koa 是一个基于 Node.js 平台的下一代 web 开发框架。koa 是由 Express 原班人马打造的，致力于成为一个更小、更富有表现力、更健壮的 Web 框架。使用 koa2 编写web 应用，可以免除重复繁琐的回调函数嵌套， 并极大地提升错误处理的效率。koa 不在内核方法中绑定任何中间件， 它仅仅提供了一个轻量优雅的函数库，使得编写Web 应用变得得心应手。开发思路和 express 差不多，最大的特点就是可以避免异步嵌套。

    (3) [中文官方](https://www.koajs.com.cn/#)

2. koa2.x 框架 的安装使用

    (1) 安装 Node.js 8.x 以上版本。开发 Koa2 之前，Node.js 是有要求的，它要求 Node.js 版本高于 V7.6。因为node.js 7.6 版本开始完全支持 async/await，所以才能完全你支持我们的 Koa2。

    (2) 安装 Koa 框架和我们以前安装其他模块是一样的。运行命令 `npm install --save koa`。

    (3) 简单使用

    ``` JavaScript
    // 1. 引入模块
    var koa = require("koa");

    // 2. 实例化一个 app
    var app = new koa();

    // 3. 配置路由
    // 配置中间件，暂时当作路由
    app.use(async (ctx) => {
        ctx.body = "你好，koa 2.x";
    });

    // 4. 监听端口
    app.listen(8888);
    ```

3. ES6 常见的语法

    (1) let：let 关键字与 var 关键字类似，用于声明变量；不同的是 let 声明的变量是在块作用域中生效，var 生命的变量在全局作用域中生效。const：也是声明块级作用域的变量，但是使用 const 关键字声明的变量是常量，初始化之后不能再做改变。

    (2) 箭头函数

    ```JavaScript
    setTimeout(function () {
        console.log("1s 过去了。");
    }, 1000);
    setTimeout(() => { // 箭头函数中 this 指向上下文
        console.log("1s 过去了。");
    }, 1000);
    ```

    (3) 对象、属性简写

    ``` JavaScript
    let name = "张三";
    let age = 18;

    // 对象、属性的简写
    let p = { // 对象简写，直接使用花括号包裹，属性和方法写道花括号中
        name, // 当属性名和属性值变量名相同时，可以使用只写一个变量名方式简写
        age,
        run() { // 方法可以直接声明方法来简写，调用的时候还是使用方法名调用
            console.log(`${this.name}在跑步`);
        }
    }
    console.log(p.age);
    p.run();
    ```

    (4) 模板字符串，用于字符串拼接。

    ``` JavaScript
    let name = "张三";
    let age = 18;
    console.log("姓名：" + name + "，年龄：" + age);
    // 使用模板字符串进行字符串拼接
    console.log(`姓名：${name}，年龄：${age}`);
    ```

    (5) Promise

    ``` JavaScript
    // 使用 promise 实现从异步方法中获取数据
    // resolve 表示成功的回调，reject 表示失败的回调
    let pr = new Promise((resolve, reject) => {
        // 模拟 ajax
        setTimeout(() => {
            let pName = "李四";
            if (Math.random() < 0.5) {
                resolve(pName); // 成功的回调
            } else {
                reject("查询失败！"); // 失败的回调
            }

        }, 3000);
    });
    pr.then((data) => {
        console.log(data);
    }, (err) => {
        console.log(err);
    });
    ```

4. 异步处理 async 与 await

    (1) async 是“异步”的简写，而 await 可以认为是 async wait 的简写。所以应该很好理解 async 用于申明一个function 是异步的，而 await 用于等待一个异步方法执行完成。可以简单理解为：async 是让方法变成异步，而 await 则是等待异步方法执行完成。

    (2) 详细说明

    - async 是让方法变成异步，在终端里用 node 执行这段代码，你会发现输出了 `Promise {'Hello async'}`，这时候会发现它返回的是Promise。

        ``` JavaScript
        async function getData(){
            return "Hello async";
        }
        console.log(getData());
        ```

    - await 在等待 async 方法执行完毕，其实 await 等待的只是一个表达式，这个表达式在官方文档里说的是 Promise 对象，但是它也可以接受普通值。注意：await 必须在 async 方法中才可以使用因为 await 访问本身就会造成程序停止堵塞，所以必须在异步方法中才可以使用。

        ``` JavaScript
        async function getData2() {
            return "async 修饰的异步方法返回的数据";
        }
        async function test() {
            let data = await getData2();
            console.log(data);
        }
        test();
        ```

    - async/await 同时使用：async 会将其后的函数（函数表达式或 Lambda）的返回值封装成一个 Promise 对象，而 await 会等待这个 Promise 完成，并将其 resolve 的结果返回出来。

        ``` JavaScript
        // 配合使用 async/await 获取 异步方法中的数据
        function getData4() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    let userName = "王五";
                    resolve(userName);
                });
            });
        }
        async function test2() {
            var ndata = await getData4();
            console.log(ndata);
        }
        test2();
        ```

### koa 路由、get 传值以及动态路由

1. Koa 路由

    (1) 路由（Routing）是由一个 URI（或者叫路径）和一个特定的 HTTP 方法（GET、POST 等）组成的，涉及到应用如何响应客户端对某个网站节点的访问。通俗的讲：路由就是根据不同的URL 地址，加载不同的页面实现不同的功能。

    (2) Koa 中的路由和 Express 有所不同，在 Express 中直接引入 Express 就可以配置路由，但是在 Koa 中我们需要安装对应的 koa-router 路由模块来实现。可通过运行 `npm i koa-router -S` 命令进行安装。

2. koa get 传值及获取传值

    (1) koa 路由基本使用

    ``` JavaScript
    // 引入相关模块
    const Koa = require("koa");
    const Router = require("koa-router");

    // 实例化一个 app
    let app = new Koa();

    // 实例化一个路由对象
    let router = new Router();
    // 配置路由
    router.get("/", async (ctx) => { // ctx:context 上下文，包含了 request 和 response 信息
        ctx.body = "首页"; // 返回数据  相当于原生中的 res.writeHead() res.end()
    }).get("/news", async (ctx) => {
        ctx.body = "这是新闻页";
    });

    // 配置启用路由
    app.use(router.routes());
    app.use(router.allowedMethods());
    /* 作用： 这是官方文档的推荐用法，
    我们可以看到 router.allowedMethods() 用在了路由匹配router.routes() 之后, 所以在当所有
    路由中间件最后调用.此时根据ctx.status 设置response 响应头 */

    // 监听端口
    app.listen(8888, () => {
        console.log("Starting at post 8888");
    });
    ```

    (2) get 传值，及获取传值：在koa2 中 GET 传值通过 request 接收，但是接收的方法有两种：`query` 和`querystring`。`query`：返回的是格式化好的参数对象。`querystring`：返回的是请求字符串。另外还可以通过 `ctx.request` 对象来获取传值。相比来说直接通过 `query` 来获取传值比较方便且实用。

    ``` JavaScript
    // 获取 get 传值
    // http://localhost:8888/newscontent?nid=123
    router.get("/newscontent", async (ctx) => {
        // 从 ctx 中 获取 get 传值
        /*
        在koa2 中 GET 传值通过 request 接收，但是接收的方法有两种： query 和 querystring。
        query：返回的是格式化好的参数对象。
        querystring：返回的是请求字符串。
        */
        console.log(ctx.query); // { nid: '123' }
        console.log(ctx.querystring); // nid=123 获取的是一个字符串

        // ctx 里面的 request 里面获取 get 传值
        console.log(ctx.request.url); // /newscontent?nid=123
        console.log(ctx.request.query); // { id: '1223' }
        console.log(ctx.request.querystring); // nid=123

        ctx.body = "新闻详情";
    });
    ```

3. 动态路由

    ``` JavaScript
    // 获取动态路由传值
    // http://localhost:8888/xxx
    router.get("/newscontent/:nid", async (ctx) => {
        console.log(ctx.params); // { nid: 'ddd' } 获取动态路由数据
        ctx.body = "新闻详情";
    });
    ```

### koa 中间件

1. 什么是 koa 的中间件

    (1) 通俗的讲：中间件就是匹配路由之前或者匹配路由完成做的一系列的操作，我们就可以把它叫做中间件。

    (2) 在express 中间件（Middleware）是一个函数，它可以访问请求对象（request object (req)），响应对象（response object (res)），和 web 应用中处理请求-响应循环流程中的中间件，一般被命名为next 的变量。在 Koa 中中间件和 express 有点类似。

    (3) 中间件的共鞥你包括：

    - 执行任何代码
    - 修改请求和响应对象
    - 终结请求-响应循环
    - 调用堆栈中的下一个中间件

    (4) 如果我的 get、post 回调函数中，没有 next 参数，那么就匹配上第一个路由，就不会往下匹配了。如果想往下匹配的话，那么需要写 `next()`

2. koa 中间件分类及使用

    (1) 应用级中间件

    ``` JavaScript
    // ...
    // 应用级中间件
    app.use(async (ctx, next) => { // 没有路由参数，则匹配所有路由
        // 所有的路由请求响应前都会先经过该处
        // 应用案例：后台验证访问是否许可
        // demo：匹配任何路由之前打印日期
        console.log(new Date());
        await next(); // 当前路由匹配完成之后，继续向下匹配路由；如果不写 next() 则路由到此位置终止
    });
    // ...
    ```

    (2) 路由级中间件

    ``` JavaScript
    // 路由级中间件
    router.get("/", async (ctx) => {
        ctx.body = "Hello koa";
    });
    router.get("/news", async (ctx, next) => {
        console.log("这是新闻页");
        await next(); // 继续向下匹配
    });
    router.get("/news", async (ctx) => {
        ctx.body = "新闻页";
    });
    ```

    (3) 错误处理中间件

    ``` JavaScript
    // 错误处理中间件
    // use 声明的中间件无论位置在哪，都会优先于路由中间件执行
    app.use(async (ctx, next) => {
        next();
        if (ctx.status === 404) { // 如果页面找不到
            ctx.status = 404;
            ctx.body = "这是一个 404 页面";
        } else {
            console.log(ctx.url);
        }
    });
    ```

    (4) 第三方中间件

    ``` JavaScript
    const static = require('koa-static');
    const staticPath = './static';
    app.use(static(
        path.join( __dirname, staticPath)
    ));
    ```

3. koa 中间件的执行顺序：Koa 的中间件和 Express 不同，Koa 选择了洋葱圈模型。
![洋葱模型](http://image.acmx.xyz/msj%2Fmdwyc.jpg)

### koa 中使用 ejs 模板引擎

1. 安装 koa-view 和 ejs

    (1) 运行命令 `npm i koa-views -S` 安装 koa-views。

    (2)运行命令 `npm i ejs -S` 安装 ejs。

2. 引入与配置 koa-views 中间件

    ``` JavaScript
    const views = require("koa-views");
    // 配置模板引擎中间件 -- 第三方中间件
    // app.use(views("views", {map: {html: "ejs"}}));  // 配置方式1，模板文件后缀名 .html
    app.use(views("views", {
        extension: "ejs" // 使用 ejs 模板引擎  配置方法2，模板文件后缀名 .ejs
    }));
    ```

3. koa 中使用 ejs

    ``` JavaScript
    router.get("/", async (ctx) => {
        let title = "你好，EJS";
        // 渲染模板引擎，并传递数据
        await ctx.render("index", {
            title
        });
    });
    ```

4. ejs 模板

    (1) ejs 模板引入：`<%-include("public/header.ejs")%>`

    (2) ejs 绑定数据：`<%=h%>`

    (3) ejs 绑定 html 数据：`<%-h%>`

    (4) ejs 模板判断语句

    ``` HTML
    <!-- 条件判断 -->
    <%if(num > 25) {%>
        大于 25
    <%} else {%>
        小于 25
    <%}%>
    ```

    (5) ejs 模板中使用循环语句绑定数据

    ``` HTML
    新闻列表 --- ejs 循环渲染数据
    <ul>
        <%for (let i = 0; i < list.length; i++) {%>
        <li><%=list[i]%></li>
        <%}%>
    </ul>
    ```

    (6) 当我们使用 koa 需要在每一个路由的 render 里面都要渲染一个公共的数据，公共的数据放在 state 里面，这样的话在模板任何地方都可以使用，需要在应用级中间件中配置。

    ``` JavaScript
    app.use(async (ctx, next) => {
        ctx.state = {
            session: "这是一个 session",
            appName: "app"
        };
        await next();
    });
    ```

### koa 中 post 提交数据以及 koa-bodyparser 中间件的使用

1. 原生 Node.js 获取 post 提交数据

    ``` JavaScript
    // common.js
    exports.getPostData = function (ctx) {
        // 这是一个异步
        return new Promise((resolve, reject) => {
            try {
                // 通过管道获取数据
                let str = "";
                ctx.req.on("data", (chunk) => {
                    str += chunk;
                });
                ctx.req.on("end", (chunk) => {
                    resolve(str);
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    // app.js
    const common = require("./module/common.js");
    // ...
    // 响应 post 清酒平接受 post 请求提交的数据
    router.post("/doAdd", async (ctx) => {
        // 获取 post 数据
        // 方式1：原生 nodejs 在 koa 中获取 post 请求数据
        let data = await common.getPostData(ctx);
        ctx.body = data;
    });
    ```

2. koa 中 使用 koa-bodyparse 中间件获取 post 提交数据

    (1) 安装，运行命令 `npm i koa-bodyparser -S`

    (2) 配置及使用

    ``` JavaScript
    // 引入模块
    const bodyParser = require("koa-bodyparser");

    // 响应 post 清酒平接受 post 请求提交的数据
    router.post("/doAdd", async (ctx) => {
        // 获取 post 数据
        // 方式2：借助 koa-bodyparser 中间件在 koa 中获取 post 请求数据
        console.log(ctx.request.body);
        ctx.body = ctx.request.body;
    });
    ```

### koa 静态资源中间件 koa-static

1. 安装，运行命令 `npm i koa-static -S` 进行安装。

2. 使用

    ``` JavaScript
    // 引入模块
    const static = require("koa-static");
    // ...
    // 当使用 static 中的静态资源的时候，首先在 static 目录下查找，查找无果则继续往下面目录查找
    //app.use(static("./static"));
    app.use(static(path.join(__dirname, "static")));
    // 同样可以配置多个静态路径，会挨个查找静态资源
    // 配置之后可以在模板中正常引入静态资源了
    ```

### koa art-template 模板引擎

1. 常见模板引擎

    (1) 适用于 koa 的模板引擎选择非常多，比如 jade、ejs、nunjucks、art-template 等。

    (2) art-template 是一个简约、超快的模板引擎。它采用作用域预声明的技术来优化模板渲染速度，从而获得接近 JavaScript 的运行性能，并且支持 Node.js 和浏览器。art-template 支持 ejs 的语法，也可以用自己的类似 angular 数据绑定的语法。[官网](http://aui.github.io/art-template/docs/index.html)

    (3) 常见模板引擎的性能对比
    ![性能](http://image.acmx.xyz/msj%2Ftmpxn.jpg)
    ![负荷](http://image.acmx.xyz/msj%2Ftmpfh.jpg)

2. 在 koa 中使用 art-template 模板引擎

    (1) 安装依赖模块，运行命令 `npm i art-template koa-art-template -S`

    (2) 安装配置并使用

    ``` JavaScript
    // 引入模块
    const render = require("koa-art-template");

    // ...

    // 配置 koa-art-template 模板引擎
    render(app, {
        root: path.join(__dirname, "views"), // 视图根目录
        extname: ".art", // 模板文件后缀名
        debug: process.env.NODE_ENV !== "production" // 是否开启调试模式
    });

    router.get("/", async (ctx) => {
        // 使用
        let list = {
            name: "张三"
        }
        await ctx.render("index", {
            list
        });
    });
    ```

3. art-template 模板引擎语法，[文档](http://aui.github.io/art-template/zh-cn/docs/syntax.html)。

### koa 中 cookie 与 session 的使用

1. cookie

    (1) cookie 简介

    - cookie 是存储与访问者的计算机中的变量。可以让我们用同一个浏览器访问同一个域名的时候共享数据。
    - HTTP 是无状态协议。简单地说，当你浏览一个页面，然后转到同一个网站的另一个页面，服务气无法认识到这是同一个浏览器在访问同一个网站。每一次的访问，都是没有任何关系的。
    - 应用场景：保存用户信息，浏览器历史记录，猜你喜欢的功能，十天免登录，多个页面之间传值，cookie 实现购物车功能。

    (2) koa 中设置 cookie：`ctx.cookies.set(name, value, [options]);`，通过 `options` 设置 cookie.name 的 value，具体如下：

    | options 名称 | options 值                                                                                                                                     |
    | :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
    | maxAge       | 一个数字表示从 Date.now() 得到的毫秒数                                                                                                         |
    | expires      | cookie 过期的 Date                                                                                                                             |
    | path         | cookie 的路径，默认是 '/'                                                                                                                      |
    | domain       | cookie 域名                                                                                                                                    |
    | secure       | 安全 cookie，默认 false，设置成 true 表示只有 https 可以访问                                                                                   |
    | httpOnly     | 是否只是服务器访问 cookie，默认是 true                                                                                                         |
    | overwrite    | 一个布尔值，表示是否覆盖以前设置的同名的 cookie，默认为 false，若设置为 true，在同一请求中设置相同名称的所有 cookie 从 set-cookie 表头中过滤掉 |

    (3) koa 中获取 cookie 的值：`ctx.cokies.get("name");`

    (4) koa 中设置中文 cookie

    ``` JavaScript
    // koa 中无法直接设置中文 cookie
    let name = Buffer.from("张三").toString("base64"); // 转换为 base64 字符
    ctx.cookies.set("username", name, {
        maxAge: 60 * 1000 * 60 // 过期时间
    });
    let n = Buffer.from(String(ctx.cookies.get("username")), "base64"); // 还原 base64 字符
    console.log(n); // 张三
    ```

2. session

    (1) session 简单介绍：session 是另一种记录客户状态的机制，不同的是 cookie 保存在客户端浏览器中，而 session 保存在服务器上。

    (2) session 的工作流程：当浏览器访问服务器斌告诉你个第一次请求时，服务气端会创建一个 session 对象，生成一个类似于 key-value 键值对，然后将 key（cookie）返回到浏览器（客户）端，浏览器下次再访问时，携带 key（cookie），找到对应的 session（value）。客户的信息都保存在 session 中。

    (3) koa-session 的使用

    - 安装，运行命令 `npm i koa-session -S`
    - 配置及使用

        ``` JavaScript
        // 引入模块
        const session = require("koa-session");
        // 配置 koa-session 中间件
        app.keys = ["some secret hurr"]; // cookie 签名
        const CONFIG = {
            key: "koa:sess", // cookie key 默认 koa:sess 一般不修改
            maxAge: 1000, // cookie 过期时间，单位 ms，默认为一天，  需要设置
            overwrite: true, // 是否可以重写，默认 true
            httpOnly: true, // cookie 是否只有服务器端可以访问，默认 true
            signed: true, // 签名，默认 true
            rolling: false, // 在每次请求时强行设置 cookie，这将重置 cookie 过期时间，默认 false
            renew: true, // 是否 maxAge 无操作的时候使 cookie 过期  需要设置
        };
        app.use(session(CONFIG, app)); // 应用配置项

        router.get("/", async (ctx) => {
            // 获取 session
            let username = ctx.session.userinfo;
            console.log(username);
            await ctx.render("index", {
                username
            });
        });

        router.get("/login", async (ctx) => {
            // 设置 session
            ctx.session.userinfo = "张三";
            ctx.body = "登录页";
        });
        ```

3. cookie 和 session 的区别

    (1) cookie 数据存放在客户的浏览器上，session 数据放在服务器上。

    (2) cookie 不是很安全，别人可以分析存放在本地的 cookie 并进行 cookie 欺骗；考虑到安全因素应当使用 session。

    (3) session 会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能；考虑到减轻服务器性能方面，应当使用 cookie。

    (4) 单个 cookie 保存的数据不能超过 4k，很多浏览器都限制一个站点最多保存 20 个 cookie。

### MongoDB Compass Community 可视化工具的使用

1. MongoDB Compass Community 可视化工具介绍：了，MongoDB Compass 是 MongoDB 官网提供的一个集创建数据库、管理集合和文档、运行临时查询、评估和优化查询、性能图表、构建地理查询等功能为一体的 MongoDB 可视化管理工具。

2. MongoDB Compass Community 下载

    (1) [下载](https://www.mongodb.com/download-center/community)最新 MongoDB 安装完成后会自动安装 MongoDB 可视化工具。

    (2) 单独[下载](https://www.mongodb.com/download-center/compass) MongoDB 可视化工具。

### 封装 MongoDB 库之前的一些准备工作-ES5、ES6 class 类，静态方法以及单例模式

1. 原生 JS 中的类、静态方法、集成

2. ES6 中的类、静态方法、集成

3. ES6 的单例模式

### 封装 koa 操作 MongoDB 数据库的 DB 类库

1. 目标：基于官方 node-mongodb-native 驱动，封装一个“更小、更快、更灵活”的 DB 模块，让我们用 nodejs 操作  MongoDB 数据库更方便、更灵活。

2. koa 操作 MongoDB 数据库：[node-mongodb-native官方文档](http://mongodb.github.io/node-mongodb-native/)
