import { resolve } from 'node:path'
import { createReadStream } from 'node:fs';

import { ERROR_MESSAGE } from "../constants.js"
import { isPathExist, printCurrentDirectory } from "../utils/index.js";

export const catFunction = async ([path]) => {
    try {
        if (! await isPathExist(path)) throw new Error();

        const readableStream = createReadStream(`${resolve(path)}`, 'utf8');
        readableStream.on('data', (data) => {
            process.stdout.write(data);
        });
        readableStream.on('end', () => {
            printCurrentDirectory();
        });
        readableStream.on('error', () => {
            throw new Error();
        });

        printCurrentDirectory();
    } catch (err) {
        console.error(ERROR_MESSAGE);
    }
}
