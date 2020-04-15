const Koa = require("koa");

const router = require("koa-router")(); // 引入并实例化 koa-router 路由，推荐此种方式

var app = new Koa();

router.get("/", async (ctx) => {
    ctx.body = "首页";
});
router.get("/news", async (ctx) => {
    ctx.body = "新闻页";
});

// 获取动态路由传值
// http://localhost:8888/xxx
router.get("/newscontent/:nid", async (ctx) => {
    console.log(ctx.params); // { nid: 'ddd' } 获取动态路由数据
    ctx.body = "新闻详情";
});

// 动态路由里面也可以传入多个值
router.get("/package/:nid/:sid", async (ctx) => {
    console.log(ctx.params); // { nid: 'ddd', sid: 'ccc' } 获取动态路由数据
    ctx.body = "package";
});

app.use(router.routes());
app.use(router.allowedMethods());

// 监听端口
app.listen(8888, () => {
    console.log("Starting at post 8888");
});
