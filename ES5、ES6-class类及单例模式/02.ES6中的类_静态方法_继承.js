// ES6 中类
class Person {
    constructor(name, age) { // 类的构造函数，实例化（new）的时候执行，初始化属性
        this._name = name;
        this._age = age;
    } // es6 方法之间没有 ,
    getName() {
        console.log(this._name);
    }
    setName(name) {
        this._name = name;
    }
}

let p = new Person("张三", 20);
p.getName();
p.setName("李四");
p.getName();
console.log("-----");


// ES6 中的继承通过 extends 关键字实现
class Animal {
    constructor(cate, home) {
        this.cate = cate;
        this.home = home;
    }
    getInfo() {
        console.log(`种类：${this.cate}，生活地点：${this.home}`);
    }
    run() {
        console.log("跑");
    }
}
class Dog extends Animal {
    constructor(cate, home, name) {
        super(cate, home); // 调用父类的构造函数初始化继承的属性
        this.name = name; // 初始化独有的属性
    }
    bark() {
        console.log("汪汪！");
    }
}

let d = new Dog("犬科", "富人家", "小黑");
console.log(d.cate);
d.run();
d.bark();
console.log("-----");


// ES6 中的静态方法
class Worker {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    run() {
        console.log("跑");
    }
    // 使用 static 方法来声明静态方法
    static work() {
        console.log("在工作---这是一个静态方法");
    }
}
Worker.instance = "这是一个静态属性";
let w = new Worker("王五", 25);
w.run();
Worker.work();
console.log(Worker.instance);
