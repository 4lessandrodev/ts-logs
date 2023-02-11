import { GetFileName } from "../lib/utils/get-file-name.util";

describe('get-file-name.util', () => {
    it('should get file name with date', () => {
        const date = new Date(1699999999999);
        const result = GetFileName(date);
        expect(result).toBe('log-2023-11-14.log')
    });

    it('should get file name with date added 0', () => {
        const date = new Date(1678015050986);
        const result = GetFileName(date);
        expect(result).toBe('log-2023-03-05.log')
    });

    it('should get file name as current date', () => {
        const date = "invalid date"
        const result = GetFileName(date as any);
        const today = GetFileName(new Date());
        expect(result).toBe(today);
    });
});
