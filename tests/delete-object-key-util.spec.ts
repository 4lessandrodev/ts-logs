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

    it('should do not delete if not provide array', () => {
        const obj = { card: { number: '1254545478745', cvv: 566, exp: 1020 }, name: 'user', email: 'test@mail.com' };
        const result = deleteObjectKey(obj, {} as any);
        expect(result).toEqual(obj);
    });

    it('should do not delete if provide array', () => {
        const obj = ["hello", "password", 200];
        const result = deleteObjectKey(obj, ["password"]);
        expect(result).toEqual(obj);
    });

    it('should not delete from array', () => {
        const obj = ["hello", { "password": 1234 }, 200];
        const result = deleteObjectKey(obj, ["password"]);
        expect(result).toEqual(["hello", {}, 200]);
    });

    it('should delete key on sub objects', () => {
        const date = new Date(206565060650);
        const obj = {
            password: "12345",
            user: "jane",
            createdAt: date,
            details: {
                password: "909012",
                age: 21,
                createdAt: date,
                profile: {
                    address: "street summer",
                    password: "abc1234",
                    data: null,
                    token: "SK90JDF752F656SDF56SDF6",
                    parents: [
                        { age: 21, type: "father", password: "12AFS", place: null },
                        { age: 52, type: "brother", password: "12222", createdAt: date },
                        "some place",
                        200,
                        null
                    ],
                    options: {},
                    access: { token: "I094236856" }
                }
            }
        }

        const result = deleteObjectKey(obj, ["password", "token"]);

        expect(result).toEqual({
            user: "jane",
            createdAt: date,
            details: {
                age: 21,
                createdAt: date,
                profile: {
                    address: "street summer",
                    data: null,
                    parents: [
                        { age: 21, type: "father", place: null },
                        { age: 52, type: "brother", createdAt: date },
                        "some place",
                        200,
                        null
                    ],
                    options: {},
                    access: {}
                }
            }
        })
    })
});
