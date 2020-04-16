const Koa = require("koa");
const router = require("koa-router")();
const views = require("koa-views");
// 引入模块
const bodyParser = require("koa-bodyparser");

const app = new Koa();

app.use(views("views", {
    extension: "ejs"
}));

// 配置中间件
app.use(bodyParser());

router.get("/", async (ctx) => {
    await ctx.render("index");
});

router.get("/news", async (ctx) => {
    ctx.body = "新闻页";
});

// 响应 post 请求并接受 post 请求提交的数据
router.post("/doAdd", async (ctx) => {
    // 获取 post 数据
    // 方式2：借助 koa-bodyparser 中间件在 koa 中获取 post 请求数据
    console.log(ctx.request.body);
    ctx.body = ctx.request.body;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8888, () => {
    console.log("Starting at post 8888");
});
