/*
 * @Author: yt.nie 
 * @Date: 2018-10-11 13:38:08 
 * @Last Modified by: yt.nie
 * @Last Modified time: 2018-10-11 13:58:44
 */
/* 
    一、 prototype和__proto__的概念
        1.prototype是函数的一个属性（ 每个函数都有一个prototype属性）， 这个属性是一个指针， 指向一个对象。 它是显示修改对象的原型的属性。

        2.__proto__是一个对象拥有的内置属性（ 请注意： prototype是函数的内置属性， __proto__是对象的内置属性）， 是JS内部使用寻找原型链的属性。

    二、 new 的过程

    var Person = function () {};
    var p = new Person();

    new的过程拆分成以下三步：
        (1) var p = {}; 也就是说， 初始化一个对象p
        (2) p.__proto__ = Person.prototype;
        (3) Person.call(p);
        也就是说构造p， 也可以称之为初始化p

        关键在于第二步， 我们来证明一下：

        var Person = function () {};
        var p = new Person();
        console.log(p.__proto__ === Person.prototype);//true
*/


var Person = function () {};
Person.prototype.sayName = function () {
    console.log("My Name is Jacky");
};

Person.prototype.age = 27;
var p = new Person();
p.sayName();

/* 
    p是一个引用指向Person的对象。 我们在Person的原型上定义了一个sayName方法和age属性， 当我们执行p.age时， 会先在this的内部查找（ 也就是构造函数内部）， 如果没有找到然后再沿着原型链向上追溯。

    这里的向上追溯是怎么向上的呢？ 这里就要使用__proto__属性来链接到原型（ 也就是Person.prototype） 进行查找。 最终在原型上找到了age属性。
*/