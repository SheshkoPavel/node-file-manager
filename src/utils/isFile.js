import { stat } from 'node:fs/promises'

export const isFile = async (path) => {
    const stats = await stat(path);

    return stats.isFile()
}
