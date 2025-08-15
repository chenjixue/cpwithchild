#! /usr/bin/env node
const fs = require('fs')
const path = require('path')
const fse = require('fs-extra')
// import fs  from "fs";
// import path from "path"
// import fse from "fs-extra"
function copyFile(TARGET_COMPONENT,aliasObject ={
  '@':"src"
}) {
  // 项目根目录（请修改）
  const PROJECT_ROOT = path.resolve('')

  // 目标复制目录
  const DEST_DIR = path.resolve('output_copied_files')

  // 记录已复制的文件，防止重复
  const copiedFiles = new Set()

  // 支持的文件后缀 - 添加样式文件支持
  const EXTENSIONS = ['', '.js', '.jsx', '.ts', '.tsx', '.vue', '.less', '.scss', '.css', '.sass']

  // 正则匹配 ES6/TypeScript 导入语句（带 from 的）
  const IMPORT_REGEX = /(?:import|export)\s+(\{[^}]*\}|[\w*]+\s*(?:as\s*\w+)?)\s+from\s+['"](.*?)['"]/gs;  

  // 正则匹配直接导入语句（不带 from 的，如 import './style.css'）
  const DIRECT_IMPORT_REGEX = /import\s+['"](.*?)['"]/g

  // 正则匹配样式文件导入语句
  const STYLE_IMPORT_REGEX = /@import\s+['"](.*?)['"]/g
  const STYLE_URL_REGEX = /url\s*\(\s*['"]?([^'"]+)['"]?\s*\)/g

  /**
   * 解析 import 语句，返回所有引用的文件路径
   */
  function findImports(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const imports = []
    let match

    // 处理 JavaScript/TypeScript/Vue 文件的 import 语句（带 from 的）
    while ((match = IMPORT_REGEX.exec(content)) !== null) {
      let importedPath = match[2]
      if (importedPath.startsWith('.')) {
        const resolvedPath = resolveImportPath(filePath, importedPath)
        if (resolvedPath) imports.push(resolvedPath)
      }
      Object.keys(aliasObject).forEach((key,index )=>{
        if(importedPath.startsWith(`${key}/`)){
          importedPath = importedPath.replace(key,".")
          const resolvedPath = resolveImportPath(path.resolve(`${aliasObject[key]}/xxx`), importedPath)
          if (resolvedPath) imports.push(resolvedPath)
         }
      })
    }

    // 处理直接导入语句（不带 from 的，如 import './style.css'）
    while ((match = DIRECT_IMPORT_REGEX.exec(content)) !== null) {
      let importedPath = match[1]
      if (importedPath.startsWith('.')) {
        const resolvedPath = resolveImportPath(filePath, importedPath)
        if (resolvedPath) imports.push(resolvedPath)
      }
      Object.keys(aliasObject).forEach((key,index )=>{
        if(importedPath.startsWith(`${key}/`)){
          importedPath = importedPath.replace(key,".")
          const resolvedPath = resolveImportPath(path.resolve(`${aliasObject[key]}/xxx`), importedPath)
          if (resolvedPath) imports.push(resolvedPath)
         }
      })
    }

    // 处理样式文件的 @import 语句
    while ((match = STYLE_IMPORT_REGEX.exec(content)) !== null) {
      let importedPath = match[1]
      if (importedPath.startsWith('.')) {
        const resolvedPath = resolveImportPath(filePath, importedPath)
        if (resolvedPath) imports.push(resolvedPath)
      }
      Object.keys(aliasObject).forEach((key,index )=>{
        if(importedPath.startsWith(`${key}/`)){
          importedPath = importedPath.replace(key,".")
          const resolvedPath = resolveImportPath(path.resolve(`${aliasObject[key]}/xxx`), importedPath)
          if (resolvedPath) imports.push(resolvedPath)
         }
      })
    }

    // 处理样式文件中的 url() 引用
    while ((match = STYLE_URL_REGEX.exec(content)) !== null) {
      let urlPath = match[1]
      if (urlPath.startsWith('.')) {
        const resolvedPath = resolveImportPath(filePath, urlPath)
        if (resolvedPath) imports.push(resolvedPath)
      }
      Object.keys(aliasObject).forEach((key,index )=>{
        if(urlPath.startsWith(`${key}/`)){
          urlPath = urlPath.replace(key,".")
          const resolvedPath = resolveImportPath(path.resolve(`${aliasObject[key]}/xxx`), urlPath)
          if (resolvedPath) imports.push(resolvedPath)
         }
      })
    }

    return imports
  }

  /**
   * 解析 import 的相对路径，返回完整的文件路径
   */
  function resolveImportPath(baseFile, importPath) {
    const baseDir = path.dirname(baseFile)
    let fullPath = path.resolve(baseDir, importPath)

    // 检查是否有文件扩展名
    const hasExtension = path.extname(importPath) !== ''
    
    if (hasExtension) {
      // 如果已经有扩展名，直接检查文件是否存在
      if (fs.existsSync(fullPath)) return fullPath
    } else {
      // 如果没有扩展名，尝试添加各种扩展名
      for (let ext of EXTENSIONS) {
        if (fs.existsSync(fullPath + ext)) return fullPath + ext
        if (fs.existsSync(fullPath + '/index' + ext)) return fullPath + '/index' + ext
      }
    }
    return null
  }

  /**
   * 复制文件到目标目录，并保持原目录结构
   */
  function copyFile(filePath) {
    if (copiedFiles.has(filePath)) return

    copiedFiles.add(filePath)
    const relativePath = path.relative(PROJECT_ROOT, filePath)
    const destPath = path.join(DEST_DIR, relativePath)

    fse.ensureDirSync(path.dirname(destPath))
    fse.copySync(filePath, destPath)
    console.log(`Copied: ${filePath} -> ${destPath}`)
  }

  /**
   * 递归复制组件及其所有子依赖
   */
  function copyComponentRecursive(startFile) {
    const queue = [startFile]

    while (queue.length > 0) {
      const file = queue.pop()
      if (!file || copiedFiles.has(file)) continue

      copyFile(file)
      const imports = findImports(file)
      queue.push(...imports)
    }
  }

  // **主逻辑**
  const entryFile = path.join(PROJECT_ROOT, TARGET_COMPONENT) // 可改为 .tsx/.vue
  // debugger
  console.log(entryFile, 'entryFile--')
  if (!fs.existsSync(entryFile)) {
    console.error(`Error: ${entryFile} not found!`)
    process.exit(1)
  }

  console.log(`Starting to copy dependencies of ${TARGET_COMPONENT}...`)
  copyComponentRecursive(entryFile)
  console.log('Copying complete!')
}
module.exports = copyFile;
// 入参传递文件相对于项目根目录的相对路径 例如src/components/demoComponent.vue
// copyFile('webapp/src/components/agent/flow/AgentFlow.vue')