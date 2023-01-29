import { GetFileName } from "../lib";

describe('get-file-name.util', () => {
    it('should get file name with date', () => {
        const date = new Date(1679415050986);
        const result = GetFileName(date);
        expect(result).toBe('log-2023-03-21.txt')
    });

    it('should get file name as current date', () => {
        const date = "invalid date"
        const result = GetFileName(date as any);
        const today = GetFileName(new Date());
        expect(result).toBe(today);
    });
});
