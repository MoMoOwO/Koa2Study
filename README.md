# Koa2 学习记录

1. [视频链接](http://www.bilibili.com/video/av38925557)，该教程包含 Node.js 及 Express 框架，P27 之后的为 Koa2 框架。

2. 笔记为个人纪录，章节号与文件夹序号对应。

## MongoDB + mongoose

1. 由于该教程内容，牵扯到对 MongoDB 的数据库操作，所以添加了一部分该内容的学习。

2. 我之前再学习该老师的 express 教程的时候，发现老师在使用 Node.js 操作 MondoDB 数据库是使用的原生的方式，然而 mongoose 能够提供更加健壮的功能，且更容易操作 MongoDB 数据库。

3. 这部分内容，与整个教程的教授老师为同一人，[视频链接](http://www.bilibili.com/video/av41033371)。

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
    ```
