import { Connection } from "mysql";

export function connect(connection: Connection) {
    return new Promise((resolve, reject) => {
        connection.connect((err) => {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}

export function executeQuery(sql: string, connection: Connection) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        })
    });
}