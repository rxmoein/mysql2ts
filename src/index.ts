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

program.version('1.0.0');
program.description('A handy tool to generate typescript models from mysql schema');
program.requiredOption('-h, --host <host>', 'database host address')
program.requiredOption('-n, --dbname <dbname>', 'database name')
program.requiredOption('-p, --dbpass <dbpass>', 'database password')
program.requiredOption('-r, --dbport <dbport>', 'database port')
program.requiredOption('-o, --output <output>', 'output directory')

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