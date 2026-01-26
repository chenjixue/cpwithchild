#! /usr/bin/env node
// const program = require("commander");
// const chalk = require("chalk");
// const copyFile = require("../lib/copyFile.cjs");
import { program } from 'commander'
import chalk from 'chalk'
import copyFile from '../lib/copyFile.cjs'
import fs from 'fs'
import { exec } from 'child_process'
const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))
let packageInfo = loadJSON('../package.json')
program
  .name('cpwithchild')
  .version(`cpwithchild v${packageInfo.version}`, '-v, --version')
  .usage('[url] [options]')
// 定义你的命令

program
  .argument('[url]', '源文件的 URL') // 定义一个参数 <url>
  .option('-a, --alias <value>', '传入参数')
  .action((pn, options) => {
    let aliasObject
    if (options.alias) {
      let aliasArr = options.alias.split(' ')
      aliasArr.forEach((item) => {
        if (item) {
          let [key, value] = item.split('=')
          aliasObject = aliasObject || {}
          aliasObject[key] = value
        }
      })
    }
    if (pn) {
      if (aliasObject) {
        copyFile(pn, aliasObject)
      } else {
        copyFile(pn)
      }
    } else {
      exec('cpwithchild --help', (error, stdout, stderr) => {
        console.log(`${stdout}`)
      })
    }
  })
// 解析进程中的参数
program.parse(process.argv)
