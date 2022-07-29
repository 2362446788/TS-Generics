namespace Capitalize {
  // 将烤串类型转换为小驼峰类型 aaa-bbb-ccc -> aaaBbbCcc
  type KebabCaseToCamelCase<T extends string> =
    T extends `${infer F}-${infer R}`
      ? `${F}${KebabCaseToCamelCase<Capitalize<R>>}`
      : T;

  type stringOne = KebabCaseToCamelCase<"aaa-bbb-ccc">;

  // 将小驼峰类型转换为烤串类型 aaaBbbCcc -> aaa-bbb-ccc
  type CamelCaseToKebabCase<T extends string> = T extends `${infer F}${infer R}`
    ? F extends Uncapitalize<F>
      ? `${F}${CamelCaseToKebabCase<R>}`
      : `-${Uncapitalize<F>}${CamelCaseToKebabCase<R>}`
    : T;

  type stringTwo = CamelCaseToKebabCase<"aaaBbbCcc">;

  // PickByType，按照值的类型提取对应的key
  type PickByType<T extends Record<keyof any, any>, U> = {
    [K in keyof T as T[K] extends U ? K : never]: T[K];
  };
  type Value1 = { name: string; isReadonly: boolean };

  // { isReadonly: boolean }
  type PickBoolean = PickByType<Value1, boolean>;

  // OmitByType，按照值的类型剔除对应的key
  type OmitByType<T extends Record<keyof any, any>, U> = {
    [K in keyof T as T[K] extends U ? never : K]: T[K];
  };
  type Value2 = { name: string; isReadonly: boolean };
  // { isReadonly: boolean }
  type OmitBoolean = OmitByType<Value2, boolean>;

  // PartialByKeys，将特定的key设置为可选项
  type Value3 = { name: string; age: number };
  type Copy<T extends Record<keyof any, any>> = {
    [K in keyof T]: T[K];
  };

  type PartialByKeys1<
    T extends Record<PropertyKey, any>,
    U extends keyof T
  > = Copy<Partial<Pick<T, Extract<keyof T, U>>> & Omit<T, U>>;

  type PartialByKeys2<
    T extends Record<PropertyKey, any>,
    U extends keyof T
  > = Copy<
    {
      [K in keyof T as K extends U ? K : never]?: T[K];
    } & {
      [K in keyof T as K extends U ? never : K]: T[K];
    }
  >;

  // { name?: string | undefined; age: number; }
  type UserPartialName1 = PartialByKeys1<Value3, "name">;
  type UserPartialName2 = PartialByKeys2<Value3, "name">;
}

// ParseQueryString
// 解析=两端的值
type ParseParam<T extends string> = T extends `${infer F}=${infer R}`
  ? {
      [K in F]: R;
    }
  : Record<string, any>;

type Result = ParseParam<"a=1">;

type MergeValues<T, U> = U extends any[] ? [T, ...U] : [T, U];

// 合并对应的值
type MergeParams<
  T extends Record<string, any>,
  U extends Record<string, any>
> = {
  [K in keyof T | keyof U]: K extends keyof T
    ? K extends keyof U
      ? MergeValues<T[K], U[K]>
      : T[K]
    : K extends keyof U
    ? U[K]
    : never;
};

// 解析&两端的值
type ParseQueryString<T extends string> = T extends `${infer P}&${infer R}`
  ? MergeParams<ParseParam<P>, ParseQueryString<R>>
  : ParseParam<T>;

function parseQueryString<Str extends string>(
  queryStr: Str
): ParseQueryString<Str> {
  if (!queryStr || !queryStr.length) {
    return {} as any;
  }
  const queryObj = {} as any;
  const items = queryStr.split("&");
  items.forEach((item) => {
    const [key, value] = item.split("=");
    if (queryObj[key]) {
      if (Array.isArray(queryObj[key])) {
        queryObj[key].push(value);
      } else {
        queryObj[key] = [queryObj[key], value];
      }
    } else {
      queryObj[key] = value;
    }
  });
  return queryObj as any;
}

const res = parseQueryString("a=1&a=1&a=2&b=2&c=3");
