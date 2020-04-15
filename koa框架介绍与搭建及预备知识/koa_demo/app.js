// 1. 引入模块
var koa = require("koa");

// 2. 实例化一个 app
var app = new koa();

// 3. 配置路由
// 配置中间件，暂时当作路由

// express 写法
/* app.use((req, res) =>{
    res.send("返回的数据");
}); */

app.use(async (ctx) => {
    ctx.body = "你好，koa 2.x";
});

// 4. 监听端口
app.listen(8888);
