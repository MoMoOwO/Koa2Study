const router = require("koa-router")();
const tools = require("../../model/tools");
const db = require("../../model/db");

router.get("/", async (ctx) => {
    //ctx.body = "登录";
    await ctx.render("admin/login");
});

// post 登录
router.post("/doLogin", async (ctx) => {
    //console.log(ctx.request.body);
    // 首先去数据库匹配
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;

    // 1. 验证用户名密码是否合法
    // 2. 去数据库匹配
    // 3. 登陆成功，把用户信息添加到 session
    let result = await db.find("admin", {
        username,
        password: tools.md5(password)
    });
    console.log(result[0]);
    if (result.length > 0) { // 用户存在
        //console.log("登陆成功");
        ctx.session.userinfo = result[0];

        ctx.redirect(ctx.state.__HOST__ + "/admin");
    } else {
        // 失败
        console.log("登陆失败");
    }

});

module.exports = router.routes();
