import { Configuration } from '../models/config';
import isValid = require('is-valid-path');
import { injectable } from 'inversify';

@injectable()
export class Validator {
    validateConfig(config: Configuration) {
        try {
            this.validateHostname(config.DatabaseHost)
            this.validateDatabaseName(config.DatabaseName);
            this.validatePort(config.DatabasePort);
            this.validateFolderPath(config.OutputDirectory);
            this.validateMode(config.Mode);

            if (config.NamingConvention) {
                this.validateNamingConvention(config.NamingConvention);
            }
        } catch (error) {
            console.error(error.message);
            process.exit(1);
        }
    }

    validateHostname(inputText: string): void {
        const ipFormat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (!(inputText.match(ipFormat) || inputText === 'localhost')) {
            throw {
                message: 'validation error: you have entered an invalid hostname',
            };
        }
    }

    validateDatabaseName(inputText: string): void {
        const nameFormat = /[a-zA-Z]/;
        if (!inputText.match(nameFormat)) {
            throw {
                message: 'validation error: you have entered an invalid database name',
            };
        }
    }

    validatePort(inputText: string) {
        const portFormat = /^\d+$/;
        if (!inputText.match(portFormat)) {
            throw {
                message: 'validation error: you have entered an invalid database port',
            };
        }
    }

    validateFolderPath(inputText: string) {
        if (!isValid(inputText)) {
            throw {
                message: 'validation error: you have entered an invalid output directory',
            };
        }
    }

    validateMode(mode: string) {
        if (mode !== 'basic' && mode !== 'advanced') {
            throw {
                message: 'validation error: you have entered an invalid mode. Use "basic" or "advanced"',
            };
        }
    }

    validateNamingConvention(namingConvention: string) {
        if (namingConvention !== 'camelCase' && namingConvention !== 'pascalCase' && namingConvention !== 'snakeCase') {
            throw {
                message: 'validation error: naming convention is invalid. Use "camelCase" or "pascalCase" or "snakeCase"',
            };
        }
    }
}