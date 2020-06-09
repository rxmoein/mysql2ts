import { Configuration } from '../models/config';
import { injectable } from 'inversify';

@injectable()
export class Validator {
    validateConfig(config: Configuration) {
        try {
            this.validateHostname(config.DatabaseHost)
            this.validateDatabaseName(config.DatabaseName);
            this.validatePort(config.DatabasePort);
        } catch (error) {
            console.error(error);
            process.exit(1);
        }
    }

    validateHostname(inputText: string): void {
        const ipFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (!(inputText.match(ipFormat) || inputText == 'localhost')) {
            throw 'validation error: you have entered an invalid hostname';
        }
    }

    validateDatabaseName(inputText: string): void {
        const nameFormat = /[a-zA-Z]/;
        if (!inputText.match(nameFormat)) {
            throw 'validation error: you have entered an invalid database name';
        }
    }

    validatePort(inputText: string) {
        const portFormat = /^\d+$/;
        if (!inputText.match(portFormat)) {
            throw 'validation error: you have entered an invalid database port';
        }
    }
}