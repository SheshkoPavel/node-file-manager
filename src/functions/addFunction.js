import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { ERROR_MESSAGE } from "../constants.js"
import { isPathExist, printCurrentDirectory } from "../utils/index.js";

export const addFunction = async ([path]) => {
    try {
        if (!path) throw new Error();
        if (await isPathExist(resolve(path))) throw new Error();
        await writeFile(`${resolve(path)}`, '', {flag: 'wx'});

        printCurrentDirectory();
    } catch (err) {
        console.error(ERROR_MESSAGE);
    }
}
