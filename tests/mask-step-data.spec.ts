import MaskData from "../lib/utils/mask-step-data.util";

describe('mask-step-data', () => {
	it('should return empty object', () => {
		const result = MaskData({}, []);
		expect(result).toEqual({});
	});

	it('should return users with hidden pass', () => {
		const data = [
			{ user: { pass: 12345678, name: 'jane' } },
			{ user: { pass: '87654321', name: 'john' } }
		];
		const result = MaskData(data, [{ key: 'user.pass', nCharDisplay: 2 }]);
		expect(result).toEqual([
			{ "user": { "name": "jane", "pass": "******78" } },
			{ "user": { "name": "john", "pass": "******21" } }
		]);
	});

	it('should return users with hidden pass and hidden card', () => {
		const data = [
			{ user: { pass: 12345678, name: 'jane' }, card: '897346786423' },
			{ user: { pass: '87654321', name: 'john' }, card: '897346789999' }
		];
		const result = MaskData(data, [
			{ key: 'user.pass', nCharDisplay: 2 },
			{ key: 'card', nCharDisplay: 2 }
		]);
		expect(result).toEqual([
			{ user: { pass: '******78', name: 'jane' }, card: '**********23' },
			{ user: { pass: '******21', name: 'john' }, card: '**********99' }
		]);
	});

	it('should mask object pass attribute', () => {
		const data = { user: { pass: 12345678, name: 'jane' } };
		const result = MaskData(data, [{ key: 'user.pass', nCharDisplay: 2 }]);
		expect(result).toEqual({ "user": { "name": "jane", "pass": "******78" } });
	});

	it('should mask object pass attribute', () => {
		const data = { user: { pass: '12345678', name: 'jane' } };
		const result = MaskData(data, [{ key: 'user.pass', nCharDisplay: 2 }]);
		expect(result).toEqual({ "user": { "name": "jane", "pass": "******78" } });
	});

	it('should mask object pass and name attributes', () => {
		const data = { user: { pass: '12345678', name: 'jane' } };
		const result = MaskData(data, [
			{ key: 'user.pass', nCharDisplay: 2 },
			{ key: 'user.name', nCharDisplay: 2 }
		]);
		expect(result).toEqual({ "user": { "name": "**ne", "pass": "******78" } });
	});

	it('should mask object pass and name attributes', () => {
		const data = { user: { pass: '12345678', name: 'jane' } };
		const result = MaskData(data, [
			{ key: 'pass', nCharDisplay: 2 },
			{ key: 'name', nCharDisplay: 2 }
		]);
		expect(result).toEqual({ "user": { "name": "**ne", "pass": "******78" } });
	});
});
