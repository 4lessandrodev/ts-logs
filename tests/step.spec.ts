import { SProps } from "../lib/types";
import { Step } from "../lib/core";

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
        while(keys[i]){
            expect(step[keys[i]]).toBeDefined();
            i++;
        }
    });

    it('should execute addTag', () => {
        const step = Step.create({});
        const result = step.addTag('testing') 
        expect(result.tags).toHaveLength(1);
    })
    it('should execute addTags', () => {
        const step = Step.create({});
        const result = step.addTags(['1', '2'])
        expect(result.tags).toHaveLength(2);
    })
    it('should execute setName', () => {
        const step = Step.create({});
        const result = step.setName("changed")
        expect(result.name).toBe('changed')
    })
    it('should execute setMethod', () => {
        const step = Step.create({});
        const result = step.setMethod('GET')
        expect(result.method).toBe('GET')
    })
    it('should execute setStack', () => {
        const step = Step.create({});
        const result = step.setStack('internal server error line 10');
        expect(result.stack).toBe('internal server error line 10')
    })
    it('should execute setMessage', () => {
        const step = Step.create({});
        const result = step.setMessage('Timeout')
        expect(result.message).toBe('Timeout')
    })
    it('should execute setStatusCode', () => {
        const step = Step.create({});
        const result = step.setStatusCode(401);
        expect(result.statusCode).toBe(401);
    })
    it('should execute setData', () => {
        const step = Step.create({});
        const result = step.setData('{ "email": "sample@mail.com" }');
        expect(result.data).toBe('{ "email": "sample@mail.com" }');
    })
    it('should execute setUid', () => {
        const step = Step.create({});
        const result = step.setUid('000001')
        expect(result.uid).toBe('000001');
    })
    it('should execute setURL', () => {
        const step = Step.create({});
        const result = step.setURL('https://test.com.br')
        expect(result.url).toBe('https://test.com.br')
    })
});