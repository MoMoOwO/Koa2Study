// let 关键字与 var 关键字类似，用于声明变量
// 不同的是 let 声明的变量是在块作用域中生效，var 生命的变量在全局作用域中生效
let a = 123;

console.log(a);

console.log("-----");

/* if (true) {
    let b = 123;
}
console.log(b); // b is not defined */

// const 也是声明块级作用域的变量，
// 但是使用 const 关键字声明的变量是常量，初始化之后不能再做改变
const c = 321;
//c = 123; // 报错

console.log("-----");

// 模板字符串
let name = "张三";
let age = 18;
console.log("姓名：" + name + "，年龄：" + age);
// 使用模板字符串进行字符串拼接
console.log(`姓名：${name}，年龄：${age}`);

console.log("-----");

// 对象、属性的简写
let p = { // 对象简写，直接使用花括号包裹，属性和方法写道花括号中
    name, // 当属性名和属性值变量名相同时，可以使用只写一个变量名方式简写
    age,
    run() { // 方法可以直接声明方法来简写，调用的时候还是使用方法名调用
        console.log(`${this.name}在跑步`);
    }
}
console.log(p.age);
p.run();

console.log("-----");

// 箭头函数，this 指向上下文
setTimeout(function () {
    console.log("1s 过去了。");
}, 1000);
setTimeout(() => {
    console.log("1s 过去了。");
    console.log("-----");
}, 1000);

// promise
// 回调函数获取异步方法里的数据
function getData(callback) {
    // 模拟 ajax 异步请求数据
    setTimeout(() => {
        var pname = "张三";
        callback(pname);
    }, 2000);
}
getData((name) => {
    console.log(name);
    console.log("-----");
});
// 使用 promise 实现上述功能
// resolve 表示成功的回调，reject 表示失败的回调
let pr = new Promise((resolve, reject) => {
    // 模拟 ajax
    setTimeout(() => {
        let pName = "李四";
        if (Math.random() < 0.5) {
            resolve(pName); // 成功的回调
        } else {
            reject("查询失败！"); // 失败的回调
        }

    }, 3000);
});
pr.then((data) => {
    console.log(data);
}, (err) => {
    console.log(err);
});
