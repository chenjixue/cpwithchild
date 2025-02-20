#! /usr/bin/env node
// const program = require("commander");
// const chalk = require("chalk");
// const copyFile = require("../lib/copyFile.cjs");
import { program } from "commander";
import chalk from "chalk";
import copyFile from "../lib/copyFile.cjs";
// 定义你的命令
program
  .argument("<url>", "源文件的 URL") // 定义一个参数 <url>
  .option("-a, --alias <value>", "传入参数")
  .description("源文件的url") //用来描述命令干啥的
  .action((pn, options) => {
    let aliasObject = {};
    if (options.alias) {
      let aliasArr = options.alias.split(" ");
      aliasArr.forEach((item) => {
        if (item) {
          let [key, value] = item.split("=");
          aliasObject[key] = value;
        }
      });
    }
    copyFile(pn,aliasObject);
  });
program.on("--help", () => {
  console.log(
    `Run ${chalk.cyan(
      "ku <command> --help"
    )} for detailed usage of given command.`
  );
});
// 解析进程中的参数
program.parse(process.argv);
