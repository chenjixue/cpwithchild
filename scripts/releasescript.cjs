const { execSync } = require('child_process');
const readline = require('readline');

// 创建一个 readline 接口用于输入提交信息
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 执行 shell 命令
function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`命令失败：${command}`);
    process.exit(1);
  }
}

// 开始执行发布过程
function publish() {
  // 1. 更新版本（不做 git 提交或 tag）
  runCommand('npm version patch --no-git-tag-version');

  // 2. 让用户输入 git 提交信息
  rl.question("请输入 git 提交信息：", (commitMessage) => {
    if (!commitMessage) {
      // 如果没有输入提交信息，使用默认信息
      const version = require('../package.json').version;
      commitMessage = `chore(release): v${version}`;
    }

    // 3. 提交代码
    runCommand('git add .');  // 包括所有文件，未提交的更改也会一并提交
    runCommand(`git commit -m "${commitMessage}"`);

    // 5. 推送到远程仓库
    runCommand('git push');

    // 6. 发布到 npm
    runCommand('npm publish');

    // 7. 完成
    console.log("发布成功！");
    rl.close(); // 关闭 readline 接口
  });
}

publish(); // 执行发布
