import { resolve } from 'node:path'
import { readFile } from 'node:fs/promises'
import { createHash } from 'node:crypto';

import { ERROR_MESSAGE } from "../constants.js"
import {
    isFile,
    isPathExist,
    printCurrentDirectory,
} from "../utils/index.js";

export const hashFunction = async ([pathToFile]) => {
    try {
        if (!pathToFile) throw new Error();

        const resolvedPathToFile = resolve(pathToFile);
        if (! await isPathExist(resolvedPathToFile)) throw new Error();

        const isPathToFileIsFile = await isFile(resolvedPathToFile);
        if (!isPathToFileIsFile) throw new Error();

        const fileContent = await readFile(resolvedPathToFile);
        const hash = createHash('sha256').update(fileContent).digest('hex');

        console.log(`File at path "${resolvedPathToFile}" has hash <-------`, hash);

        printCurrentDirectory();
    } catch (err) {
        console.error(ERROR_MESSAGE);
    }
}
