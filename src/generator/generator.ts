import { connect, executeQuery } from '../tools/mysql';
import { createConnection, Connection } from 'mysql';
import { Configuration } from '../models/config';
import chalk = require('chalk');

let connection: Connection;

export async function generate(config: Configuration) {
    connection = createConnection({
        host: config.DatabaseHost,
        user: config.DatabaseUsername,
        password: config.DatabasePassword,
        port: +config.DatabasePort,
    })

    try {
        console.log(chalk.blue('Connecting to database...'));
        await connect(connection);
        console.log(chalk.blue('Connected!'));
    } catch (error) {
        console.log('Could not connect to database:', error);
        process.exit(1);
    }

    try {
        await executeQuery('USE ' + config.DatabaseName, connection);
    } catch (error) {
        console.log('error: ', error);
        process.exit(1);
    }

    let tablesResult: any[];
    try {
        console.log(chalk.blue('Getting tables...'));
        tablesResult = await executeQuery('SHOW TABLES', connection) as any;
    } catch (error) {
        console.log('error: ', error);
        process.exit(1);
    }

    for (const table of tablesResult) {

    }

    // try {
    //     await executeQuery('DESCRIBE ' + config.DatabaseName, connection);
    // } catch (error) {
    //     console.log('error: ', error);

    // }
}