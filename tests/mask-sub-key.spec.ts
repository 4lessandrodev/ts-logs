import MaskSubObjectKey from "../lib/utils/mask-sub-key.util";

describe('mask-sub-key', () => {
	it('should mask sub key with success', () => {
		const path = 'a.b.c';
		const obj = { a: { b: { c: 'hey there' } }, other: 21 }
		const callback = (val: string): string => val + ', you ok?';
		const result = MaskSubObjectKey(path, obj, callback);

		const target = { ...obj, a: { b: { c: 'hey there, you ok?' } } };

		expect(result).toEqual(target);
	});

	it('should mask sub key if number with success', () => {
		const path = 'a.b.c';
		const obj = { a: { b: { c: 200 } }, other: 21 }
		const callback = (val: string): string => val + '300';
		const result = MaskSubObjectKey(path, obj, callback);

		const target = { ...obj, a: { b: { c: '200300' } } };

		expect(result).toEqual(target);
	});

	it('should return the same object if key is not a path', () => {
		const path = 'a';
		const obj = { a: { b: { c: 'hey there' } }, other: 21 }
		const callback = (val: string): string => val + ', you ok?';
		const result = MaskSubObjectKey(path, obj, callback);

		expect(result).toEqual(obj);
	});

	it('should return the same object if value is Date', () => {
		const path = 'a.b.c';
		const obj = { a: { b: { c: new Date() } }, other: 21 }
		const callback = (val: string): string => val + 'new value';
		const result = MaskSubObjectKey(path, obj, callback);

		expect(result).toEqual(obj);
	});

	it('should return the same object if callback is not a function', () => {
		const path = 'a.b.c';
		const obj = { a: { b: { c: 'hey' } }, other: 21 }
		const callback = {} as any;
		const result = MaskSubObjectKey(path, obj, callback);

		expect(result).toEqual(obj);
	});

	it('should return the same object if arg is not object', () => {
		const path = 'a.b.c';
		const obj = 'not-object';
		const callback = (val: string): string => val + 'new value';
		const result = MaskSubObjectKey(path, obj, callback);

		expect(result).toEqual(obj);
	});
});
