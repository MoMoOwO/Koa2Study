const router = require("koa-router")();

router.get("/", async (ctx) => {
    ctx.body = "后台管理首页";
});

router.get("/user", async (ctx) => {
    ctx.body = "后台管理-用户管理";
});

router.get("/goods", async (ctx) => {
    ctx.body = "后台管理-商品管理";
});

router.get("/news", async (ctx) => {
    ctx.body = "后台管理-新闻管理";
});

//  暴漏路由模块
module.exports = router;
