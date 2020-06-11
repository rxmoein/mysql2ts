#!/usr/bin/env node

import { GeneratorService } from './services/generator-service';
import { Configuration } from './models/config';
import DIContainer from './core/di-container';
import { program } from 'commander';
import figlet = require('figlet');
import chalk = require('chalk');

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
  .requiredOption('-o, --output <output>', 'output directory [required]')
  .requiredOption('-m, --mode <mode>', 'output mode [required], options: basic | advanced');

if (process.argv.length === 2) {
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

const conf: Configuration = {
  DatabaseHost: program.host,
  DatabaseName: program.dbname,
  DatabasePassword: program.dbpass,
  DatabasePort: program.dbport,
  DatabaseUsername: program.dbuser,
  OutputDirectory: program.output,
  Mode: program.mode,
};

const generator: GeneratorService = DIContainer.resolve<GeneratorService>(GeneratorService);

generator.validatorService.validateConfig(conf);
generator.configService.setConfig(conf);
generator.generate();