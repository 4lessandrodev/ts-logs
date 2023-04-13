import { statSync, readdirSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export const CronValidateExpirationFile = (days: number, dirname: string): void => {
    const files = readdirSync(dirname);

    files.forEach(file => {
        const filePath = join(dirname, file);
        const stats = statSync(filePath)
        const daysToDeleteLogs = Date.now() - stats.mtime.getTime() > days * ONE_DAY_IN_MS;

        if (daysToDeleteLogs) unlinkSync(filePath)
    })
}

export default {
    CronValidateExpirationFile
};