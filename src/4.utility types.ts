//typemapping
interface Product1 {
    name: string;
    value: number;
}
type ReadOnly<T> = {
    readonly [K in keyof T]: T[K]
};
type Optional<T> = {
    [K in keyof T]?: T[K]
};
type Nullable<T> = {
    [K in keyof T]: T[K] | null
};
let prod1: ReadOnly<Product1> = {
    name: 'hello',
    value: 1
};

// utility types
// 1.Awaited<Type> -This type is meant to model operations like await in async functions, or the .then() method on Promises - specifically, the way that they recursively unwrap Promises
type A = Awaited<Promise<string>>;

// 2.Partial<Type> -Constructs a type with all properties of Type set to optional. This utility will return a type that represents all subsets of a given type.
interface Todo {
    title: string;
    description: string;
}
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return { ...todo, ...fieldsToUpdate };
}
const todo1 = {
    title: "organize desk",
    description: "clear clutter",
};
const todo2 = updateTodo(todo1, {
    description: "throw out trash",
});

// 3.Required<Type> Constructs a type consisting of all properties of Type set to required. The opposite of Partial.
// const obj2: Required<Todo> = { title: '5' }; gives error needs description correct is
const obj2: Required<Todo> = { title: "h", description: "y" };

// 4.Readonly<Type> onstructs a type with all properties of Type set to readonly, meaning the properties of the constructed type cannot be reassigned.
const todo: Readonly<Todo> = {
    title: "Delete inactive users",
    description: 'hello'
};
//-todo.title = "Hello";  cant do that read only!

// 5.Record<Keys, Type> Constructs an object type whose property keys are Keys and whose property values are Type. This utility can be used to map the properties of a type to another type
interface CatInfo {
    age: number;
    breed: string;
}
type CatName = "boris";
const cats: Record<CatName, CatInfo> = {
    boris: { age: 5, breed: "Maine Coon" },
};
// console.log(cats.boris); { age: 5, breed: 'Maine Coon' }

// 6.Pick<Type, Keys> Constructs a type by picking the set of properties Keys (string literal or union of string literals) from Type.
type PickCat = Pick<CatInfo, 'age'>;

// 7.Omit<Type, Keys> Constructs a type by picking all properties from Type and then removing Keys (string literal or union of string literals). The opposite of Pick.
type OmitCat = Omit<CatInfo, 'age'>;

// 8.Exclude<UnionType, ExcludedMembers> Constructs a type by excluding from UnionType all union members that are assignable to ExcludedMembers.
type T0 = Exclude<"a" | "b" | "c", "a">;   //type T0 = "b" | "c"

// 9.Extract<Type, Union> Constructs a type by extracting from Type all union members that are assignable to Union.
type T1 = Extract<string | number | (() => void), Function | boolean>;   // type T1 = () => void

// 10.NonNullable<Type> Constructs a type by excluding null and undefined from Type
type T13 = NonNullable<string[] | null | undefined>;  // type T13 = string[]

// 11.Parameters<Type> Constructs a tuple type from the types used in the parameters of a function type Type
// declare function f1(arg: { a: number; b: string }): void;
// type T01 = Parameters<() => string>;    type T01 = []
// type T11 = Parameters<(s: string) => void>; type T11 = [s: string]
// type T21 = Parameters<<T>(arg: T) => T>;    type T21 = [arg: unknown]
// type T3 = Parameters<typeof f1>;    type T3 = [arg: {a: number;b: string;}]
// type T4 = Parameters<any>;    type T4 = unknown[], for never is never

//12. ConstructorParameters<Type>Constructs a tuple or array type from the types of a constructor function type. It produces a tuple type with all the parameter types (or the type never if Type is not a function)
// type T0 = ConstructorParameters<ErrorConstructor>;  type T0 = [message?: string]
// type T1 = ConstructorParameters<FunctionConstructor>;   type T1 = string[]
// type T2 = ConstructorParameters<RegExpConstructor>; type T2 = [pattern: string | RegExp, flags?: string]
// class C {
//   constructor(a: number, b: string) {}
// }
// type T3 = ConstructorParameters<typeof C>;  type T3 = [a: number, b: string]
// type T4 = ConstructorParameters<any>;   type T4 = unknown[]

//13. ReturnType<Type> Constructs a type consisting of the return type of function Type.
type T3 = ReturnType<<T extends U, U extends number[]>() => T>; // number[] return type

// 14.InstanceType<Type>Constructs a type consisting of the instance type of a constructor function in Type.
class C {
    x = 0;
    y = 0;
}
type T011 = InstanceType<typeof C>; //   type T011 = C
type T111 = InstanceType<any>;    //   type T111 = any same for never. cant be primitive or function

// 15.ThisParameterType<Type>Extracts the type of the this parameter for a function type, or unknown if the function type has no this parameter
function toHex(this: Number) {
    return this.toString(16);
}
function numberToString(n: ThisParameterType<typeof toHex>) {
    return toHex.apply(n);
}
// console.log(numberToString(n))= "n" where n is number we cant give null or string or boolean ... it will give error

// 16.OmitThisParameter<Type>Removes the this parameter from Type. If Type has no explicitly declared this parameter, the result is simply Type. Otherwise, a new function type with no this parameter is created from Type. Generics are erased and only the last overload signature is propagated into the new function type.
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
// console.log(fiveToHex());

// 17.ThisType<Type>This utility does not return a transformed type. Instead, it serves as a marker for a contextual this type. Note that the noImplicitThis flag must be enabled to use this utility.
type ObjectDescriptor<D, M> = {
    data?: D;
    methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};
function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
    let data: object = desc.data || {};
    let methods: object = desc.methods || {};
    return { ...data, ...methods } as D & M;
}
let obj = makeObject({
    data: { x: 0, y: 0 },
    methods: {
        moveBy(dx: number, dy: number) {
            this.x += dx; // Strongly typed this
            this.y += dy; // Strongly typed this
        },
    },
});
obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);

// template literals type
// type Name = `Mr. ` + string;
// let name: Name = `Mr. Smith`;  // ok
// let name: Name = `Mrs. Smith`;  // error

// Intrinsic String Manipulation Types
// 1.Uppercase<StringType>Converts each character in the string to the uppercase version.
type ASCIICacheKey<Str extends string> = `ID-${Uppercase<Str>}`;
type MainID = ASCIICacheKey<"my_app">;   //type MainID = "ID-MY_APP"
// 2.Lowercase<StringType> similar funtionality
// 3.Capitalize<StringType>
// 4.Uncapitalize<StringType>

//conditional types
type Extends<T, U> = T extends U ? T : U;
type A1 = Extends<string, any>; // type A1 is 'string'
type B = Extends<any, string>; // type B is 'string'

// recursive types
type LinkedList<T> = { value: T, next: LinkedList<T> | null; };
let list: LinkedList<number> = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: null
        }
    },
};
