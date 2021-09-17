declare module '*.xlsx' {
  import { WorkBook } from 'xlsx'
  const workbook: WorkBook
  export default workbook
}
