import { createCipheriv, scrypt } from 'node:crypto';

export const encryptStepValue = async (value: string, secret: string): Promise<string> => {
	const algorithm = 'aes-256-gcm';
	const iv = Buffer.alloc(16, 0);

	return new Promise((resolve, reject): void => {
		scrypt(secret, secret, 32, (err, key): void => {
			if (err) reject(err.message);
			const cipher = createCipheriv(algorithm, key, iv);
			let encrypted = cipher.update(value, 'utf8', 'hex');
			encrypted += cipher.final('hex');
			resolve(encrypted);
		});
	});
};

export default encryptStepValue;
