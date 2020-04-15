const Koa = require("koa");

const router = require("koa-router")(); // 引入并实例化 koa-router 路由，推荐此种方式

var app = new Koa();

// 应用级中间件
app.use(async (ctx, next) => {
    console.log("1.这是第一个中间件01");
    await next();
    console.log("5.匹配路由完成之后，又会回来执行中间件");
});

app.use(async (ctx, next) => {
    console.log("2.这是第二个中间件02");
    await next();
    console.log("4.匹配路由完成之后，又会回来执行中间件");
});

// 路由级中间件
router.get("/", async (ctx) => {
    ctx.body = "Hello koa";
});
router.get("/news", async (ctx) => {
    console.log("3.匹配到了 news 这个路由");
    ctx.body = "新闻页";
});




app.use(router.routes());
app.use(router.allowedMethods());

// 监听端口
app.listen(8888, () => {
    console.log("Starting at post 8888");
});
