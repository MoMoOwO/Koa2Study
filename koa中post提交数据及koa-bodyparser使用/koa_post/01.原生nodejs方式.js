const Koa = require("koa");
const router = require("koa-router")();
const views = require("koa-views");
const common = require("./module/common.js");

const app = new Koa();

app.use(views("views", {
    extension: "ejs"
}));

router.get("/", async (ctx) => {
    await ctx.render("index");
});

router.get("/news", async (ctx) => {
    ctx.body = "新闻页";
});

// 响应 post 清酒平接受 post 请求提交的数据
router.post("/doAdd", async (ctx) => {
    // 获取 post 数据
    // 方式1：原生 nodejs 在 koa 中获取 post 请求数据
    let data = await common.getPostData(ctx);

    console.log(data);
    ctx.body = data;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8888, () => {
    console.log("Starting at post 8888");
});
