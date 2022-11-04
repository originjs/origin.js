简体中文 | [English](https://github.com/originjs/origin.js/blob/main/CONTRIBUTING_GUIDE.md)

# 贡献指南

Origin.js 是一个托管在 github 上的开源项目，本文档将对如何参与开源社区贡献进行说明。如果您在使用过程中发现程序 bug，或者想要添加实用的新功能，欢迎在社区中提出[issue和讨论](#issue和讨论)。如果您对该项目源码感兴趣，想要帮助社区中的用户解决问题，也可以提交 PR 参与[代码贡献](#代码贡献)。和其他社区项目一样，活跃的用户将获得该项目的社区席位，拥有更多社区管理权限。

## issue和讨论

当您的项目引用了 Origin.js 中的模块，并且引起报错，您可以在社区的 `Discussions` 创建讨论帖提出问题，开发人员和其他社区用户可能会给出解答。如果您有好的解决办法，也可以回答其他人的问题。

如果您已经确定是模块内存在 bug，并且能够提供复现代码，请创建社区 issue，并选择 `Bug` 模板，按照模板填写描述。另外，也可以选择`Feature request` 模板提出新功能需求。为了社区用户能够准确理解您的问题，请尽量按照模板将内容填写完整。

## 代码贡献

Origin.js 是一个开源项目，您可以通过自己修改仓库代码，来修复程序 bug，开发新功能，或者是解决其他用户提出的问题。如果希望修改的代码被采纳并发布到社区版本，请按照以下步骤完成代码提交：

### 创建分支

首先，fork 该项目到自己的仓库，然后 clone 已 fork 的仓库代码到本地。然后创建一个新的分支：

```shell
git checkout -b branchName
```

建议将原仓库地址设置到 fork 仓的 remote 中，使得之后同步远程仓库代码时更加便捷。

### 构建项目

Origin.js 是一个 monorepo 项目，使用 pnpm 进行依赖包托管，请先安装 pnpm：

```shell
npm i -g pnpm
```

然后安装项目依赖并构建：

```shell
pnpm i
pnpm build
```

### 修改代码

完成以上步骤，就可以自行修改和调试代码了。`packages` 目录中包含了该项目的8个模块，您可以修改对应模块的代码。

- cli：Origin.js 指令集
- cli-service：Origin.js 项目服务指令
- cli-test-utils：单元测试工具
- core：待开发
- e2e：集成测试工具
- vite-plugin-content：实现文档转换为ES模块的插件
- vite-plugin-global-style：实现多种格式全局样式的插件
- vite-plugin-pages：实现目录生成页面路径的插件

修改代码后，请在该模块的 `__tests__` 目录下修改或添加相应功能的测试用例，并构建运行，保证所有测试用例通过：

```shell
pnpm build
pnpm test
```

### 提交代码

如同一般的 github 项目，先提交修改后的代码，提交信息格式为：`/^(revert: )?(feat|fix|docs|dx|refactor|perf|test|workflow|build|ci|chore|types|wip|release|deps)(\(.+\))?: .{1,50}/`。

然后推送到 fork 仓的远程分支。推送成功后，进入 github 的仓库页面中，页面上将会弹出 `compare && pull request` 按钮。点击选择将您的分支合入到 `main` 分支，并在文本框中描述该 PR 修改的内容和解决的问题（如有需要，使用 #xxx 引用 issue 编号），确认后就完成了 PR 的创建。

社区管理者将遵循社区规范和逻辑正确性，对您提交的代码进行审核，您可能会收到一些修改建议。代码通过检验后，即可合入项目。您已经被合入的代码量也会显示在项目主页的 Contributor 排行中。

## 最后

感谢您对开源工作的支持，我们期待在社区交流中能够创造更多灵感 💡
