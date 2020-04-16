const Koa = require("koa");
const router = require("koa-router")();
const views = require("koa-views");
const bodyParser = require("koa-bodyparser");
const path = require("path");
// 引入模块
const static = require("koa-static");

const app = new Koa();

app.use(views("views", {
    extension: "ejs"
}));

// 配置中间件
app.use(bodyParser());
// 当使用 static 中的静态资源的时候，首先在 static 目录下查找，查找无果则继续往下面目录查找
//app.use(static("./static"));
app.use(static(path.join(__dirname, "static")));
// 同样可以配置多个静态路径，会挨个查找静态资源

router.get("/", async (ctx) => {
    await ctx.render("index");
});

router.get("/news", async (ctx) => {
    ctx.body = "新闻页";
});

router.post("/doAdd", async (ctx) => {
    console.log(ctx.request.body);
    ctx.body = ctx.request.body;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8888, () => {
    console.log("Starting at post 8888");
});
