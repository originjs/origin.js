import {
  globalStyleOption,
  componentsOption,
  contentOption,
  pagesOption,
  markdownOption,
  federationOption,
} from './plugins'
import { QuestionCollection } from 'inquirer'

export const promptList: Array<QuestionCollection> = [
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
    choices: [
      'MIT',
      'Apache',
      'BSD-3-Clause',
      'MulanPSL2',
      'ISC',
      'GPLv3',
      'LGPLv3',
      'MPL',
    ],
    filter: (val: any) => {
      return val
    },
  },
  {
    type: 'list',
    message: 'Please choose the test utils you want to use:',
    name: 'test',
    choices: ['none', 'jest', 'vitest'],
    filter: (val: any) => {
      return val
    },
  },
  {
    // @ts-ignore
    type: 'checkbox',
    message: 'Please select the plugin you need (Use enter to skip):',
    name: 'plugins',
    choices: [
      {
        value: globalStyleOption,
        name: 'GlobalStyle: Global styles processing',
      },
      {
        value: componentsOption,
        name: 'Components: On-demand components auto importing for Vue',
      },
      {
        value: contentOption,
        name: 'Content: Use various types of file as ES modules',
      },
      {
        value: pagesOption,
        name: 'Layouts & Pages: Files based pages & layouts',
      },
      {
        value: markdownOption,
        name: 'Markdown: Use Markdown as Vue components',
      },
      {
        value: federationOption,
        name: 'ModuleFederation: Use Module Federation in vite',
      },
    ],
    filter: (val: any) => {
      if (val) {
        return val
      }
    },
  },
  {
    type: 'list',
    name: 'federationType',
    message:
      'Please select if this is project a Host or Remote for Module Federation:',
    choices: ['Host', 'Remote'],
    filter: (val: any) => {
      return val
    },
    when: answers => {
      if (!answers.plugins || answers.plugins.length == 0) {
        return false
      }
      let federationSelected = false
      // @ts-ignore
      answers.plugins.forEach(plugin => {
        if (plugin.name == federationOption.name) {
          federationSelected = true
        }
      })
      return federationSelected
    },
  },
]
