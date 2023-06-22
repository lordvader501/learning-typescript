// OOP
class Student {
    // readonly id: number;
    // name: string;
    // course: string;
    // private _balance: number;

    constructor(public readonly id: number,
        public name: string,
        public course: string,
        private _balance: number) {
        // by setting these here we dont need to do above and below commented lines
        // this.id = id;
        // this.name = name;
        // this.course = course;
        // this._balance = balance;
    }
    get balance(): number {
        return this._balance;
    }
    set balance(amount: number) {
        if (amount <= 0) throw new Error("invalid amount");
        this._balance = amount;
    }
    get coursename(): string {
        return this.course;
    }
    set changecousrse(course: string) {
        if (course.length === 0) throw new Error("course cant be empty!");
        this.course = course;
    }
}

// let stud = new Student(1, 'hello', 'cse');
// if (stud instanceof Student) stud.changecousrse('it');
// stud.balance = 100;
// console.log(stud.course, stud.id, stud.name, stud.balance);

// index signatures
class Employee {
    [name: string]: string; //index signature property
}
let emp_worker = new Employee();
emp_worker.emp1 = 'hello';
emp_worker.emp2 = "world";
emp_worker["emp3"] = "hello world";

// static members
class Basket {
    private static _balls: number = 0;

    add() { Basket._balls++; } // static method cant use this!!!
    remove() { Basket._balls--; }

    static get totalballs() {
        return Basket._balls;
    }
}
// let basket1 = new Basket();      //
// let basket2 = new Basket();
// basket1.add();
// basket2.add();
// console.log(Basket.totalballs); // got 2 because of static

//inheritance 
class Person1 {
    constructor(public fname: string, public lname: string) { }
    get fullname() {
        return this.fname + ' ' + this.lname;
    }
}
class Student1 extends Person1 {
    constructor(public id: number, fname: string, lname: string) {
        super(fname, lname);
    }
    study() {
        console.log("studying...");
    }
}

// method overriding
class Teacher1 extends Person1 {
    override get fullname() {
        return 'Professor. ' + super.fullname;
    }
}

// pollymorphism
function printFullname(people: Person1[]) {
    for (let person of people) console.log(person.fullname);
}
printFullname([
    new Student1(1, 'hello', 'world'),
    new Teacher1('world', 'hello')
]);

//difference private- cant be used outside of class and protected- onlu used in current or inherited class

//abstract class- we cant create instances of it
abstract class Shape {
    constructor(public color: string) { }
    abstract changecol(color: string): void;
}
class Circle extends Shape {
    constructor(public radius: number, color: string) {
        super(color);
    }
    override changecol(color: string): void {
        this.color = color;
    }
}

// interface
//instead of above abstract class we could use interface
interface Shape1 {
    color: string;
    changecol(): void;
}
class Square implements Shape1 {
    constructor(public color: string) {
        this.color = color;
    }
    changecol(): void {
        throw new Error("Method not implemented.");
    }

}