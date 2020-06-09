import { createConnection, Connection } from 'mysql';
import { ConfigService } from './config-service';
import { Configuration } from '../models/config';
import { Validator } from './validator-service';
import { injectable, inject } from 'inversify';
import { MysqlService } from './mysql-service';
import chalk = require('chalk');

@injectable()
export class GeneratorService {
    configService: ConfigService;
    validatorService: Validator;
    mysqlService: MysqlService;

    constructor(
        @inject(ConfigService) configService: ConfigService,
        @inject(Validator) validatorService: Validator,
        @inject(MysqlService) mysqlService: MysqlService,
    ) {
        this.mysqlService = mysqlService;
        this.configService = configService;
        this.validatorService = validatorService;
    }

    async generate() {
        const config = this.configService.getConfig();

        try {
            console.log(chalk.blue('Connecting to database...'));
            await this.mysqlService.initialize();
            console.log(chalk.blue('Connected!'));
        } catch (error) {
            console.log('Could not connect to database:', error);
            process.exit(1);
        }

        try {
            await this.mysqlService.executeQuery('USE ' + config.DatabaseName);
        } catch (error) {
            console.log('error: ', error);
            process.exit(1);
        }

        let tablesResult: any[];
        try {
            console.log(chalk.blue('Getting tables...'));
            tablesResult = await this.mysqlService.executeQuery('SHOW TABLES') as any;
        } catch (error) {
            console.log('error: ', error);
            process.exit(1);
        }

        for (const table of tablesResult) {
            console.log('table: ', table);
        }

        // try {
        //     await executeQuery('DESCRIBE ' + config.DatabaseName, connection);
        // } catch (error) {
        //     console.log('error: ', error);

        // }
    }
}