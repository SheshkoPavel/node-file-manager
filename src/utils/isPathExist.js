import { access } from 'node:fs/promises'

export const isPathExist = async (path) => {
    try {
        await access(path);
        return true
    } catch (err) {
        return false
    }
}
