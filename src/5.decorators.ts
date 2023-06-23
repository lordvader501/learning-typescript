// class decorators
function Component(constructor: Function) {
    console.log("hello world");
    constructor.prototype.uId = Date.now();
    constructor.prototype.insertDom = () => {
        console.log("inserted in dom");
    };
}
// @Component
class DecoratorClass { }

//parameteriszed decorator
type Component1Param = {
    param: string;
};
//decorator factory
function Component1(option: Component1Param) {
    return (constructor: Function) => {
        console.log("hello world");
        constructor.prototype.option = option;
        constructor.prototype.uId = Date.now();
        constructor.prototype.insertDom = () => {
            console.log("inserted in dom");
        };
    };
}
// decorator compositiion
function Component2(constructor: Function) {
    console.log("hello world 2");
    constructor.prototype.uId = 1;
}
// @Component1({ param: "helllo" }) //called 2nd
// @Component2 //called 1st
class DecoratorClass1 { }

// method decorator
function Enumerable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalF = <Function>descriptor.value;
    descriptor.value = function (...args: any) {
        console.log("before");
        originalF.call(this, ...args);
        console.log('after');
    };
};
class Greeter {
    @Enumerable
    greet(...message: string[]) {
        console.log("Hello, " + message);
    }
}
// const greeting = new Greeter();
// greeting.greet("world", "world2");

// accessor decorator
function ConUpper(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.get;
    descriptor.get = function () {
        const res = original?.call(this);
        return (typeof res === "string") ? res.toUpperCase() : res;
    };
}
class Person3 {
    constructor(public fname: string, public lname: string) { }
    @ConUpper
    get fullname() {
        return this.fname + ' ' + this.lname;
    }
}
// const per1 = new Person3("hello", "world");
// console.log(per1.fullname);

// property decorator
function Minlen(length: number) {
    return (target: any, propertyName: string) => {
        let value: string;
        const descriptor: PropertyDescriptor = {
            set(newval: string) {
                if (newval.length < length)
                    throw new Error(`${propertyName} should be at least ${length} long.`);
                value = newval;
            },
            get() {
                return value;
            },
        };
        Object.defineProperty(target, propertyName, descriptor);
    };
}
class User {
    @Minlen(8)
    password: string;
    constructor(password: string) {
        this.password = password;
    }
}
// const nuser = new User("sfas");
// console.log(nuser.password);

//parameter decorator
type Watchedparam = {
    propertyKey: string,
    parameterIndex: number;
};
const Watchedparams: Watchedparam[] = [];
function Watch(target: Vehicle, propertyKey: string, parameterIndex: number): void {
    Watchedparams.push({
        propertyKey,
        parameterIndex
    });
}
class Vehicle {
    move(@Watch speed: number) { }
}
// console.log(Watchedparams)

