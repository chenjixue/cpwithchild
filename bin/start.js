#! /usr/bin/env node
// const program = require("commander");
// const chalk = require("chalk");
// const copyFile = require("../lib/copyFile.cjs");
import {program } from "commander";
import chalk  from "chalk";
import copyFile from "../lib/copyFile.cjs"
program
  .argument('<url>', '源文件的 URL')  // 定义一个参数 <url>
  .description("源文件的url") //用来描述命令干啥的
  .action((pn, cmd) => {
    copyFile(pn)
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
