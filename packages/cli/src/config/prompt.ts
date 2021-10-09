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
    choices: ['ISC', 'GPL', 'LGPL', 'MPL', 'BSD', 'MIT', 'Apache'],
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
        name: 'GlobalStyle: Processing global styles.',
        package: '',
      },
      { value: componentsOption, name: 'Components: Reusable vue components' },
      { value: contentOption, name: 'Content: Files as ES module' },
      { value: pagesOption, name: 'Layouts & Pages: Page Layout' },
      { value: markdownOption, name: 'Markdown: text to HTML' },
    ],
    filter: (val: any) => {
      if (val) {
        return val
      }
    },
  },
]
