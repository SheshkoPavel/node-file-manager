import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { access } from 'node:fs/promises'

import path from 'node:path'
import readlinePromises from 'node:readline/promises'
import EventEmitter from 'node:events'
import { cpus, release, version, homedir } from 'node:os';
import { createReadStream, createWriteStream } from 'node:fs';
import { createHash } from 'node:crypto';

import { parseArguments } from './utils/index.js'
import { commandLineFunction } from './functions/commandLine.js'

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFile);

// console.log('homedir <-------', homedir());
// console.log('currentFile <-------', currentFile);
// console.log('currentDirectory <-------', currentDirectory);

// console.log('process.cwd() <-------', process.cwd());
process.chdir(homedir());
// console.log('process.cwd() <-------', process.cwd());

const args = parseArguments();
const userName = args['--username'] ? args['--username'] : 'Unknown person';

console.log(`Welcome to the File Manager, ${userName}`);
console.log('You are currently in ', process.cwd());

const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(Infinity);


const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

rl.on('line', commandLineFunction.bind(rl, eventEmitter))
  .on('SIGINT', () => rl.close())
  .on('close', () => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    process.nextTick(() => process.exit());
  })
