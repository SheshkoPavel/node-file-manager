import { dirname, resolve, sep } from 'node:path'
import { rename } from 'node:fs/promises'

import { ERROR_MESSAGE } from "../constants.js"
import { isFileExist, printCurrentDirectory } from "../utils/index.js";

export const rnFunction = async ([rawPathToFile, newFilename]) => {
    try {
        if (!rawPathToFile || !newFilename) throw new Error();

        const resolvedPath = resolve(rawPathToFile);
        if (! await isFileExist(resolvedPath)) throw new Error();

        const __dirname = dirname(resolvedPath);

        await rename(`${resolvedPath}`, `${__dirname}${sep}${newFilename}`);

        printCurrentDirectory();
    } catch (err) {
        console.error(ERROR_MESSAGE);
    }
}
