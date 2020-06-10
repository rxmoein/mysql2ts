import { ConfigService } from './config-service';
import { injectable, inject } from 'inversify';
import { MysqlService } from './mysql-service';
import { Column } from '../models/column';
import { Table } from '../models/table';
import chalk = require('chalk');
import { DataTypesMap } from '../models/values';

@injectable()
export class ToolsService {
    mysqlService: MysqlService;
    configService: ConfigService;

    constructor(
        @inject(MysqlService) mysqlService: MysqlService,
        @inject(ConfigService) configService: ConfigService,
    ) {
        this.mysqlService = mysqlService;
        this.configService = configService;
    }

    async useDatabase(databaseName: string) {
        try {
            await this.mysqlService.executeQuery('USE ' + databaseName);
        } catch (error) {
            console.log('error: ', error);
            process.exit(1);
        }
    }

    async initializeMysql() {
        try {
            console.log(chalk.blue('Connecting to database...'));
            await this.mysqlService.initialize();
        } catch (error) {
            console.log('Could not connect to database:', error);
            process.exit(1);
        }
    }

    async getTables(): Promise<Table[]> {
        const config = this.configService.getConfig();

        try {
            console.log(chalk.blue('Getting tables...'));
            const tablesResult: any[] = await this.mysqlService.executeQuery('SHOW TABLES') as any;

            const tables: Table[] = [];
            for (const tableResult of tablesResult) {
                const tName = tableResult['Tables_in_' + config.DatabaseName];
                tables.push(new Table(tName, await this.getColumns(tName)));
            }

            return tables;
        } catch (error) {
            console.log('error: ', error);
            process.exit(1);
        }
    }

    async getColumns(tableName: string): Promise<Column[]> {
        try {
            console.log(chalk.blue('Getting "' + tableName + '" columns...'));
            const columnsResult: any[] = await this.mysqlService.executeQuery('DESCRIBE ' + tableName) as any;

            const columns: Column[] = [];
            for (const columnResult of columnsResult) {
                columns.push(new Column(
                    columnResult.Field,
                    this.getTypescriptType(columnResult.Type),
                    columnResult.Null == 'YES',
                ));
            }
            return columns;
        } catch (error) {
            console.log('error: ', error);
            process.exit(1);
        }
    }

    getTypescriptType(type: string) {
        const types: any = DataTypesMap;
        let foundType = '';

        for (const key in types) {
            if (types.hasOwnProperty(key)) {
                const element = types[key];
                if (type.includes(key)) {
                    foundType = element;
                    break;
                }
            }
        }

        if (!foundType) {
            return 'any';
        } else {
            return foundType;
        }
    }
}
