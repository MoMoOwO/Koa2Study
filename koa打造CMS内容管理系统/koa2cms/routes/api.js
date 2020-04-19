const router = require("koa-router")();

router.get("/", async (ctx) => {
    ctx.body = "api 接口";
});

module.exports = router.routes();
