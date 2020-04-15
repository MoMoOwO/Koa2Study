const Koa = require("koa");
const router = require("koa-router")();
const views = require("koa-views");

var app = new Koa();

// 配置模板引擎中间件 -- 第三方中间件
// app.use(views("views", {map: {html: "ejs"}}));  // 这样配置也可以
app.use(views("views", {
    extension: "ejs" // 使用 ejs 模板引擎
}));

/*
    当我们需要在每一个路由的 render 里面都要渲染一个公共的数据
    公共的数据放在 state 里面，这样的话在模板任何地方都可以使用
    需要在应用级中间件中配置
*/
app.use(async (ctx, next) => {
    ctx.state = {
        session: "这是一个 session",
        appName: "app"
    };
    await next();
});

router.get("/", async (ctx) => {
    let title = "你好，EJS";
    // 渲染模板引擎，并传递数据
    await ctx.render("index", {
        title
    });
});
router.get("/news", async (ctx) => {
    let list = ["111", "222", "333"];
    let h2 = "<h2>这是一个h2</h2>";
    let num = 33;
    await ctx.render("news", {
        list,
        h2,
        num
    });
});

app.use(router.routes());
app.use(router.allowedMethods());

// 监听端口
app.listen(8888, () => {
    console.log("Starting at post 8888");
});
