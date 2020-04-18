// ES5 中的类和静态方法
function Person(name, age) {
    // 构造函数里面的方法和属性
    // Person 类的实例属性
    this.name = name;
    this.age = age;
    // Person 类的实例方法
    this.run = function () {
        console.log(`${this.name}---${this.age}---在跑步`);
    }
}
// 原型链上的属性和方法 -- 原型链上面的谁能够和方法可以被多个实例共享
// 通过原型链扩展属性和方法 -- 静态属性
Person.prototype.gender = "男";
Person.prototype.work = function () {
    console.log(`${this.name}---${this.age}---在工作`);
}
// 静态方法
Person.setName = function () {
    console.log("Person 类的静态方法");
}
// 实例化一个 Person 对象
var p = new Person("张三", 18);
p.run();
p.work();

// 调用静态方法
Person.setName();


// ES5 中的集成
/*
    对象冒充集成：没法继承原型链上面的属性和方法
    原型链继承：可以集成构造函数以及原型链上面的属性和方法，但是实例化子类的时候没法给父类传参
    一般通过原型链 + 对象冒充的形式实现继承
*/
function Student(name, age) {
    Person.call(this, name, age); // 对象冒充实现继承 Person，初始化属性
}

// 原型链实现继承
Student.prototype = new Person();

let s = new Student("李四", 19);
s.run();
