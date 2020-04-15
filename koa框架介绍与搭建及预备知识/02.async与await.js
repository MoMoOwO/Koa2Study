// async 是让方法变成异步
// 普通方法
function getData() {
    return "这是普通方法返回数据";
}
console.log(getData());

async function getData1() {
    return "这是 async 修饰的方法返回的数据";
}
console.log(getData1());

// 如何获取其中的数据
// 方法1，使用 promise 原生方式
var p = getData1();
p.then((data) => { // 由于返回的是一个 promise 对象，所以可以使用 .then 来向下处理。
    console.log(data);
});
// 方式2，使用 await
async function getData2() {
    return "async 修饰的异步方法返回的数据";
}
async function test() {
    let data = await getData2();
    console.log(data);
}
test();


// await 阻塞功能，可以把异步改成一个同步
async function getData3() {
    console.log(2);
    return "阻塞了？";
}
async function test1() {
    console.log(1);
    let dd = await getData3(); // 阻塞，等待异步执行完之后，执行下面的代码，即异步按同步执行
    console.log(dd);
    console.log(3);
}
test1();


// 配合使用 async/await 获取 异步方法中的数据
function getData4() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let userName = "王五";
            resolve(userName);
        });
    });
}
async function test2() {
    var ndata = await getData4();
    console.log(ndata);
}
test2();



//
