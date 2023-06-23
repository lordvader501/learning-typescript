// generic class
class Mapper<T, U> {
    constructor(public key: T, public value: U) { }
}
let newmap = new Mapper<number, string>(1, 'hello');        // not nessary to tell number and string ompiler can automaticall detect

// generic function and methods
function fun1<T>(val: T) {
    return val;
}
class Nclass {
    static method1<T>(val: T) {
        return val;
    }
}
// generic interfaces
interface Response1<T> {
    data: T | null;
    error: string | null;
}
// function fetch<T>(url: string): Response1<T> {
//     return { data: null, error: null };
// }
interface User {
    username: string;
}
interface Product {
    name: string;
}
// let result = fetch<User>('url');
// result.data?.username we can access it because of Response<User> in line 21

// generic constraints 
interface GenI {
    name: string;
}
class ClassC {//we cal also extends or implemets
    constructor(public name: string) { }
}
function print<T extends number | string | { name: string; } | GenI | ClassC>(val: T): T {
    return val;
}
// print(1 or "hello"or {name:'a'}or new ClassC("helo"))

//extending generic classes
interface Product {
    name: string;
    price: number;
}
class Store<T> {
    protected _objects: T[] = [];
    add(obj: T): void {
        this._objects.push(obj);
    }
    // if T is product then keyof T is 'name | price'
    find(property: keyof T, value: unknown): T | undefined {
        return this._objects.find(obj => obj[property] === value);
    }
}
// let store = new Store<Product>();
// store.find("name", 1);

// passing to child
class newStore<T> extends Store<T>{
    newst() { }
}
// let ns = new newStore<Product>();
// ns.add ,ns.newst

//restricting the generic type parameter
class searchStore<T extends { name: string; }> extends Store<T>{
    search(name: string): T | undefined {
        return this._objects.find(obj => obj.name === name);// gets error on obj.name that it doesnt exist on type T so we need to extend {name:string}
    }
}
//fixing the generic type parameter
// class ProdStore extends Store<Product> {
//     filterStore(name: string): Product[] {
//         return [];
//     }
// }

