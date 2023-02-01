import { deleteObjectKey } from "../lib/utils";

describe('delete-object-key.util', () => {
    it('should delete key', () => {
        const obj = { card: { number: '1254545478745', cvv: 566, exp: 1020 }, name: 'user', email: 'test@mail.com' };
        const result = deleteObjectKey(obj, ['card', 'email']);
        expect(result).toEqual({ name: 'user' });
    });

    it('should do not delete', () => {
        const obj = { card: { number: '1254545478745', cvv: 566, exp: 1020 }, name: 'user', email: 'test@mail.com' };
        const result = deleteObjectKey(obj, []);
        expect(result).toEqual(obj);
    });

    it('should do not delete', () => {
        const obj = { card: { number: '1254545478745', cvv: 566, exp: 1020 }, name: 'user', email: 'test@mail.com' };
        const result = deleteObjectKey(obj, {} as any);
        expect(result).toEqual(obj);
    });
})