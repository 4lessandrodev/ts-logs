import encryptString from "../lib/utils/encrypt-string.util"

describe("encrypt.util", () => {
    it('should encrypt to base64 with success', () => {
        const data = JSON.stringify({ data: { test: 200 }});
        const result = encryptString({ data, encrypt: true });
        expect(result).toBe('eyJkYXRhIjp7InRlc3QiOjIwMH19');
    });

    it('should encrypt return the same data', () => {
        const data = JSON.stringify({ data: { test: 200 }});
        const result = encryptString({ data });
        expect(result).toBe(data);
    });

    it('should encrypt to base64 with success cuz cypher is not implemented', () => {
        const data = JSON.stringify({ data: { test: 200 }});
        const result = encryptString({ data, encrypt: true, encryptOption: { level: 'cypher' } });
        expect(result).toBe('eyJkYXRhIjp7InRlc3QiOjIwMH19');
    });
});
