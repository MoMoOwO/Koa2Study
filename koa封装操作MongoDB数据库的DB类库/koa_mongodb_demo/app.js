const Koa = require("koa");
const router = require("koa-router")();
const path = require("path");
const bodyParser = require("koa-bodyparser");
const render = require("koa-art-template");
const DB = require("./module/db.js");

const app = new Koa();

// 配置 koa-art-template 模板引擎
render(app, {
    root: path.join(__dirname, "views"), // 视图根目录
    extname: ".art", // 模板文件后缀名
    debug: process.env.NODE_ENV !== "production" // 是否开启调试模式
});

app.use(bodyParser());

// 首页 用户列表页
router.get("/", async (ctx) => {
    //console.time("start");
    let result = await DB.find("users", {});
    //console.log(result);
    //console.timeEnd("start");
    // 使用
    await ctx.render("index", {
        list: result
    });
});

router.get("/news", async (ctx) => {
    //console.time("start1");
    let result = await DB.find("users", {});
    //console.log(result);
    //console.timeEnd("start1");
    ctx.body = "新闻页";
});

// 添加用户页
router.get("/add", async (ctx) => {
    await ctx.render("add");
});

router.post("/doAdd", async (ctx) => {
    //console.log(ctx.request.body);
    // 增加信息
    let data = await DB.insert("users", ctx.request.body);
    //console.log(data.result);
    try {
        if (data.result.ok) {
            ctx.redirect("/");
        }
    } catch {
        ctx.redirect("/add");
    }
});

router.get("/edit", async (ctx) => {
    // 获取用户信息（get 传值和数据库查询），传递渲染
    let id = ctx.query.id;
    let data = await DB.find("users", {
        _id: DB.getObjectID(id)
    });
    ctx.render("edit", {
        people: data[0]
    });
});

router.post("/doEdit", async (ctx) => {
    // 获取用户信息（get 传值和数据库查询），传递渲染
    let id = ctx.request.body.id;
    let name = ctx.request.body.name;
    let age = ctx.request.body.age;
    let gender = ctx.request.body.gender;
    let data = await DB.update("users", {
        _id: DB.getObjectID(id)
    }, {
        name,
        age,
        gender
    });
    try {
        if (data.result.ok) {
            ctx.redirect("/");
        }
    } catch {
        ctx.redirect("/edit");
    }
});

router.get("/delete", async (ctx) => {
    let id = ctx.query.id;
    let data = await DB.remove("users", {
        _id: DB.getObjectID(id)
    });
    if (data) {
        ctx.redirect("/");
    }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8888, () => {
    console.log("Starting at post 8888");
});
