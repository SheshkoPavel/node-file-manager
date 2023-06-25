import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

import readlinePromises from 'node:readline/promises'
import EventEmitter from 'node:events'
import { cpus, release, version, homedir } from 'node:os';
import { createReadStream, createWriteStream } from 'node:fs';
import { createHash } from 'node:crypto';

import { parseArguments, printCurrentDirectory } from './utils/index.js'
import {
    commandLineFunction,
    lsFunction,
    cdFunction,
    upFunction,
    catFunction,
    addFunction,
    rnFunction,
    cpFunction,
 }  from './functions/index.js'

const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFile);

process.chdir(homedir());

const args = parseArguments();
const userName = args['--username'] ? args['--username'] : 'Unknown person';

console.log(`Welcome to the File Manager, ${userName}`);
printCurrentDirectory();

const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(Infinity);

eventEmitter
    .on('ls', lsFunction)
    .on('cd', cdFunction)
    .on('up', upFunction)
    .on('cat', catFunction)
    .on('add', addFunction)
    .on('rn', rnFunction)
    .on('cp', cpFunction)
//     .on('mv', mvFunction)
//     .on('rm', rmFunction)
//     .on('os', osFunction)
//     .on('hash', hashFunction)
//     .on('compress', compressFunction)
//     .on('decompress', decompressFunction);

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
