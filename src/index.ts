#!/usr/bin/env node

import { validateConfig } from './tools/validators';
import { program } from 'commander';
import figlet = require('figlet');
import chalk = require('chalk');
import { generate } from './generator/generator';
import { GeneratorService } from './services/generator-service';
import { ConfigService } from './services/config-service';

program.on('--help', () => {
  console.log(
    chalk.blueBright(
      figlet.textSync('Mysql 2 TS', { horizontalLayout: 'full' })
    )
  );
});

program
  .version('1.0.0')
  .description('A handy tool to generate typescript models directly from mysql schema')
  .requiredOption('-h, --host <host>', 'database host address [required]')
  .requiredOption('-n, --dbname <dbname>', 'database name [required]')
  .requiredOption('-u, --dbuser <dbuser>', 'database username [required]')
  .requiredOption('-p, --dbpass <dbpass>', 'database password [required]')
  .requiredOption('-r, --dbport <dbport>', 'database port [required]')
  .requiredOption('-o, --output <output>', 'output directory [required]');

if (process.argv.length == 2) {
  console.log(
    chalk.blueBright(
      figlet.textSync('Mysql 2 TS', { horizontalLayout: 'full' })
    ),
    '\n'
  );
  console.log(program.helpInformation());
  process.exit(0);
}

program.parse(process.argv);

const conf = {
  DatabaseHost: program.host,
  DatabaseName: program.dbname,
  DatabasePassword: program.dbpass,
  DatabasePort: program.dbport,
  DatabaseUsername: program.dbuser,
};

validateConfig(conf);
generate(conf);
new GeneratorService(new ConfigService(conf));