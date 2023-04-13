import { createCipheriv, scrypt } from 'node:crypto';

export const DecryptStepValue = (value: string, secret: string): Promise<string> => {
	const algorithm = 'aes-256-gcm';
	const iv = Buffer.alloc(16, 0);

	return new Promise((resolve, reject): void => {
		scrypt(secret, secret, 32, (err, key): void => {
			if (err) reject(err.message);
			const cipher = createCipheriv(algorithm, key, iv);
			let decrypted = cipher.update(value, 'hex', 'utf8');
			decrypted += cipher.final('utf8');
			resolve(decrypted);
		});
	});
};

export default DecryptStepValue;
