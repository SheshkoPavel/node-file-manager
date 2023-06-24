import { resolve } from 'node:path'
import { readdir } from 'node:fs/promises'

export const  lsFunction = async () => {
    try{
        const currentDirectory = resolve(process.cwd());
        const files = await readdir(currentDirectory);
        console.table(files);
        console.log('You are currently in ', process.cwd());
    } catch (err) {
        console.error('Operation failed');
    }
}
