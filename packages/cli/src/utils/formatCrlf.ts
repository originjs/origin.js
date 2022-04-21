export const formatToLf = (str: string): string => {
    return str.replace(/\r(\n)?/g, '\n')
}
