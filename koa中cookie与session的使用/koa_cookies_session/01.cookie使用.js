const Koa = require("koa");
const router = require("koa-router")();
const path = require("path");
const render = require("koa-art-template");

const app = new Koa();

// 配置 koa-art-template 模板引擎
render(app, {
    root: path.join(__dirname, "views"), // 视图根目录
    extname: ".art", // 模板文件后缀名
    debug: process.env.NODE_ENV !== "production" // 是否开启调试模式
});

router.get("/", async (ctx) => {
    // 设置 cookie
    // 一般使用
    /* ctx.cookies.set("userinfo", "Sam", {
        maxAge: 60 * 1000 * 60 // 过期时间
    }); */

    // 其他参数
    ctx.cookies.set("userinfo", "Sam", {
        //path: "/news", // 只在 /news 路由下可访问
        //domain: ".baidu.com", // 正常情况下不要设置，默认就是但钱域下的素有页面都可访问
        /*
            baike.baidu.com
            pan.baidu.com
        */
        httpOnly: false, // true：这个 cookie 只在服务器端可以访问，false：服务器端 web 端都可访问
    });

    await ctx.render("index");
});

router.get("/news", async (ctx) => {
    // 获取 cookie
    let userinfo = ctx.cookies.get("userinfo");
    console.log(userinfo);
    ctx.body = "新闻页--" + userinfo;
});

router.get("/shop", async (ctx) => {
    // 获取 cookie
    let userinfo = ctx.cookies.get("userinfo");
    console.log(userinfo);
    ctx.body = "商品页--" + userinfo;
});

router.get("/user", async (ctx) => {
    // koa 中无法直接设置中文 cookie
    let name = Buffer.from("张三").toString("base64"); // 转换为 base64 字符
    ctx.cookies.set("username", name, {
        maxAge: 60 * 1000 * 60 // 过期时间
    });
    let n = Buffer.from(String(ctx.cookies.get("username")), "base64"); // 还原 base64 字符
    console.log(n);
    ctx.body = "用户页--" + n;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8888, () => {
    console.log("Starting at post 8888");
});
