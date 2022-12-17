#!/usr/bin/env node
const chalk = require('chalk');
const assert = require('assert');
const { join } = require('path');
const { existsSync } = require('fs');
const { sync } = require('cross-spawn');
const argv = process.argv.slice(2);
const [name, ...throughArgs] = argv;

const scriptsPath = join(__dirname, `../${name}.ts`);

assert(
  existsSync(scriptsPath) && !name.startsWith('.'),
  `Executed script '${chalk.red(name)}' does not exist`,
);

console.log(chalk.cyan(`[data-father-scripts]: current run ${name}\n`));

const scriptPathAsStr = JSON.stringify(scriptsPath);
const spawn = sync('tsx', [scriptPathAsStr, ...throughArgs], {
  env: process.env,
  cwd: process.cwd(),
  stdio: 'inherit',
  shell: true,
});
if (spawn.status !== 0) {
  console.log(chalk.red(`[data-father-scripts]: ${name} execute fail`));
  process.exit(1);
}
