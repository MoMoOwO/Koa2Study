// 引入模块
const Koa = require("koa");
const router = require("koa-router")();
const path = require("path");
const render = require("koa-art-template");
const static = require("koa-static");
const session = require("koa-session");
const bodyParser = require("koa-bodyparser");
//  路由模块
const index = require("./routes/index");
const admin = require("./routes/admin");
const api = require("./routes/api");

// 实例化一个 app
const app = new Koa();

// 配置模板引擎
render(app, {
    root: path.join(__dirname, "views"),
    extname: ".html",
    debug: process.env.NODE_ENV !== "production"
});

// 配置静态资源目录
app.use(static(path.join(__dirname, "public")));

// 配置 session 中间件
app.keys = ['some-secret-hurr'];
const CONFIG = {
    key: "koa:sess",
    maxAge: 864000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: true, // 每次请求都重新设置 session
    renew: false
};
app.use(session(CONFIG, app));

// 配置 post 提交数据中间件
app.use(bodyParser());

// 配置路由
router.use("/admin", admin);
router.use("/api", api);
router.use(index);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8888, () => {
    console.log("Start at post 8888");
});
