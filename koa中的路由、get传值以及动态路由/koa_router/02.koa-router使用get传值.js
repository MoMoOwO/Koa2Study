const Koa = require("koa");

const router = require("koa-router")(); // 引入并实例化 koa-router 路由，推荐此种方式

var app = new Koa();

router.get("/", async (ctx) => {
    ctx.body = "首页";
});
router.get("/news", async (ctx) => {
    ctx.body = "新闻页";
});

// 获取 get 传值
// http://localhost:8888/newscontent?nid=123
router.get("/newscontent", async (ctx) => {
    // 从 ctx 中 获取 get 传值
    /*
    在koa2 中 GET 传值通过 request 接收，但是接收的方法有两种： query 和 querystring。
    query：返回的是格式化好的参数对象。
    querystring：返回的是请求字符串。
    */
    console.log(ctx.query); // { nid: '123' }
    console.log(ctx.querystring); // nid=123 获取的是一个字符串

    // ctx 里面的 request 里面获取 get 传值
    console.log(ctx.request.url); // /newscontent?nid=123
    console.log(ctx.request.query); // { id: '1223' }
    console.log(ctx.request.querystring); // nid=123

    ctx.body = "新闻详情";
});

app.use(router.routes());
app.use(router.allowedMethods());

// 监听端口
app.listen(8888, () => {
    console.log("Starting at post 8888");
});
