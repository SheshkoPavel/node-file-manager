import { EOL, cpus, userInfo, arch } from 'node:os';

import { ERROR_MESSAGE } from "../constants.js"
import {
    printCurrentDirectory,
} from "../utils/index.js";

const availableParameters = ['--EOL', '--cpus', '--homedir', '--username', '--architecture'];

export const osFunction = async ([parameter]) => {
    try {
        if (!availableParameters.includes(parameter)) throw new Error();

        if (parameter === '--EOL') {
            console.log(JSON.stringify(EOL));
        };
        if (parameter === '--cpus') {
            const cpusInformation = cpus().map(({model, speed}) => ({model, speed: `${speed / 1000}GHz`}));
            console.table(cpusInformation);
        };
        if (parameter === '--homedir') {
            const { homedir } = userInfo();
            console.log(homedir);
        };
        if (parameter === '--username') {
            const { username } = userInfo();
            console.log(username);
        };
        if (parameter === '--architecture') {
            console.log(arch());  // docs: The return value is equivalent to process.arch
        };

        printCurrentDirectory();
    } catch (err) {
        console.error(ERROR_MESSAGE);
    }
}
