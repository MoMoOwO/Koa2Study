const Koa = require("koa");

const router = require("koa-router")(); // 引入并实例化 koa-router 路由，推荐此种方式

var app = new Koa();

// 应用级中间件
app.use(async (ctx, next) => { // 没有路由参数，则匹配所有路由
    // 所有的路由请求响应前都会先经过该处
    // 应用案例：后台验证访问是否许可
    // demo：匹配任何路由之前打印日期
    console.log(new Date());
    await next(); // 当前路由匹配完成之后，继续向下匹配路由；如果不写 next() 则路由到此位置终止
});

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

app.use(router.routes());
app.use(router.allowedMethods());

// 监听端口
app.listen(8888, () => {
    console.log("Starting at post 8888");
});
