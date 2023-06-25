import { resolve } from 'node:path'
import { readdir } from 'node:fs/promises'

import { ERROR_MESSAGE } from '../constants.js';
import { printCurrentDirectory } from "../utils/index.js";

export const  lsFunction = async () => {
    try{
        const currentDirectory = resolve(process.cwd());
        const files = await readdir(currentDirectory, { withFileTypes: true });

        const filesToTable = files.map(file => {
            if (file.isFile()) return {Name: file.name, Type: 'file'}
            if (file.isDirectory()) return {Name: file.name, Type: 'directory'}
            return {Name: file.name, Type: 'unknown'}
        });

        const filesToTableSorted = filesToTable.sort((a, b) => {
            if (a.Type > b.Type) return 1
            if (a.Type < b.Type) return -1
            return 0
        });

        console.table(filesToTableSorted);
        printCurrentDirectory();
    } catch (err) {
        console.error(ERROR_MESSAGE);
    }
}
