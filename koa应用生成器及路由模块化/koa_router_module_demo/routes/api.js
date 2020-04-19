const router = require("koa-router")();

router.get("/", async (ctx) => {
    ctx.body = "api首页";
});

router.get("/newslist", async (ctx) => {
    ctx.body = {
        title: "这是新闻接口"
    };
});

router.get("/goodslist", async (ctx) => {
    ctx.body = {
        name: "这是商品接口"
    };
});

// 子模块里面暴漏路由并启动路由
module.exports = router.routes();
