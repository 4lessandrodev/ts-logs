import { appendFile } from "node:fs/promises";
import { resolve } from "node:path";
import { Log } from "../core";
import EnsureLocalFolder from "./ensure-local-folder.util";
import GetFileName from "./get-file-name.util";
import { GetLogsDirname } from "./get-logs-dirname.util";

/**
 * @description Save logs locally.
 * @param log instance of Log with hydrated state.
 * @param path dir name to save log file.
 * @returns Promise<void>
 */
export const WriteDefaultLocal = async (log: Log, path?: string): Promise<void> => {
    const dir = GetLogsDirname(log.name, path);
    const fileName = GetFileName(log.createdAt);
    const exists = await EnsureLocalFolder(dir);
    if (!exists) return;
    const filePath = resolve(dir, fileName);
    await appendFile(filePath, JSON.stringify(log, null, 2) + '\n', 'utf8');
};

export default WriteDefaultLocal;
