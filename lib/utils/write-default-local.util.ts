import { appendFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Log } from "../core";
import EnsureLocalFolder from "./ensure-local-folder.util";
import GetFolderName from "./get-folder-name.util";
import GetFileName from "./get-file-name.util";

/**
 * @description Save logs locally.
 * @param log instance of Log with hydrated state.
 * @param path dir name to save log file.
 * @returns Promise<void>
 */
export const WriteDefaultLocal = async (log: Log, path?: string): Promise<void> => {
    const local = process.cwd();
    const folderName = GetFolderName(log.name);
    const fileName = GetFileName(log.createdAt);
    const dir = path ? resolve(path) : resolve(local, 'logs', folderName);
    const exists = await EnsureLocalFolder(dir);
    if(!exists) return;
    const filePath = resolve(dir, fileName);
    await appendFile(filePath, JSON.stringify(log) + '\n', 'utf8');
};

export default WriteDefaultLocal;
