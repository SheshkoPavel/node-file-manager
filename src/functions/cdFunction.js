export const cdFunction = async ([path]) => {
    try {
        process.chdir(path);
        console.log('You are currently in ', process.cwd());
    } catch (e) {
        console.error(e);
    }
}
