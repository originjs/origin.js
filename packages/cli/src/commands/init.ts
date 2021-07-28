import fs from 'fs-extra';
const download = require('download-git-repo')
const ora =require('ora')
export default function init(name: any, options:any) {
  // name 根文件名
  // console.log('name', name)
  // options 其他配置参数
  // console.log('options', options)
       // 1.检查当前文件夹下有没有和项目名同名的文件夹 以及 项目名是否合法
        const createDirIfNotExists = (dir:any) => {
           if(!fs.existsSync(dir) ){
              const reg = /[< > / \ | : " * ?]/g;
              if(reg.test(name)){
                  console.error('ProjectName is illegal')
                  return false
              }
            }else {
                console.error('Dir already exists')
                return false
            }
        };
        createDirIfNotExists(name);
        // 2. 从github拉取模板到新建项目
        const combineFiles= async (name:any) => {
          const spinner = ora('Downloading...')
          spinner.start()
              try {
                await new Promise<void>((resolve, reject) => {
                  download('wangAlisa/vue-temp', name,{ clone:false },(error:any)=>{
                    if(error) {
                      spinner.fail()
                      return reject(error)
                    }
                    spinner.succeed()
                    resolve()
                  })
                })

              } catch (error) {
                console.error('Failed to initialize the template')
                console.log(error)
                return false
              }
        }
        combineFiles(name)
}
