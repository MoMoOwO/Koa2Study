const router = require("koa-router")();

router.get("/", async (ctx) => {
    //ctx.body = "登录";
    await ctx.render("admin/login");
});

module.exports = router.routes();
