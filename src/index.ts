// basic built in types
let num: number = 10;
let str: string = "hello";
let bool: boolean = true;
let nul: null = null;
let nudef: undefined = undefined;
function abc(): void {
    return;
}


//array
let arr: number[] = [1, 2, 3]; // it cam be booean[] string[] null[]...
// arr[0] = 5;
// arr[0] = "str"; will not work

//tuple
let tup: [number, string, ...any] = [1, "abc", null, 13, "hello", true];
//generally 2 elements

//enum `follows Pascal naming convention`
//enum Fruit { Apple = 'a', Mango = 'm', Banana = 'b' }; generates long js code so use const in front of it
const enum Fruit { Apple = 'a', Mango = 'm', Banana = 'b' };
let fruit: Fruit = Fruit.Apple
// default Apple = 0 but we can change by assigning it a number and then ts will autoincrement the next value, we can also assign string but we have to assign for all.

//functions
function concat(num: number, str: string): string {
    return num + str;
}
// console.log(concat(1, "hello"));

//objects
type Person = {
    readonly id: number,        //readonly doent allow modify 
    name: string,
    number?: number,        // num is optional because of "?"
    time: (time: Date) => void
}
let p1: Person = { id: 1, name: "hello", time: (t: Date) => console.log(t) };
// Person.id = 3; it will not work as it is readonly.

// union and intersection types
//union example
let x: number | string = "hello";
function xyz(num: number | string): number {
    if (typeof num === 'number') {
        return num;
    }
    return parseInt(num);
}

//intersection example
type Man = {
    talk: () => void,
}
type Woman = {
    walk: () => void,
}
type People = Man & Woman;
let person: People = {
    talk: () => { },
    walk: () => { },
}

// literal types
type Quantity = 10 | 100;
type Size = 'small' | 'medium' | 'large';
let value: Quantity = 10; // it cant be any thing other than 10 or 100 .we can directy use value: 10 | 100 instead of Quantity 

// nullable type
function tolow(str: string | null | undefined): string {
    if (str) return str.toLowerCase();
    else return "null or undefined";
}
// tolow(null);

// optional chaining
type Customer = {
    name: string,
}
function getUser(id: number): Customer | null | undefined {
    return id == 0 ? null : { name: "hello" };
}
let user = getUser(0);
// console.log(user?.name)
//optional element access operator array?.[0]
//optional call     let log:any = null;     log?.(a)


// nullish coalescing operator
let natural_num: number | null = null;
let getnum = {
    natural_num: natural_num ?? 10 // same as natural_num !== null ? natural_num : 10
}

// type assertions
// let id = <HTMLInputElement>document.getElementById('id');
//or  let id = document.getElementById('id') as HTMLInputElement;

// unknown type
function render(document: unknown): void {
    if (typeof document === "string") return;// type of only work for primitives for non primitives use belowone
    // if (document instanceof HTMLElement) return;
}

//never type
function dosomething(): never {
    while (true) {
        //infinite loop
    }
}
// dosomething();
// console.log("hello") //not reachabe hence use never type to tell if its unreachable

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
        if (amount <= 0) throw new Error("invalid amount")
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
