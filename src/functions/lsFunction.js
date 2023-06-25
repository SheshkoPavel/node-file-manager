import { resolve, extname } from 'node:path'
import { readdir } from 'node:fs/promises'

export const  lsFunction = async () => {
    try{
        const currentDirectory = resolve(process.cwd());
        const files = await readdir(currentDirectory, { withFileTypes: true });

        const filesToTable = files.map(file => {
            if (file.isFile()) return {Name: file.name, Type: 'file'}
            if (file.isDirectory) return {Name: file.name, Type: 'directory'}
            return {Name: file.name, Type: 'unknown'}
        });

        const filesToTableSorted = filesToTable.sort((a, b) => {
            if (a.Type > b.Type) return 1
            if (a.Type < b.Type) return -1
            return 0
        });

        console.table(filesToTableSorted);
        console.log('You are currently in ', process.cwd());
    } catch (err) {
        console.error('Operation failed');
    }
}
