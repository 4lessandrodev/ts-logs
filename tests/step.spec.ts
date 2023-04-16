import { SProps } from "../lib/types";
import { Step } from "../lib/core";

describe('step', () => {
    it('should create a step with success', () => {
        const keys: Array<keyof SProps> = [
            "name",
            "tags",
            "url",
            "stack",
            "data",
            "statusCode",
            "message",
            "type",
            "method",
            "createdAt",
            "uid",
            "additionalInfo",
            "category"
        ];
        const step = Step.create({});
        expect.assertions(keys.length + 1);
        expect(Object.keys(step)).toEqual(keys);
        let i = 0;
        while (keys[i]) {
            expect(step[keys[i]]).toBeDefined();
            i++;
        }
    });

    it('should execute addTag', () => {
        const step = Step.create({});
        const result = step.addTag('testing');
        expect(result.tags).toHaveLength(1);
    });
    it('should execute addTags', () => {
        const step = Step.create({});
        const result = step.addTags(['1', '2']);
        expect(result.tags).toHaveLength(2);
    });
    it('should execute setName', () => {
        const step = Step.create({});
        const result = step.setName("changed");
        expect(result.name).toBe('changed');
    });
    it('should execute setMethod', () => {
        const step = Step.create({});
        const result = step.setMethod('GET');
        expect(result.method).toBe('GET');
    });
    it('should execute setStack', () => {
        const step = Step.create({});
        const result = step.setStack('internal server error line 10');
        expect(result.stack).toBe('internal server error line 10');
    });
    it('should execute setMessage', () => {
        const step = Step.create({});
        const result = step.setMessage('Timeout');
        expect(result.message).toBe('Timeout');
    });
    it('should execute setStatusCode', () => {
        const step = Step.create({});
        const result = step.setStatusCode(401);
        expect(result.statusCode).toBe(401);
    });
    it('should execute setData', () => {
        const step = Step.create({});
        const result = step.setData('{ "email": "sample@mail.com" }');
        expect(result.data).toBe('{ "email": "sample@mail.com" }');
    });
    it('should execute setUid', () => {
        const step = Step.create({});
        const result = step.setUid('000001');
        expect(result.uid).toBe('000001');
    });
    it('should execute setURL', () => {
        const step = Step.create({});
        const result = step.setURL('https://test.com.br');
        expect(result.url).toBe('https://test.com.br');
    });
    it('should create a step from error', () => {
        class ErrorUseCase {
            create(): Error {
                return new Error("simple error execution");
            }
        }

        const instance = new ErrorUseCase();
        const err = instance.create();
        expect(err).toBeInstanceOf(Error);

        const step = Step.catch(err);
        expect(step).toBeDefined();
    });

    it('should generate full log from axios', () => {

        class Testing {
            execute() {
                const axiosErr = { "message": "Request failed with status code 404", "name": "AxiosError", "stack": "AxiosError: Request failed with status code 404\n    at settle (/home/alessandro/Workspace/logs-app/node_modules/axios/dist/node/axios.cjs:1896:12)\n    at BrotliDecompress.handleStreamEnd (/home/alessandro/Workspace/logs-app/node_modules/axios/dist/node/axios.cjs:2940:11)\n    at BrotliDecompress.emit (node:events:525:35)\n    at endReadableNT (node:internal/streams/readable:1359:12)\n    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)", "config": { "transitional": { "silentJSONParsing": true, "forcedJSONParsing": true, "clarifyTimeoutError": false }, "adapter": ["xhr", "http"], "transformRequest": [null], "transformResponse": [null], "timeout": 0, "xsrfCookieName": "XSRF-TOKEN", "xsrfHeaderName": "X-XSRF-TOKEN", "maxContentLength": -1, "maxBodyLength": -1, "env": {}, "headers": { "Accept": "application/json, text/plain, */*", "Content-Type": "application/json", "User-Agent": "axios/1.3.2", "Content-Length": "47", "Accept-Encoding": "gzip, compress, deflate, br", "uid": "508791f9-9063-463d-a54b-cb6a777870af" }, "method": "post", "url": "https://postback-4dev.onrender.com/inv/not-found", "data": "{\"email\":\"test@domain.com\",\"password\":\"123456\"}" }, "code": "ERR_BAD_REQUEST", "status": 404 };
                const result = Step.catch(axiosErr);
                return result;
            }
        }

        const instance = new Testing();
        const result = instance.execute();

        expect(result).toEqual({
            "additionalInfo": null,
            "category": "catch",
            "createdAt": expect.any(Date),
            "data": {
                "requestData": {
                    "email": "test@domain.com",
                    "password": "123456"
                },
                "responseData": {}
            },
            "message": "Request failed with status code 404",
            "method": "POST",
            "name": "Object",
            "stack": `AxiosError: Request failed with status code 404
    at settle (/home/alessandro/Workspace/logs-app/node_modules/axios/dist/node/axios.cjs:1896:12)
    at BrotliDecompress.handleStreamEnd (/home/alessandro/Workspace/logs-app/node_modules/axios/dist/node/axios.cjs:2940:11)
    at BrotliDecompress.emit (node:events:525:35)
    at endReadableNT (node:internal/streams/readable:1359:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)`,
            "statusCode": 500,
            "tags": [
                "email",
                "password",
            ],
            "type": "fatal",
            "uid": "508791f9-9063-463d-a54b-cb6a777870af",
            "url": "https://postback-4dev.onrender.com/inv/not-found",
        });

        expect(result).toMatchSnapshot({ createdAt: expect.any(Date) });

    });

    it('should generate full log from axios and remove password', () => {

        class Testing {
            execute() {
                const axiosErr = { "message": "Request failed with status code 404", "name": "AxiosError", "stack": "AxiosError: Request failed with status code 404\n    at settle (/home/alessandro/Workspace/logs-app/node_modules/axios/dist/node/axios.cjs:1896:12)\n    at BrotliDecompress.handleStreamEnd (/home/alessandro/Workspace/logs-app/node_modules/axios/dist/node/axios.cjs:2940:11)\n    at BrotliDecompress.emit (node:events:525:35)\n    at endReadableNT (node:internal/streams/readable:1359:12)\n    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)", "config": { "transitional": { "silentJSONParsing": true, "forcedJSONParsing": true, "clarifyTimeoutError": false }, "adapter": ["xhr", "http"], "transformRequest": [null], "transformResponse": [null], "timeout": 0, "xsrfCookieName": "XSRF-TOKEN", "xsrfHeaderName": "X-XSRF-TOKEN", "maxContentLength": -1, "maxBodyLength": -1, "env": {}, "headers": { "Accept": "application/json, text/plain, */*", "Content-Type": "application/json", "User-Agent": "axios/1.3.2", "Content-Length": "47", "Accept-Encoding": "gzip, compress, deflate, br", "uid": "508791f9-9063-463d-a54b-cb6a777870af" }, "method": "post", "url": "https://postback-4dev.onrender.com/inv/not-found", "data": "{\"email\":\"test@domain.com\",\"password\":\"123456\"}" }, "code": "ERR_BAD_REQUEST", "status": 404 };
                const result = Step.catch(axiosErr, { remove: ['password'] });
                return result;
            }
        }

        const instance = new Testing();
        const result = instance.execute();

        expect(result).toEqual({
            "additionalInfo": null,
            "category": "catch",
            "createdAt": expect.any(Date),
            "data": {
                "requestData": {
                    "email": "test@domain.com"
                },
                "responseData": {}
            },
            "message": "Request failed with status code 404",
            "method": "POST",
            "name": "Object",
            "stack": `AxiosError: Request failed with status code 404
    at settle (/home/alessandro/Workspace/logs-app/node_modules/axios/dist/node/axios.cjs:1896:12)
    at BrotliDecompress.handleStreamEnd (/home/alessandro/Workspace/logs-app/node_modules/axios/dist/node/axios.cjs:2940:11)
    at BrotliDecompress.emit (node:events:525:35)
    at endReadableNT (node:internal/streams/readable:1359:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:82:21)`,
            "statusCode": 500,
            "tags": [
                "email"
            ],
            "type": "fatal",
            "uid": "508791f9-9063-463d-a54b-cb6a777870af",
            "url": "https://postback-4dev.onrender.com/inv/not-found"
        });
        expect(result).toMatchSnapshot({ createdAt: expect.any(Date) });
    });

    it('should create step using data id as uid', () => {
        const param = { uid: 'my-custom-request-id', name: 'teste' } as Partial<SProps>;
        const step = Step.create(param);
        expect(step.uid).toBe('my-custom-request-id');
    });

    it('should return empty object if do not provide data in param', () => {
        const param = { uid: 'my-custom-request-id', name: 'teste' } as Partial<SProps>;
        const step = Step.create(param);
        expect(step.data).toEqual({});

        const updated = step.remove(['card']);
        expect(updated.data).toBe('{}');
        expect(step.uid).toBe('my-custom-request-id');
    });

    it('should remove existing card in data', () => {
        const data = JSON.stringify({ card: { n: '2000' }, name: 'Alex', id: "other-id" });
        const param = { uid: 'my-custom-request-id', name: 'teste', data } as Partial<SProps>;
        const step = Step.create(param);

        expect(step.data).toBe(data);
        const updated = step.remove(['card']);
        expect(updated.data).toEqual(JSON.stringify({ name: 'Alex', id: "other-id" }));
        expect(step.uid).toBe('my-custom-request-id');
    });

    it('should use id in data as uid if do not provide uid param', () => {
        const data = JSON.stringify({ card: { n: '2000' }, name: 'Alex', id: "other-id" });
        const param = { name: 'teste', data } as Partial<SProps>;
        const step = Step.create(param);

        expect(step.data).toBe(data);
        const updated = step.remove(['card']);
        expect(updated.data).toEqual(JSON.stringify({ name: 'Alex', id: "other-id" }));
        expect(step.uid).toBe('other-id');
    });

    it('should create a step without additional info', () => {
        const step = Step.create({ name: 'test' });
        expect(step.additionalInfo).toBeNull();
    });

    it('should create a step with additional info', () => {
        const step = Step.create({ name: 'test', additionalInfo: 'hello world' });
        expect(step.additionalInfo).toBe('hello world');
    });

    it('should encrypt password', async () => {
        const data = JSON.stringify({ password: '123456', name: 'Jane' });
        const step = await Step.error({ name: 'Example', message: 'Encrypt test', data, uid: 'my-uuid' }).encrypt({
            attributes: ['password'],
            secretKey: 'My-secret-key'
        });

        expect(step.data).toEqual("{\"password\":\"fb49e66ef647\",\"name\":\"Jane\"}");
    });

    it('should encrypt card object', async () => {
        const data = JSON.stringify({ age: 23, name: 'Jane', card: { numb: 21312312343, cvv: 343 } });
        const step = await Step.error({ name: 'Example', message: 'Encrypt test', data, uid: 'my-uuid' }).encrypt({
            attributes: ['card'],
            secretKey: 'My-secret-key'
        });

        expect(step.data).toEqual("{\"age\":23,\"name\":\"Jane\",\"card\":\"b159bb2fae13b16a0007b09007b8093806f410261ceba9449534b2720f49\"}");
    });

    it('should ignore if attribute does not exists', async () => {
        const data = JSON.stringify({ age: 23, name: 'Jane' });
        const step = await Step.error({ name: 'Example', message: 'Encrypt test', data, uid: 'my-uuid' }).encrypt({
            attributes: ['card'],
            secretKey: 'My-secret-key'
        });

        expect(step.data).toEqual("{\"age\":23,\"name\":\"Jane\"}");
    });

    it('should decrypt card object', async () => {
        const objData = { age: 23, name: 'Jane', card: 'b159bb2fae13b16a0007b09007b8093806f410261ceba9449534b2720f49' };
        const data = JSON.stringify(objData);
        const step = await Step.error({ name: 'Example', message: 'Encrypt test', data, uid: 'my-uuid' }).decrypt({
            attributes: ['card'],
            secretKey: 'My-secret-key'
        });

        expect(step.data).toEqual({ ...objData, card: { numb: 21312312343, cvv: 343 } });
    });

    it('should decrypt password', async () => {
        const data = JSON.stringify({ password: 'fb49e66ef647', name: 'Jane' });
        const step = await Step.error({ name: 'Example', message: 'Encrypt test', data, uid: 'my-uuid' }).decrypt({
            attributes: ['password'],
            secretKey: 'My-secret-key'
        });

        expect(step.data).toEqual({ "password": 123456, "name": "Jane" });
    });

    it('should get tags from data', () => {
        const data = JSON.stringify({ card: { n: '2000' }, name: 'Alex', id: "other-id" });
        const param = { name: 'teste', data } as Partial<SProps>;
        const step = Step.create(param);
        const tags = step.tags;
        expect(tags).toEqual(['card', 'name', 'id']);
    })

    it('should get empty tags if data is array', () => {
        const data = JSON.stringify([1, 2, 3]);
        const param = { name: 'teste', data } as Partial<SProps>;
        const step = Step.create(param);
        const tags = step.tags;
        expect(tags).toEqual([]);
    })

    it('should get only 5 tags from data', () => {
        const data = JSON.stringify({ item: "Test", name: 'Alex', id: "val", age: 21, time: 22, result: 200 });
        const param = { name: 'teste', data } as Partial<SProps>;
        const step = Step.create(param);
        const tags = step.tags;
        expect(tags).toEqual(['item', 'name', 'id', 'age', 'time']);
    })

    it('should get empty tags if provide value', () => {
        const data = JSON.stringify({ item: "Test", name: 'Alex', id: "val", age: 21, time: 22, result: 200 });
        const param = { name: 'teste', data, tags: [] } as Partial<SProps>;
        const step = Step.create(param);
        const tags = step.tags;
        expect(tags).toEqual([]);
    })

    it('should get original tags if provide value', () => {
        const data = JSON.stringify({ item: "Test", name: 'Alex', id: "val", age: 21, time: 22, result: 200 });
        const param = { name: 'teste', data, tags: ['payment'] } as Partial<SProps>;
        const step = Step.create(param);
        const tags = step.tags;
        expect(tags).toEqual(['payment']);
    })

    it('should create data as string if provide string', () => {
        const step = Step.error({
            message: 'some message',
            name: 'some name',
            data: 'data as string'
        });

        expect(step.data).toBe('data as string');
    });

    it('should create data as object if provide object', () => {
        const step = Step.error({
            message: 'some message',
            name: 'some name',
            data: { echo: 'data' }
        });

        expect(step.data).toEqual({ echo: 'data' });
    });

    it('should create data as string if provide string and encrypt and decrypt with success', async () => {
        const step = Step.error({
            message: 'some message',
            name: 'some name',
            data: 'data as string'
        });

        expect(step.data).toBe('data as string');
        const encrypted = await step.encrypt({ attributes: [], secretKey: 'my-secret' });
        expect(encrypted.data).toBe('51b67dc51fe3a050cf69c5b86ee7');
        const decrypted = await encrypted.decrypt({ attributes: [], secretKey: 'my-secret' });
        expect(decrypted.data).toBe('data as string');
    });

    it('should create data as serialized string and encrypt and decrypt with success', async () => {
        const step = Step.error({
            message: 'some message',
            name: 'some name',
            data: JSON.stringify({ name: 'Jane' })
        });

        expect(step.data).toBe(JSON.stringify({ name: 'Jane' }));
        const encrypted = await step.encrypt({ attributes: ['name'], secretKey: 'my-secret' });
        expect(encrypted.data).toBe("{\"name\":\"7fb667c1\"}");
        const decrypted = await encrypted.decrypt({ attributes: ['name'], secretKey: 'my-secret' });
        expect(decrypted.data).toEqual({ "name": "Jane" });
    });

    it('should create data as object if provide object encrypt and decrypt', async () => {
        const step = Step.error({
            message: 'some message',
            name: 'some name',
            data: { echo: 'data' }
        });

        expect(step.data).toEqual({ echo: 'data' });
        const encrypted = await step.encrypt({ attributes: ['echo'], secretKey: 'my-secret' });
        expect(encrypted.data).toEqual("{\"echo\":\"51b67dc5\"}");
        const decrypted = await encrypted.decrypt({ attributes: ['echo'], secretKey: 'my-secret' });
        expect(decrypted.data).toEqual({ echo: 'data' });
    });

    it('should add mask to an object attribute', () => {

        const data = {
            info: 'restricted-info',
            user: {
                name: 'jane',
                pass: '12345',
                card: { number: '4716653131802558' },
                document: 980345787534
            }
        };
        const step = Step.error({ message: 'err', name: 'err', data });
        const result = step.mask([{ key: 'info' }]);
        expect(result.data).toEqual({
            info: '***************',
            user: {
                name: 'jane',
                pass: '12345',
                card: { number: '4716653131802558' },
                document: 980345787534
            }
        });
    });

    it('should add mask to an object attribute', () => {

        const data = {
            info: 'restricted-info',
            user: {
                name: 'jane',
                pass: '12345',
                card: { number: '4716653131802558' },
                document: 980345787534
            }
        };
        const step = Step.error({ message: 'err', name: 'err', data });
        const result = step.mask([
            { key: 'info' },
            { key: 'user.pass' },
            { key: 'user.card.number', nCharDisplay: 4 },
            { key: 'user.document', nCharDisplay: 2 }
        ]);
        expect(result.data).toEqual({
            info: '***************',
            user: {
                name: 'jane',
                pass: '*****',
                card: { number: '************2558' },
                document: '**********34'
            }
        });
    });

    it('should replace any special char', () => {
        const data = {
            info: "some",
            product: { name: "cake", price: 21.30 },
            user: {
                name: "jane doe",
                document: "9234879234",
                age: 21,
                password: "J@ne#12%0-$!,.><~^3"
            }
        };

        const step = Step.create({ name: "step", data }).mask([
            { key: "user.password" }
        ]);

        expect(step.data).toEqual(
            {
                "info": "some",
                "product": {
                    "name": "cake",
                    "price": 21.3,
                },
                "user": {
                    "age": 21,
                    "document": "9234879234",
                    "name": "jane doe",
                    "password": "*******************",
                },
            }
        )
    });

    it('should replace any space or special char', () => {
        const data = {
            info: "some",
            product: { name: "chocolate-cake", price: 21.30 },
            user: {
                name: "jane doe",
                document: "9234879234",
                age: 21,
                password: 12345
            }
        };

        const step = Step.create({ name: "step", data }).mask([
            { key: "name" }
        ]);

        expect(step.data).toEqual(
            {
                "info": "some",
                "product": {
                    "name": "**************",
                    "price": 21.3,
                },
                "user": {
                    "age": 21,
                    "document": "9234879234",
                    "name": "********",
                    "password": 12345,
                },
            }
        );
    });

    it('should set a new category for step and keep the original state immutable', () => {
        const step = Step.info({ name: 'sample', message: 'message' });
        expect(step.category).toBe('none');

        expect(step.setCategory('info').category).toBe('info');
        expect(step.category).toBe('none');
    });
});
