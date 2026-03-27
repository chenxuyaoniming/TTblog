### TypeScript

JavaScript 的超集，通过**静态类型**在编译期发现错误，并带来更好的 IDE 提示与重构体验。

#### 基础类型

```ts
const count: number = 1;
```

| 类型 | 说明 |
| ---- | ---- |
| `number` | 双精度浮点数 |
| `string` | UTF-16 字符串 |
| `boolean` | 逻辑值 |
| `null` / `undefined` | 空值与未定义（严格模式下注意与 `void` 的配合） |
| `void` | 无返回值的函数返回类型 |
| `never` | 永不出现的值（穷尽检查） |

#### 常用语法

- **`interface`**：描述对象形状，可扩展合并。
- **`type`**：类型别名，支持联合、交叉与条件类型。
- **`declare`**：为全局变量、模块或 `.png` 等资源声明类型。
- **`enum`**：枚举（若团队规范允许；也可用 `as const` + 联合类型替代）。

```ts
interface Props {
  name: string;
}

declare module '*.png' {
  const src: string;
  export default src;
}
```

#### 本站笔记

| 文章 | 主题 |
| ---- | ---- |
| [泛型](/ts/generic) | 类型参数与约束 |
| [项目创建](/ts/create) | `tsc` 初始化与 ESLint 配置 |

#### 学习建议

在现有 JS 项目中**渐进启用** `allowJs` + 逐步为 `.ts` 迁移；优先为 **API 与公共库** 补类型，收益最大。
