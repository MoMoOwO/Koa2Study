const router = require("koa-router")();
// 子路由模块
const login = require("./admin/login");
const user = require("./admin/user");

// 配置中间件获取 URL 地址
router.use(async (ctx, next) => {
    //console.log(ctx.request.header.host);
    // 模板引擎配置全局的变量
    ctx.state.__HOST__ = "http://" + ctx.request.header.host;
    //console.log(ctx.url);
    // 利用 session 保持登录和权限判断
    if (ctx.session.userinfo) {
        await next(); // 登录则继续向下匹配路由
    } else {
        if (ctx.url == "/admin/login" || ctx.url == "/admin/login/doLogin") {
            await next();
        } else {
            ctx.redirect("/admin/login");
        }
    }
});

router.get("/", async (ctx) => {
    await ctx.render("admin/index");
});

router.use("/login", login);
router.use("/user", user);

module.exports = router.routes();
