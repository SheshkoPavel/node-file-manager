const availableOperations = ['up', 'cd', 'ls', 'cat', 'add', 'rn', 'cp', 'mv', 'rm', 'os', 'hash', 'compress', 'decompress', '.exit'];
const withArgsOperations = ['cd', 'cat', 'add', 'rm', 'os', 'hash', 'rn', 'cp', 'mv', 'compress', 'decompress'];

export function commandLineFunction (eventEmitter, line) {
    try {
        line = line.trim();
        let [operation, ...args] = line.split(' ');
        console.log('operation <-------', operation);

        if (!availableOperations.includes(operation)) {
            throw new Error('Invalid input');
        }
        if (withArgsOperations.includes(operation)) {
            eventEmitter.emit(operation, args);
        }
        if (['up', 'ls'].includes(operation)) {
            eventEmitter.emit(operation);
        }
        if (operation === '.exit') {
            this.close()
        }

    } catch (err) {
        console.error(err.message);
    }
}
