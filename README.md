## 安装方式
```
npm install cpwithchild -g
```
## 功能
递归复制指定文件的全部相关文件

### 基本用法
在项目根路径执行以下命令（xxx/xxx/test.vue 文件相对根目录路径)
```bash
cpwithchild xxx/xxx/test.vue
```

### 配置路径别名
如果组件xxx/xxx/test.vue的import包含路径别名例如 `import testchild from '@/xxx/testchild.vue'`, `import Style from '$/xxx/xxx.css'` 可以选择配置路径别名:
```
cpwithchild xxx/xxx/test.vue -a "@=src $=asset"
```

### 注意事项
`@=src` 不完全等于在构建工具config里面配置的 `@=src`，应该是src目录相对于项目根路径的相对路径。大多数情况下可能就是 `@=src`，但一些多包应用可能是 `@=packagexx/src`。

### 不写文件后缀会按照以下顺序对文件后缀自动补齐
['', '.js', '.jsx', '.ts', '.tsx', '.vue', '.less', '.scss', '.css', '.sass']

### 支持的导入格式
- ES6 导入: `import { Component } from './Component.vue'`
- 直接导入: `import './style.css'`
- 样式导入: `@import './variables.css'`
- 样式导入(带选项): `@import (css) './variables.css'`
- 资源引用: `url('./images/logo.png')`
