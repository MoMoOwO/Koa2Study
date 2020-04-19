const router = require("koa-router")();

router.get("/", async (ctx) => {
    ctx.body = "后台管理";
});

module.exports = router.routes();
