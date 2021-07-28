import fs from 'fs-extra';
const download = require('download-git-repo')
const ora =require('ora')
export function init(name: any, options:any) {
       // 1.Check whether there is a folder with the same name as the project name in the current folder
       // and whether the project name is legal
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
        // 2. Pull template from github to new project
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
