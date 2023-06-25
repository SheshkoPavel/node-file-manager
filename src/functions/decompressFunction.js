import { resolve, parse } from 'node:path'
import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises';
import { createBrotliDecompress } from 'node:zlib';

import { ERROR_MESSAGE } from "../constants.js"
import {
    isDirectory,
    isFile,
    isFileExist,
    printCurrentDirectory,
} from "../utils/index.js";

export const decompressFunction = async ([pathToFile, pathToNewDirectory]) => {
    try {
        console.log('1 <-------' );
        if (!pathToFile || !pathToNewDirectory) throw new Error();

        const resolvedPathToFile = resolve(pathToFile);

        console.log('2 <-------' );
        if (! await isFileExist(resolvedPathToFile)) throw new Error();
        console.log('3 <-------' );


        const isPathToFileIsFile = await isFile(resolvedPathToFile);
        const isPathToNewDirectoryIsDirectory = await isDirectory(pathToNewDirectory);

        console.log('4 <-------' );
        if (!isPathToFileIsFile || !isPathToNewDirectoryIsDirectory) throw new Error();
        console.log('5 <-------' );
        const { name, ext } = parse(resolvedPathToFile);
        if (!ext.includes('.bz')) throw new Error();

        const resolvedPathToNewDirectory = resolve(pathToNewDirectory, name);
        console.log('6 <-------' );

        const readableStream = createReadStream(resolvedPathToFile);
        const writeableStream = createWriteStream(resolvedPathToNewDirectory);
        const decompress =  createBrotliDecompress();
        console.log('7 <-------' );

        await pipeline(readableStream, decompress, writeableStream);

        printCurrentDirectory();
    } catch (err) {
        console.error(ERROR_MESSAGE);
    }
}
