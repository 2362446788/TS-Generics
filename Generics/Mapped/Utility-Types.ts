type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
  ? 1
  : 2
  ? true
  : false;

// 将interface或者Mapped Type的所有属性都转换为可选属性
namespace Partial {
  type Partial1<T extends Record<PropertyKey, any>> = {
    [K in keyof T]?: T[K];
  };
  type TOne = {
    name: string;
    age: number;
  };
  type one = Partial<TOne>;
  type two = Partial1<TOne>;
  type equal = IsEqual<one, two>;
}

// 将interface或者Mapped Type的所有属性都转换为必选属性
namespace Required {
  type Required1<T extends Record<PropertyKey, any>> = {
    [K in keyof T]-?: T[K];
  };
  type TOne = {
    name?: string;
    age?: number;
    flag: boolean;
  };
  type one = Required<TOne>;
  type two = Required1<TOne>;
  type equal = IsEqual<one, two>;
}

// 将interface或者Mapped Type的所有属性都转换为只读属性
namespace Readonly {
  type Readonly1<T extends Record<PropertyKey, any>> = {
    readonly [K in keyof T]: T[K];
  };
  type TOne = {
    readonly name: string;
    age: number;
    flag: boolean;
  };
  type one = Readonly<TOne>;
  type two = Readonly1<TOne>;
  type equal = IsEqual<one, two>;
}

// 修饰一个对象类型
namespace Record {
  type Record1<T extends PropertyKey, U> = {
    [K in T]: U;
  };
  type Record2<T extends PropertyKey, U> = Record<T, U>;
  // string | number | symbol
  // keyof any
  // PropertyKey
  // 这三者是同一个值
  type one = IsEqual<keyof any, PropertyKey>;
  type two = IsEqual<string | number | symbol, PropertyKey>;
}

// 将interface或者Mapped Type的某些属性提取出来转换为新的对象类型
namespace Pick {
  type Pick1<T extends Record<PropertyKey, any>, U extends keyof T> = {
    [K in U]: T[K];
  };
  type TOne = {
    name: string;
    age: number;
    flag: boolean;
  };
  type one = Pick<TOne, "name">;
  type two = Pick1<TOne, "name">;
  type equal = IsEqual<one, two>;
}

// 将interface或者Mapped Type的某些属性移除
namespace Omit {
  type Omit1<T extends Record<PropertyKey, any>, U extends keyof T> = {
    [K in keyof T as K extends U ? never : K]: T[K];
  };
  type Omit2<T extends Record<keyof any, any>, U extends keyof T> = Pick<
    T,
    Exclude<keyof T, U>
  >;
  type TOne = {
    name: string;
    age: number;
    flag: boolean;
  };
  type one = Omit<TOne, "name">;
  type two = Omit1<TOne, "name">;
  type equal1 = IsEqual<one, two>;
  type three = Omit<TOne, "name">;
  type four = Omit2<TOne, "name">;
  type equal2 = IsEqual<three, four>;
}

// 将union中的某些key剔除
namespace Exclude {
  type Exclude1<T, U> = T extends U ? never : T;
  type TOne = "name" | "age" | " flag";
  type one = Exclude<TOne, "name">;
  type two = Exclude1<TOne, "name">;
  type equal = IsEqual<one, two>;
}

// 将union中的某些key取出
namespace Extract {
  type Extract1<T, U> = T extends U ? T : never;
  type TOne = "name" | "age" | " flag";
  type one = Extract<TOne, "name">;
  type two = Extract1<TOne, "name">;
  type equal = IsEqual<one, two>;
}

// 剔除null和undefined
namespace NonNullable {
  type NonNullable1<T> = T extends null | undefined ? never : T;
  type TOne = string | number | undefined | null;
  type one = NonNullable<TOne>;
  type two = NonNullable1<TOne>;
  type equal = IsEqual<one, two>;
}

// 获取函数的parameters
namespace Parameters {
  type Parameters1<T extends (...args: any) => any> = T extends (
    ...args: infer R
  ) => any
    ? R
    : never;
  type TOne = (arg1: number) => string;
  type one = Parameters<TOne>;
  type two = Parameters1<TOne>;
  type equal = IsEqual<one, two>;
}

// 获取构造函数的parameters
namespace ConstructorParameters {
  type ConstructorParameters1<T extends new (...args: any) => any> =
    T extends new (...args: infer R) => any ? R : never;
  type one = ConstructorParameters<ErrorConstructor>;
  type two = ConstructorParameters1<ErrorConstructor>;
  type equal = IsEqual<one, two>;
  type three = ConstructorParameters1<FunctionConstructor>;
  type four = ConstructorParameters1<RegExpConstructor>;
}

// 获取函数的返回值
namespace ReturnType {
  type ReturnType1<T extends (...args: any) => any> = T extends (
    ...args: any
  ) => infer R
    ? R
    : never;
  type TOne = (arg1: number) => string;
  type one = ReturnType<TOne>;
  type two = ReturnType1<TOne>;
  type equal = IsEqual<one, two>;
}

// 获取构造函数返回的实例
namespace InstanceType {
  type InstanceType1<T extends new (...args: any) => any> = T extends new (
    ...args: any[]
  ) => infer R
    ? R
    : never;
  type one = InstanceType<ErrorConstructor>;
  type two = InstanceType1<ErrorConstructor>;
  type equal = IsEqual<one, two>;
  type three = InstanceType1<FunctionConstructor>;
  type four = InstanceType1<RegExpConstructor>;
}

// 获取函数的this指向
namespace ThisParametersType {
  class Dong {
    name: string;
    constructor() {
      this.name = "dong";
    }
    hello(this: Dong) {
      return "hello, I'm " + this.name;
    }
  }
  const dong = new Dong();

  type ThisParameterType1<T extends (this: any, ...args: any) => any> =
    T extends (this: infer H, ...args: never) => any ? H : unknown;
  type one = ThisParameterType<typeof dong.hello>;
  type two = ThisParameterType1<typeof dong.hello>;
  type equal = IsEqual<one, two>;
}

type testString1 = "this is a test data";
type testString2 = "THIS IS A TEST DATA";

// Uppercase
// 将字符串全部转换为大写字母
type Uppercase1 = Uppercase<testString1>;

// Lowercase
// 将字符串全部转换为小写字母
type Lowercase1 = Lowercase<testString2>;

// Capitalize
// 将字符串首字母大写
type Capitalize1 = Capitalize<testString1>;

// Uncapitalize
// 将字符串首字母小写
type Uncapitalize1 = Uncapitalize<testString2>;

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

type ExpandRecursive<T> = T extends Record<PropertyKey, any>
  ? T extends infer O
    ? {
        [K in keyof O]: ExpandRecursive<O[K]>;
      }
    : never
  : T;

type Ex1 = {
  name: string;
  age: number;
  rec: {
    name: string;
    age: number;
  };
};
type R0 = Ex1;
type R1 = ExpandRecursive<Ex1>;
