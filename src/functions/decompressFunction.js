import { resolve, parse } from 'node:path'
import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises';
import { createBrotliDecompress } from 'node:zlib';

import { ERROR_MESSAGE } from "../constants.js"
import {
    isDirectory,
    isFile,
    isPathExist,
    printCurrentDirectory,
} from "../utils/index.js";

export const decompressFunction = async ([pathToFile, pathToNewDirectory]) => {
    try {
        if (!pathToFile || !pathToNewDirectory) throw new Error();

        const resolvedPathToFile = resolve(pathToFile);

        if (! await isPathExist(resolvedPathToFile)) throw new Error();

        const isPathToFileIsFile = await isFile(resolvedPathToFile);
        const isPathToNewDirectoryIsDirectory = await isDirectory(pathToNewDirectory);

        if (!isPathToFileIsFile || !isPathToNewDirectoryIsDirectory) throw new Error();

        const { name, ext } = parse(resolvedPathToFile);
        if (!ext.includes('.bz')) throw new Error();

        const resolvedPathToNewDirectory = resolve(pathToNewDirectory, name);

        const readableStream = createReadStream(resolvedPathToFile);
        const writeableStream = createWriteStream(resolvedPathToNewDirectory);
        const decompress =  createBrotliDecompress();


        await pipeline(readableStream, decompress, writeableStream);

        printCurrentDirectory();
    } catch (err) {
        console.error(ERROR_MESSAGE);
    }
}
