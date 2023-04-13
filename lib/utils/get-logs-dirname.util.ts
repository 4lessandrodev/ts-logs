import { resolve } from "node:path";
import GetFolderName from "./get-folder-name.util";

export const GetLogsDirname = (logName: string, path?: string): string => {
    const local = process.cwd();
    const folderName = GetFolderName(logName);
    const dir = path ? resolve(path) : resolve(local, 'logs', folderName);

    return dir;
}