import { resolve } from 'node:path'
import { rm } from 'node:fs/promises';

import { ERROR_MESSAGE } from "../constants.js"
import {
    isFile,
    isFileExist,
    printCurrentDirectory,
} from "../utils/index.js";

export const rmFunction = async ([pathToFile]) => {
    try {
        if (!pathToFile) throw new Error();

        const resolvedPathToFile = resolve(pathToFile);

        if (! await isFileExist(resolvedPathToFile)) throw new Error();

        const isPathToFileIsFile = await isFile(resolvedPathToFile);
        if (!isPathToFileIsFile) throw new Error();

        await rm(resolvedPathToFile);

        printCurrentDirectory();
    } catch (err) {
        console.error(ERROR_MESSAGE);
    }
}
