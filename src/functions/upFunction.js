import { homedir } from 'node:os';

import { ERROR_MESSAGE } from "../constants.js"
import { printCurrentDirectory } from "../utils/index.js";

export const upFunction = async () => {
    try {
        if (process.cwd() === homedir()) return printCurrentDirectory();
        else {
            process.chdir('..');
            printCurrentDirectory();
        }
    } catch (err) {
        console.error(ERROR_MESSAGE);
    }
}
