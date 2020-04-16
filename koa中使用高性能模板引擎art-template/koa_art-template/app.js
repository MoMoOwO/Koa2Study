const Koa = require("koa");
const router = require("koa-router")();
const path = require("path");
const bodyParser = require("koa-bodyparser");
// 引入模块
const render = require("koa-art-template");

const app = new Koa();

// 配置 koa-art-template 模板引擎
render(app, {
    root: path.join(__dirname, "views"), // 视图根目录
    extname: ".art", // 模板文件后缀名
    debug: process.env.NODE_ENV !== "production" // 是否开启调试模式
});

app.use(bodyParser());

router.get("/", async (ctx) => {
    // 使用
    let list = {
        name: "张三",
        h3: "<h3>这是一个 h3</h3>",
        num: 15,
        arr: [1, 2, 3]
    }
    await ctx.render("index", {
        list
    });
});

router.get("/news", async (ctx) => {
    let list = {
        name: "张三",
        h3: "<h3>这是一个 h3</h3>",
        num: 15,
        arr: [1, 2, 3]
    }
    await ctx.render("news", {
        list
    });
});

router.post("/doAdd", async (ctx) => {
    console.log(ctx.request.body);
    ctx.body = ctx.request.body;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8888, () => {
    console.log("Starting at post 8888");
});
