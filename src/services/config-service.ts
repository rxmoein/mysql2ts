import { Service } from '../core/service.decorator';
import { Configuration } from "../models/config";

@Service()
export class ConfigService {
    config: Configuration;

    constructor(config: Configuration) {
        this.config = config;
    }
}