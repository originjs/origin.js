import iniTransform from '../src/iniTransformation'
import { join } from 'path'
import fs from 'fs'
import { PluginOptions } from '../src'

describe('iniTest', () => {
  test('include and exclude test', async () => {
    const options: PluginOptions = {
      ini: {
        enabled: true,
        include: /testInclude.ini/,
        exclude: /testExclude.ini/,
      },
    }

    let transformResult = iniTransform(options, '', 'testExclude.ini')
    expect(transformResult).toBeNull()

    transformResult = iniTransform(options, '', 'testFile.ini')
    expect(transformResult).toBeNull()

    transformResult = iniTransform(options, '', 'testInclude.ini')
    expect(transformResult).not.toBeNull()
  })

  test('ini transform', async () => {
    const path: string = join(__dirname, './files/alembic.ini')
    const iniContent: string = fs.readFileSync(path).toString()
    const options: PluginOptions = { ini: { enabled: true } }
    const transformResult = iniTransform(options, iniContent, '')
    expect(transformResult!.code).toEqual(`var data = { alembic:{ script_location:"migrations",
    "sqlalchemy.url":"scheme://localhost/airflow" },
  loggers:{ keys:"root,sqlalchemy,alembic" },
  handlers:{ keys:"console" },
  formatters:{ keys:"generic" },
  logger_root:{ level:"WARN",
    handlers:"console",
    qualname:"" },
  logger_sqlalchemy:{ level:"WARN",
    handlers:"",
    qualname:"sqlalchemy.engine" },
  logger_alembic:{ level:"INFO",
    handlers:"",
    qualname:"alembic" },
  handler_console:{ "class":"StreamHandler",
    args:"(sys.stderr,)",
    level:"NOTSET",
    formatter:"generic" },
  formatter_generic:{ format:"%(levelname)-5.5s [%(name)s] %(message)s",
    datefmt:"%H:%M:%S" },
  post_write_hooks:{ hooks:"isort",
    "isort.type":"console_scripts",
    "isort.entrypoint":"isort" } };
export default data;`)
  })
})
