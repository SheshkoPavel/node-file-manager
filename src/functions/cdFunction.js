import { ERROR_MESSAGE } from "../constants.js";
import { printCurrentDirectory } from "../utils/index.js";

export const cdFunction = async ([path]) => {
    try {
        process.chdir(path);
        printCurrentDirectory();
    } catch (err) {
        console.error(ERROR_MESSAGE);
    }
}
