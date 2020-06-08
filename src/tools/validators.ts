import { Configuration } from '../models/config';

export function validateConfig(config: Configuration) {
    try {
        validateHostname(config.DatabaseHost)
        validateDatabaseName(config.DatabaseName);
        validatePort(config.DatabasePort);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export function validateHostname(inputText: string): void {
    const ipFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (!(inputText.match(ipFormat) || inputText == 'localhost')) {
        throw 'validation error: you have entered an invalid hostname';
    }
}

export function validateDatabaseName(inputText: string): void {
    const nameFormat = /[a-zA-Z]/;
    if (!inputText.match(nameFormat)) {
        throw 'validation error: you have entered an invalid database name';
    }
}

export function validatePort(inputText: string) {
    const portFormat = /^\d+$/;
    if (!inputText.match(portFormat)) {
        throw 'validation error: you have entered an invalid database port';
    }
}