import { Configuration } from "../models/config";

export function upperFirst(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toCamelCase(str: string) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

export function toSnakeCase(str: string) {
    return str.replace(/\.?([A-Z]+)/g, (x, y) => { return '_' + y.toLowerCase() }).replace(/^_/, '');
}

function isUpperCase(str: string) {
    return str === str.toUpperCase();
}

export function formatName(config: Configuration, name: string): string {
    switch (config.NamingConvention) {
        case 'camelCase':
            if (isUpperCase(name)) {
                return name.toLowerCase();
            }
            return toCamelCase(name)
        case 'pascalCase': return upperFirst(name);
        case 'snakeCase': return toSnakeCase(name);
        default: return upperFirst(name);
    }
}