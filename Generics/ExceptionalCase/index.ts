// union分布式条件
type Union = "a" | "b" | "c";

type UppercaseA<T extends string> = T extends "a" ? Uppercase<T> : T;

// "b" | "c" | "A"
type Result1 = UppercaseA<Union>;

type UppercaseAB<T extends string> = T extends "a" | "b" ? Uppercase<T> : T;

// "c" | "A" | "B"
type Result2 = UppercaseAB<Union>;

// 阻止分布式条件触发
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;

// never的特殊情况
type TestNever<T> = T extends number ? true : false;

// never
type TestNeverRes = TestNever<never>;

type IsNever<T> = [T] extends [never] ? true : false;

// true
type IsNeverRes = IsNever<never>;

// any的特殊情况，返回两者的合并
type TestAny<T> = T extends number ? 1 : 2;

// 1 | 2
type TestAnyRes = TestAny<any>;

// as const
const object1 = { a: "a", b: 1 };

// { a: string, b: number }
type Result11 = typeof object1;

const object2 = { a: "a", b: 1 } as const;

// { readonly a: "a", readonly b: 1 }
type Result12 = typeof object2;

// 想查看keyof object的对应的具体的union key
type Object1 = { name: string; age: number };

// Object1
type TUnion1 = keyof Object1;

type Expand<T> = T extends infer O ? O : never;
// "name" | "age"
type TUnion2 = Expand<keyof Object1>;

// 想查看union类型联合后的新的union类型
type Union1 = "name" | "age";

// Union1 | "flag";
type Union2 = Union1 | "flag";
type TUnion3 = Expand<Union1 | "flag">;

// 递归展开具体的值
type ExpandRecursive<T> = T extends Record<string, any>
  ? T extends infer O
    ? {
        [K in keyof O]: ExpandRecursive<O[K]>;
      }
    : never
  : T;

type Recursive = { name: string };
type Example1 = { name: string; recursive: Recursive };

// { name: string; recursive: Recursive; }
type Result3 = Example1;

// { name: string; recursive: { name: string; }; }
type Result4 = ExpandRecursive<Example1>;
