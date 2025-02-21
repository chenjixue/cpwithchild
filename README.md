## 安装方式
```
npm install cpwithchild -g
```
## 功能
在项目根路径（xxxx/xxx.vue文件相对与项目根路径的相对路径）
```
cpwithchild xxxx/xxx.vue
```
即可递归复制全部组件相关文件


组件import包含路径别名的话例如 @/xxx.vue, $/xxx.vue 可以选择配置路径别名
```
cpwithchild xxxx/xxx.vue -a @=src $=asset
```