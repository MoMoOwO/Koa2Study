// 引入相关模块
const Koa = require("koa");
const Router = require("koa-router");

// 实例化一个 app
let app = new Koa();

// 实例化一个路由对象
let router = new Router();
// 配置路由
router.get("/", async (ctx) => { // ctx:context 上下文，包含了 request 和 response 信息
    ctx.body = "首页"; // 返回数据  相当于原生中的 res.writeHead() res.end()
}).get("/news", async (ctx) => {
    ctx.body = "这是新闻页";
});

// 配置启用路由
app.use(router.routes());
app.use(router.allowedMethods());
/* 作用： 这是官方文档的推荐用法，
我们可以看到 router.allowedMethods() 用在了路由匹配router.routes() 之后, 所以在当所有
路由中间件最后调用.此时根据ctx.status 设置response 响应头 */

// 监听端口
app.listen(8888, () => {
    console.log("Starting at post 8888");
});
