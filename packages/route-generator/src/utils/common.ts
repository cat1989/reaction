export const toFirstCharUpperCase = ([firstChar, ...rest]: string) => {
    return `${firstChar.toUpperCase()}${rest.join("")}`
}

export const toCamelCase = (str: string) => {
    return str.split(/[^0-9A-Za-z]+/).filter((char) => char !== '').map(toFirstCharUpperCase).join("")
}
