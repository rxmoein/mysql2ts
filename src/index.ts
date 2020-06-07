#!/usr/bin/env node

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