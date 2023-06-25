import { writeFile } from 'node:fs/promises'
import { sep } from 'node:path'

import { ERROR_MESSAGE } from "../constants.js"
import { isFileExist, printCurrentDirectory } from "../utils/index.js";

export const addFunction = async ([path]) => {
    try {
        if (!path) throw new Error();
        if (await isFileExist(path)) throw new Error();
        await writeFile(`${process.cwd()}${sep}${path}`, '', {flag: 'wx'});

        printCurrentDirectory();
    } catch (err) {
        console.error(ERROR_MESSAGE);
    }
}
