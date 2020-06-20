## Mysql 2 TS
Using this command line tool you can generate customized models / interfaces directly from a mysql schema.

## Installation
Install this tool globally using npm:
```
sudo npm install mysql2ts -g
```

## Example Usage
To generate all typescript models from a mysql database, simply run this command:
```
mysql2ts -h 127.0.0.1 -u root -n Databsename -p 'pass' -r 3306 -o output -m advanced -c camelCase
```

## Options

|  Name  | Usage |
|---|---|
| Program Version  | `--version` Or `-V`  |
| Database Host Address  | `--host` Or `-h`  |
| Database Name | `--dbname` Or `-n` |
| Database User | `--dbuser` Or `-u` |
| Database Pass | `--dbpass` Or `-p` |
| Database Port | `--dbport` Or `-r` |
| Output Directory | `--output` Or `-o` |
| Mode | `--mode` Or `m` |
| Naming Convention | `--namingConvention` Or `-c` |