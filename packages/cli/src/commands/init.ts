import fs from 'fs-extra';
import ora from 'ora';
const download = require('download-git-repo')

const createDirIfNotExists = (dir:any) => {
    // Check whether there is a folder with the same name as the project name in the current folder
    // and whether the project name is legal
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
export async function init(name: any, options:any) {
        createDirIfNotExists(name);
        //Pull template from github to new project
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
