import decryptStepValue from "../lib/utils/decrypt.util";
import encryptStepValue from "../lib/utils/encrypt.util";

describe('encryption', () => {
	const data = { user: 'Jane', age: 21 };
	const key = 'Lorem-key';
	let encrypted = '';
	let decrypted = '';

	it('should encrypt data with success', async () => {
		encrypted = await encryptStepValue(JSON.stringify(data), key);
		expect(encrypted).toBe('ebc025107829200354cbfd37d2377c24272c6c8d9e5d6877');
	});

	it('should decrypt data with success', async () => {
		decrypted = await decryptStepValue(encrypted, key);
		expect(JSON.parse(decrypted)).toEqual(data);
	});

	it('should encrypt data with long key with success', async () => {
		encrypted = await encryptStepValue(JSON.stringify(data), key.repeat(30));
		expect(encrypted).toBe('4f404b338ef1344ec813ddfee3cc849ca5cf6b17fe3099ed');
	});

	it('should decrypt data with long key with success', async () => {
		decrypted = await decryptStepValue(encrypted, key.repeat(30));
		expect(JSON.parse(decrypted)).toEqual(data);
	});
});
