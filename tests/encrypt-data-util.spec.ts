import encryptData from "../lib/utils/encrypt-data.util";

describe('encrypt-data', () => {
    it('should encrypt data', async () => {
        const data = { password: '1234', detail: { profile: { age: 21, name: 'Jane', password: 'abc' } } }
        const result = await encryptData(data, ['password'], 'my-secret');
        expect(result).toEqual({ "password": "04e53a90", "detail": { "profile": { "age": 21, "name": "Jane", "password": "54b56a" } } });
    });

    it('should encrypt data', async () => {
        const data = {
            password: '1234',
            detail: {
                profile: {
                    age: 21,
                    name: 'Jane',
                    password: 'abc'
                },
                info: [
                    { age: 21, name: 'Jane', password: 'abcPOI58' },
                    { age: 21, password: 'aOP9856Abc' }
                ]
            }
        };
        const result = await encryptData(data, ['password'], 'my-secret');
        expect(result).toEqual({
            "password": "04e53a90",
            "detail": {
                "profile": {
                    "age": 21,
                    "name": "Jane",
                    "password": "54b56a"
                },
                "info": [
                    { "age": 21, "name": 'Jane', "password": '54b56af470cbe648' },
                    { "age": 21, "password": '5498599d07b7e531de7e' }
                ]
            }
        });
    });
});
