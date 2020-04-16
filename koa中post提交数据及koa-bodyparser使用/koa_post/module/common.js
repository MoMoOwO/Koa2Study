// 获取 post 请求的方法
exports.getPostData = function (ctx) {
    // 这是一个异步
    return new Promise((resolve, reject) => {
        try {
            // 通过管道获取数据
            let str = "";
            ctx.req.on("data", (chunk) => {
                str += chunk;
            });
            ctx.req.on("end", (chunk) => {
                resolve(str);
            });
        } catch (err) {
            reject(err);
        }
    });
}
