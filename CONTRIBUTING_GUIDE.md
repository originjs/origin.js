[简体中文](https://github.com/originjs/origin.js/blob/main/CONTRIBUTING_GUIDE_ZH.md) | English

# Contributing Guide

Origin.js is an open source project deployed on GitHub, and this document help you contribute to the community. If you found bugs from this tool, or intend to add some new features, you can create [issue or discussion](#issue-or-discussion). If you are interested in coding, and would like to solve other users' problems, you can also submit pull requests to make [code contribution](#code-contribution). As with other projects in community, users who are more active will receive community seats, which means that they will have more privileges on management.

## Issue or Discussion

If there was some problem caused by Origin.js, such as print error messages when compiling and running, you can create a discussion in the community to ask questions. Developers or community users may give you answers. Meanwhile, you can also provide good solution to others.

When the bug has been identified in the project and you can provide reproduction, please create an issue with `bug` template, and fill in the description. Alternatively, you can select the `Feature request` template to show your idea. To understand for your question well, please describe the content completely and excatly.

## Code Contribution

Origin.js allows you to modify the source code to fix bugs, develop new features, or solve problems raised by other users. To be adopted and published to the community version, you need follow these steps to commit code:

### Create a new branch

First, fork the project to your own repository, clone the forked project to your local. Then create a new branch:

```shell
git checkout -b branchName
```

It is recommended to set the original repository address to the remote of the forked project to make it more convenient to synchronize the original code later.

### Build

Origin.js is a project of monorepo, using pnpm as package manager. So you need to install pnpm first:

```shell
npm i -g pnpm
```

Then install the dependencies and build it:

```shell
pnpm i
pnpm build
```

### Modify code

After completing above steps, you can modify the code and debug. The `packages` directory contains the 8 modules of Origin.js.

- cli: Origin.js instruction set
- cli-service: project service instruction
- cli-test-utils: unit testing tools
- core: to be developed
- e2e: integration testing tool
- vite-plugin-content: A plugin that supports converting documents to ES modules
- vite-plugin-global-style: A plugin that supports global styles in multiple formats
- vite-plugin-pages: A plugin that supports generating page path from directory

Don't forget to modify or add test cases for new function in the `__tests__` directory of the module. You should build and run test to ensure that all test cases will be passed:

```shell
pnpm build
pnpm test
```

### Submit code

Just like a normal GitHub project, commit your code first. The message format should be like: `/^(revert: )?(feat|fix|docs|dx|refactor|perf|test|workflow|build|ci|chore|types|wip|release|deps)(\(.+\))?: .{1,50}/`.

Push to the remote branch of the forked repository. Then open the github repository page, the `compare && pull request` button will pop up. Click it and choose to merge your branch into the `main` branch, describe content about the PR modification and the problem solved in the text box (If necessary, use #xxx to reference the issue number), and confirm to submit.

Community managers will review your code following community norms and logical correctness, and you may receive some suggestions. Once the code passed the verification, this PR will be merged into the project. The code line amount that has been merged will also be displayed in the `Contributors` tab on the project home page.

## Finally

Thank you for your efforts on open source. We are looking forward to creating more inspiration in community exchanges 💡
