const Koa = require("koa");
const router = require("koa-router")();

// 引入路由模块
const admin = require("./routes/admin");
const api = require("./routes/api");

const app = new Koa();

// 配置路由
router.get("/", async (ctx) => {
    ctx.body = "首页";
});

// 配置子路由 层级路由
router.use("/admin", admin.routes());
router.use("/api", api);

// 启动路由
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8888, () => {
    console.log("Start at post 8888");
});
