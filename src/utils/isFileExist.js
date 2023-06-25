import { access } from 'node:fs/promises'

export const isFileExist = async (path) => {
    try {
        await access(path);
        return true
    } catch (err) {
        return false
    }
}
