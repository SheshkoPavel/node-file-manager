import { resolve, parse } from 'node:path'
import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises';
import { createBrotliCompress } from 'node:zlib';

import { ERROR_MESSAGE } from "../constants.js"
import {
    isDirectory,
    isFile,
    isFileExist,
    printCurrentDirectory,
} from "../utils/index.js";

export const compressFunction = async ([pathToFile, pathToNewDirectory]) => {
    try {
        if (!pathToFile || !pathToNewDirectory) throw new Error();

        const resolvedPathToFile = resolve(pathToFile);

        if (! await isFileExist(resolvedPathToFile)) throw new Error();

        const isPathToFileIsFile = await isFile(resolvedPathToFile);
        const isPathToNewDirectoryIsDirectory = await isDirectory(pathToNewDirectory);

        if (!isPathToFileIsFile || !isPathToNewDirectoryIsDirectory) throw new Error();

        const { base } = parse(resolvedPathToFile);
        const filenameWithExtension = `${base}.bz`
        const resolvedPathToNewDirectory = resolve(pathToNewDirectory, filenameWithExtension);

        const readableStream = createReadStream(resolvedPathToFile);
        const writeableStream = createWriteStream(resolvedPathToNewDirectory);
        const compress =  createBrotliCompress();

        await pipeline(readableStream, compress, writeableStream);

        printCurrentDirectory();
    } catch (err) {
        console.error(ERROR_MESSAGE);
    }
}
