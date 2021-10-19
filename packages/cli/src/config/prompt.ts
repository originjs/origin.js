import {
  globalStyleOption,
  componentsOption,
  contentOption,
  pagesOption,
  markdownOption,
} from './plugins'

export const promptList = [
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
    choices: ['ISC', 'GPLv3', 'LGPLv3', 'MPL', 'BSD-3-Clause', 'MIT', 'Apache', 'MulanPSL2'],
    filter: (val: any) => {
      return val
    },
  },
  {
    type: 'checkbox',
    message: 'Please select the plugin you need (Use enter to skip):',
    name: 'plugins',
    choices: [
      {
        value: globalStyleOption,
        name: 'GlobalStyle: Global styles processing',
        package: '',
      },
      { value: componentsOption, name: 'Components: On-demand components auto importing for Vue' },
      { value: contentOption, name: 'Content: Use various types of file as ES modules' },
      { value: pagesOption, name: 'Layouts & Pages: Files based pages & layouts' },
      { value: markdownOption, name: 'Markdown: Use Markdown as Vue components' },
    ],
    filter: (val: any) => {
      if (val) {
        return val
      }
    },
  },
]
