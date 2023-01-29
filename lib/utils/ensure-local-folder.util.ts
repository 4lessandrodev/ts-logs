import { existsSync, mkdirSync } from "node:fs";

/**
 * @description Checks if the given path directory exists. If it does not exist, it creates the directory for the path informed recursively.
 * @param path dir to save log
 * @returns true if success and false if failure.
 */
export const EnsureLocalFolder = async (path: string): Promise<boolean> => {
    const existsDir = existsSync(path);
    if (!existsDir) {
        try {
            mkdirSync(path, { recursive: true });
        } catch (error) {
            return (false);
        }
    }
    return (existsDir);
}
export default EnsureLocalFolder;
