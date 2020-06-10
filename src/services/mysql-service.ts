import { Connection, createConnection } from 'mysql';
import { ConfigService } from './config-service';
import { injectable, inject } from 'inversify';

@injectable()
export class MysqlService {
    protected configService: ConfigService;
    connection: Connection = {} as any;

    constructor(
        @inject(ConfigService) configService: ConfigService,
    ) {
        this.configService = configService;
    }

    initialize() {
        const config = this.configService.getConfig();
        this.connection = createConnection({
            host: config.DatabaseHost,
            user: config.DatabaseUsername,
            password: config.DatabasePassword,
            port: +config.DatabasePort,
        })

        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) {
                    return reject(err);
                }
                return resolve();
            });
        });
    }

    executeQuery(sql: string) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            })
        });
    }
}