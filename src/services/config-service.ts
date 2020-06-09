import { Configuration } from '../models/config';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class ConfigService {
    private config: Configuration = {} as any;

    setConfig(config: Configuration) {
        this.config = config;
    }

    getConfig() {
        return this.config;
    }
}