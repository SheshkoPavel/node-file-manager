export const parseArguments = () => {
    const cleanProcessArgv = process.argv.slice(2);
    const args = Object.fromEntries(cleanProcessArgv.map(argument => {
        const [key, value] = argument.split('=');

        return [key, value]
    }));

    return args
}
