import { createConnection, Connection } from 'mysql';
import { ConfigService } from './config-service';
import { Configuration } from '../models/config';
import { Validator } from './validator-service';
import { injectable, inject } from 'inversify';
import { MysqlService } from './mysql-service';
import chalk = require('chalk');
import { ToolsService } from './tools-service';

@injectable()
export class GeneratorService {
    configService: ConfigService;
    validatorService: Validator;
    mysqlService: MysqlService;
    toolsService: ToolsService;

    constructor(
        @inject(ConfigService) configService: ConfigService,
        @inject(Validator) validatorService: Validator,
        @inject(MysqlService) mysqlService: MysqlService,
        @inject(ToolsService) toolsService: ToolsService,
    ) {
        this.toolsService = toolsService;
        this.mysqlService = mysqlService;
        this.configService = configService;
        this.validatorService = validatorService;
    }

    async generate() {
        const config = this.configService.getConfig();

        await this.toolsService.initializeMysql();
        await this.toolsService.useDatabase(config.DatabaseName);
        const tables = await this.toolsService.getTables()
        console.log('tables: ', tables);
    }
}