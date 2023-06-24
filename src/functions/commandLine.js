const availableOperations = ['up', 'cd', 'ls', 'cat', 'add', 'rn', 'cp', 'mv', 'rm', 'os', 'hash', 'compress', 'decompress', '.exit'];

export const commandLineFunction = (eventEmitter, line) => {
    console.log('eventEmitter, line <-------', {eventEmitter, line });

    try {
        line = line.trim();
        let [operation, ...args] = line.split(' ');

        if (!availableOperations.includes(operation)) {
            throw new Error('Invalid input');
        }

    } catch (err) {
        throw err;
    }
}
