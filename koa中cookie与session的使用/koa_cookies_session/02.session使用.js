const Koa = require("koa");
const router = require("koa-router")();
const path = require("path");
const render = require("koa-art-template");
// 引入模块
const session = require("koa-session");

const app = new Koa();

render(app, {
    root: path.join(__dirname, "views"), // 视图根目录
    extname: ".art", // 模板文件后缀名
    debug: process.env.NODE_ENV !== "production" // 是否开启调试模式
});

// 配置 koa-session 中间件
app.keys = ["some secret hurr"]; // cookie 签名
const CONFIG = {
    key: "koa:sess", // cookie key 默认 koa:sess 一般不修改
    maxAge: 1000, // cookie 过期时间，单位 ms，默认为一天，  需要设置
    overwrite: true, // 是否可以重写，默认 true
    httpOnly: true, // cookie 是否只有服务器端可以访问，默认 true
    signed: true, // 签名，默认 true
    rolling: false, // 在每次请求时强行设置 cookie，这将重置 cookie 过期时间，默认 false
    renew: true, // 是否 maxAge 无操作的时候使 cookie 过期  需要设置
};
app.use(session(CONFIG, app)); // 应用配置项

router.get("/", async (ctx) => {
    // 获取 session
    let username = ctx.session.userinfo;
    console.log(username);
    await ctx.render("index", {
        username
    });
});

router.get("/news", async (ctx) => {
    let username = ctx.session.userinfo;
    console.log(username);
    await ctx.render("news", {
        username
    });
});

router.get("/login", async (ctx) => {
    // 设置 session
    ctx.session.userinfo = "张三";
    ctx.body = "登录页";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8888, () => {
    console.log("Starting at post 8888");
});
