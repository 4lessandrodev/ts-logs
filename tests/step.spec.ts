import { SProps } from "../lib/types";
import { Log, Step } from "../lib/core";

describe('step', () => {
    it('should create a step with success', () => {
        const keys: Array<keyof SProps> = [
            "uid",
            "name",
            "tags",
            "url",
            "stack",
            "data",
            "statusCode",
            "message",
            "type",
            "method",
            "createdAt"
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
        const result = step.addTag('testing')
        expect(result.tags).toHaveLength(1);
    });
    it('should execute addTags', () => {
        const step = Step.create({});
        const result = step.addTags(['1', '2'])
        expect(result.tags).toHaveLength(2);
    });
    it('should execute setName', () => {
        const step = Step.create({});
        const result = step.setName("changed")
        expect(result.name).toBe('changed')
    });
    it('should execute setMethod', () => {
        const step = Step.create({});
        const result = step.setMethod('GET')
        expect(result.method).toBe('GET')
    });
    it('should execute setStack', () => {
        const step = Step.create({});
        const result = step.setStack('internal server error line 10');
        expect(result.stack).toBe('internal server error line 10')
    });
    it('should execute setMessage', () => {
        const step = Step.create({});
        const result = step.setMessage('Timeout')
        expect(result.message).toBe('Timeout')
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
        const result = step.setUid('000001')
        expect(result.uid).toBe('000001');
    });
    it('should execute setURL', () => {
        const step = Step.create({});
        const result = step.setURL('https://test.com.br')
        expect(result.url).toBe('https://test.com.br')
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
            "createdAt": expect.any(Date),
            "data": `{
  \"requestData\": {
    \"email\": \"test@domain.com\",
    \"password\": \"123456\"
  },
  \"responseData\": {}
}`,
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
            "url": "https://postback-4dev.onrender.com/inv/not-found"
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
            "createdAt": expect.any(Date),
            "data": `{
  \"requestData\": {
    \"email\": \"test@domain.com\"
  },
  \"responseData\": {}
}`,
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
    })
});
