import maskAttribute from "../lib/utils/mask-attribute.util";

describe('mask-attribute', () => {
	it('should mask attribute with success', () => {
		const data = { CPF: '98192391891', PASSPORT: 'GR874234K' };
		const a = { key: 'CPF', nCharDisplay: 2 };
		const result = maskAttribute(a, data);
		expect(result).toEqual({ ...data, CPF: '*********91' });
	});

	it('should mask attribute with success', () => {
		const data = { CPF: '98192391891', PASSPORT: 'GR874234K' };
		const b = { key: 'PASSPORT', nCharDisplay: 4 };
		const result = maskAttribute(b, data);
		expect(result).toEqual({ ...data, PASSPORT: '*****234K' });
	});

	it('should mask attribute name with success', () => {
		const data = { NAME: 'JANE', PASSPORT: 'GR874234K' };
		const b = { key: 'NAME', nCharDisplay: 2 };
		const result = maskAttribute(b, data);
		expect(result).toEqual({ ...data, NAME: '**NE' });
	});

	it('should mask number attribute with success', () => {
		const data = { CPF: 98192391891, PASSPORT: 'GR874234K' };
		const b = { key: 'CPF', nCharDisplay: 3 };
		const result = maskAttribute(b, data);
		expect(result).toEqual({ ...data, CPF: '********891' });
	});

	it('should mask none attribute', () => {
		const data = { CPF: '98192391891', PASSPORT: 'GR874234K' };
		const b = { key: 'INVALID', nCharDisplay: 3 };
		const result = maskAttribute(b, data);
		expect(result).toEqual(data);
	});

	it('should mask name attribute with success', () => {
		const jane = { name: 'Jane', age: 21 };
		const peter = { name: 'Peter', age: 21 };
		const data = { CPF: '98192391891', PASSPORT: 'GR874234K', USERS: [peter, jane] };
		const b = { key: 'name', nCharDisplay: 3 };
		const result = maskAttribute(b, data);
		expect(result).toEqual({ ...data, USERS: [{ ...peter, name: '**ter' }, { ...jane, name: '*ane' }] });
	});
});
