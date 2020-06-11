import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { ConfigService } from './config-service';
import { Validator } from './validator-service';
import { injectable, inject } from 'inversify';
import { MysqlService } from './mysql-service';
import { ToolsService } from './tools-service';
import { toolsString } from '../models/values';
import { Table } from '../models/table';
import { isAbsolute } from 'path'
import chalk = require('chalk');

@injectable()
export class GeneratorService {
    configService: ConfigService;
    validatorService: Validator;
    mysqlService: MysqlService;
    toolsService: ToolsService;

    constructor(
        @inject(Validator) validatorService: Validator,
        @inject(MysqlService) mysqlService: MysqlService,
        @inject(ToolsService) toolsService: ToolsService,
        @inject(ConfigService) configService: ConfigService,
    ) {
        this.toolsService = toolsService;
        this.mysqlService = mysqlService;
        this.configService = configService;
        this.validatorService = validatorService;
    }

    async generate() {
        const start = +new Date()
        const config = this.configService.getConfig();

        await this.toolsService.initializeMysql();
        await this.toolsService.useDatabase(config.DatabaseName);
        const tables = await this.toolsService.getTables();
        await this.exportTables(tables);

        const end = +new Date() - start;
        console.log(chalk.green(`Models generated successfully in ${end}ms`));
        process.exit(0);
    }

    async exportTables(tables: Table[]) {
        try {
            const config = this.configService.getConfig();

            const outputDirectory = isAbsolute(config.OutputDirectory) ? config.OutputDirectory : process.cwd() + '/' + config.OutputDirectory;
            if (!existsSync(outputDirectory)) {
                mkdirSync(outputDirectory);
            }

            for (const table of tables) {
                writeFileSync(`${outputDirectory}/${table.name}.model.ts`, table.getClassDefinitionString(config));
            }

            if (config.Mode === 'advanced') {
                writeFileSync(`${outputDirectory}/needed-utils.ts`, toolsString);
            }

        } catch (error) {
            console.log('error: ', error.message);
            process.exit(1);
        }
    }
}