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

### mongoose 安装已经使用

1. 安装：`npm i mongoose --save`

2. 引入 mongoose 并连接数据库

3. 定义 Schema：数据库中的 Schema，为数据库对象的集合。schema 是 mongoose 里会用到的一种数据模式，可以理解为表结构的定义；每个 schema 会映射到 mongodb 中的一个 collection，他不具备操作数据库的能力。

4. 创建数据库模型

    (1) 定义好了 Schema，接下来就是生成 Model。Model 是由 schema 生成的模型，可以对数据库进行操作。

    (2) 注意：

    - `mongoose.model()` 里面可以传入两个参数，也可以传入三个参数，`mongoose.model(参数 1：模型名称（首字母大写）, 参数 2：Schema)` 或 `mongoose.model(参数 1：模型名称（首字母大写）, 参数 2: Schema, 参数 3：数据库集合名称)`
    - 如果传入 2 个参数的话：这个模型会和模型名称相同的复数的数据库建立连接；如通过 `var User = mongoose.model("User", UserSchema)` 方法创建模型，那么这个模型将会操作 Users 这个集合。
    - 如果传入 3 个参数的话：模型默认操作第三个参数定义的集合名称。

5. 查找数据
