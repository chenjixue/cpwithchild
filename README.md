## 安装方式
```
npm install cpwithchild -g
```
## 功能
在项目根路径（xxxx/xxx.xx 文件相对与项目根路径的相对路径）递归复制全部组件相关文件

### 基本用法
```bash
cpwithchild xxxx/xxx[.后缀名]
```

### 配置路径别名
组件import包含路径别名的话例如 `@/xxx.vue`, `$/xxx.vue` 可以选择配置路径别名：

```
cpwithchild xxxx/xxx[.后缀名] -a "@=src $=asset"
```

### 注意事项
`@=src` 不完全等于在构建工具config里面配置的 `@=src`，应该是src目录相对于项目根路径的相对路径。大多数情况下可能就是 `@=src`，但一些多包应用可能是 `@=packagexx/src`。

### 支持的文件类型
- JavaScript/TypeScript: `.js`, `.jsx`, `.ts`, `.tsx`
- Vue 组件: `.vue`
- 样式文件: `.css`, `.less`, `.scss`, `.sass`

### 支持的导入格式
- ES6 导入: `import { Component } from './Component.vue'`
- 直接导入: `import './style.css'`
- 样式导入: `@import './variables.css'`
- 样式导入(带选项): `@import (css) './variables.css'`
- 资源引用: `url('./images/logo.png')`