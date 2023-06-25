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
        })

        console.table(filesToTable);
        console.log('You are currently in ', process.cwd());
    } catch (err) {
        console.error('Operation failed');
    }
}
