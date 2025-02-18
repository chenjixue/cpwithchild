import program from 'commander'
import chalk from 'chalk' 
//import create from '../lib/create.js'
//import config from '../lib/config.js'
import { packageJson } from '../utils/common.js'
// 1. 创建项目
program.command('<url>')
    .description('源文件的url')//用来描述create命令干啥的
	// 第一参数为可选项的简写可全写，第二个参数是对第一参数的描述信息，用来描述这个option是干啥的
	// 执行ku create project-name --force的时候，如果当前目录有个叫project-name的目录就直接强制替换 
    // .option('-f,--force', 'overwrite target directory if it exists')
    .action((pn, cmd) => {//执行完这个命令后的回调函数
    	console.log(pn,cmd)
        //create(pn, cmd);
    })
// 输入 ku 命令的时候会输出这个工具的具体使用方法
program.usage('<command> [option]')
    .version(packageJson.version)
// 监听到help命令：ku --help时会调用回调函数
program.on('--help', () => {
    console.log()
    console.log(`Run ${chalk.cyan('ku <command> --help')} for detailed usage of given command.`)
    console.log()
})
// 解析进程中的参数
program.parse(process.argv)
