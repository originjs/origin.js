import fs from 'fs-extra'
import ora from 'ora'
import inquirer from 'inquirer'
// const download = require('download-git-repo')
import createPackageTemplate from '../template/createPackageTemplate'
import chalk from 'chalk'
import path from 'path'

const defaultOptions: any = {
  name: 'webProject',
  version: '1.0.0',
  license: 'ISC',
  author: '',
}
const copy=function(src:string,dst:string){
  console.log('copy')
    const paths = fs.readdirSync(src); //同步读取当前目录
    console.log(paths)
    paths.forEach(function(path){
        const _src=src+'/'+path;
        const _dst=dst+'/'+path;
        console.log('_src'+_src)
        console.log('_dst'+_dst)
        fs.stat(_src,function(err,stats){ //stats  该对象 包含文件属性
            if(err)throw err;
            if(stats.isFile()){ //如果是个文件则拷贝
                const readable=fs.createReadStream(_src);//创建读取流
                const writable=fs.createWriteStream(_dst);//创建写入流
                readable.pipe(writable);
            }else if(stats.isDirectory()){ //是目录则 递归
                checkDirectory(_src,_dst,copy,'');
            }
        });
    });
}
const checkDirectory=function(src:string,dst:string,callback:any,projectName:string){
    if(projectName!==''){
      fs.mkdirSync(projectName);
      checkDirectory(src,dst,callback,'')
    }else {
      fs.access(dst, fs.constants.F_OK, (err) => {
        if(err){
            fs.mkdirSync(dst);
            callback(src,dst);
        }else{
            callback(src,dst);
        }
      });
    }
};

const SOURCES_DIRECTORY = path.resolve(__dirname, '../oriTemplate'); //源目录

const ifDirExists = (name: any) => {
  // Check whether there is a folder with the same name as the project name in the current folder
  // and whether the project name is legal
  const reg = /[< > / \ | : " * ?]/g
  if (!fs.existsSync(name) && !reg.test(name)) {
    return true
  } else {
    console.error(
      chalk.red('The file name is invalid or the file name already exists'),
    )
    return false
  }
}
export default async function init(name: any) {
  if (!ifDirExists(name)) return false
  defaultOptions.name = name
  //Pull template from github to new project
  const spinner = ora('Downloading...')
  spinner.start()
  try {
    checkDirectory(SOURCES_DIRECTORY, path.resolve(path.join(process.cwd(),name)), copy,name);
  } catch (error) {
    spinner.fail()
    console.log(error)
    return false
  }
  spinner.succeed()
  try {
    const promptList = [
      {
        type: 'input',
        message: 'Please set the initial version number of the project:',
        name: 'version',
        default: '1.0.0',
      },
      {
        type: 'list',
        message: 'Please set the project code license:',
        name: 'license',
        choices: ['ISC', 'GPL', 'LGPL', 'MPL', 'BSD', 'MIT', 'Apache'],
        filter: (val: any) => {
          return val
        },
      },
    ]
    await inquirer
      .prompt(promptList)
      .then((answers: any) => {
        Object.assign(defaultOptions, answers)
      })
      .catch((error: any) => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
          console.error(
            chalk.red("Prompt couldn't be rendered in the current environment"),
          )
          console.log(error)
        } else {
          // Something else went wrong
          console.log(error)
        }
      })
  } catch (error) {
    console.error(chalk.red('Failed to initialize the template'))
    console.log(error)
    return false
  }
  try {
    createPackageTemplate(defaultOptions)
  } catch (error) {
    console.error(chalk.red('Failed to complete package.json'))
    console.log(error)
  }
}
