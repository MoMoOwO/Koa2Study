// 引入模块
const Koa = require("koa");
const router = require("koa-router")();
const path = require("path");
const render = require("koa-art-template");
const static = require("koa-static");
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

app.use(static(path.join(__dirname, "public")));

// 配置路由
router.use("/admin", admin);
router.use("/api", api);
router.use(index);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8888, () => {
    console.log("Start at post 8888");
});
