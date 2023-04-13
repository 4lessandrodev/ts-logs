import { GetLogsDirname } from "../lib/utils/get-logs-dirname.util";
import { resolve } from "node:path";

describe('get logs dirname util', () => {
    it('should return the default dirname', () => {
        const logName = 'test';
        const dirname = GetLogsDirname(logName);
        const expected = resolve(process.cwd(), 'logs', 'test');
        expect(dirname).toBe(expected);
    });

    it('should return the dirname with custom path', () => {
        const logName = 'test';
        const path = process.cwd();
        const dirname = GetLogsDirname(logName, path);
        expect(dirname).toBe(path);
    });
});
