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
}
