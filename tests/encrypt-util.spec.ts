import decryptStepValue from "../lib/utils/decrypt.util";
import encryptString from "../lib/utils/encrypt-string.util";

describe("encrypt.util", () => {
    it('should encrypt to base64 with success', async () => {
        const data = JSON.stringify({ data: { test: 200 } });
        const result = await encryptString({ data, encrypt: true });
        expect(result).toBe('eyJkYXRhIjp7InRlc3QiOjIwMH19');
    });

    it('should encrypt return the same data', async () => {
        const data = JSON.stringify({ data: { test: 200 } });
        const result = await encryptString({ data });
        expect(result).toBe(data);
    });

    it('should encrypt to cypher with success', async () => {
        const data = JSON.stringify({ data: { test: 200 } });
        const result = await encryptString({ data, encrypt: true, encryptOption: { level: 'cypher' } });
        expect(result).toBe('38790cba4d7d2bd0668ff1b63594e237b082425576');
    });

    it('should encrypt to cypher with success', async () => {
        const data = JSON.stringify({ data: { test: 200 } });
        const result = await encryptString({ data, encrypt: true, encryptOption: { level: 'cypher', secretKey: 'my-secret-key' } });
        expect(result).toBe('b63f987987e4c7a5066757ab47e218cc61ff2ec4fc');
    });

    it('should encrypt to cypher with success', async () => {
        const data = JSON.stringify({ data: { test: 200 } });
        const result = await decryptStepValue('b63f987987e4c7a5066757ab47e218cc61ff2ec4fc', 'my-secret-key');
        expect(result).toEqual(data);
    });
});
