import { resolve, parse } from 'node:path'
import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises';

import { ERROR_MESSAGE } from "../constants.js"
import {
    isDirectory,
    isFile,
    isPathExist,
    printCurrentDirectory,
} from "../utils/index.js";

export const cpFunction = async ([pathToFile, pathToNewDirectory]) => {
    try {
        if (!pathToFile || !pathToNewDirectory) throw new Error();

        const resolvedPathToFile = resolve(pathToFile);

        if (! await isPathExist(resolvedPathToFile)) throw new Error();

        const isPathToFileIsFile = await isFile(resolvedPathToFile);
        const isPathToNewDirectoryIsDirectory = await isDirectory(pathToNewDirectory);

        if (!isPathToFileIsFile || !isPathToNewDirectoryIsDirectory) throw new Error();

        const { base } = parse(resolvedPathToFile);
        const resolvedPathToNewDirectory = resolve(pathToNewDirectory, base);

        const readableStream = createReadStream(resolvedPathToFile);
        const writeableStream = createWriteStream(resolvedPathToNewDirectory);

        await pipeline(readableStream, writeableStream);

        printCurrentDirectory();
    } catch (err) {
        console.error(ERROR_MESSAGE);
    }
}
