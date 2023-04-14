import { Log, stackLog } from "../lib/core";
import { MiddlewareOptions } from "../lib/types";

describe('stack-log', () => {

    const options: MiddlewareOptions = {
        sendAsResponse: false
    };

    const req: any = { originalUrl: '/route-06', protocol: 'http', headers: { host: 'localhost' }, ip: '::1', body: { id: '1' } };
    const res: any = { status: jest.fn() };
    const next: any = jest.fn();

    it('should fail if none options is provided', () => {
        const middleware = () => stackLog(options);
        expect(middleware).toThrowError('[stackLog]: invalid options');
    });

    it('should fail if provide callback and send response as true', () => {
        const middleware = () => stackLog({ sendAsResponse: true, callback: jest.fn() } satisfies MiddlewareOptions);
        expect(middleware).toThrowError('[stackLog]: could not sendAsResponse and callback');
    });

    it('should print to have been called', async () => {

        const log = Log.init({ name: 'test' });
        const print = jest.spyOn(log, 'print');
        jest.spyOn(log, 'print').mockImplementationOnce(() => jest.fn());

        const err = new Error('Info Test');
        req.log = log;
        await stackLog({ print: true, publish: false, sendAsResponse: false, writeLocal: false })(err, req, res, next);
        expect(log.steps).toHaveLength(1);
        expect(print).toHaveBeenCalled();
    });

    it('should write local to have been called', async () => {

        const log = Log.init({ name: 'test' });
        const writeLocal = jest.spyOn(log, 'writeLocal');
        jest.spyOn(log, 'writeLocal').mockImplementationOnce(async (path?: string) => { (path) });

        const err = new Error('Info Test');
        req.log = log;
        await stackLog({ print: false, publish: false, sendAsResponse: false, writeLocal: true })(err, req, res, next);
        expect(log.steps).toHaveLength(1);
        expect(writeLocal).toHaveBeenCalled();
    });

    it('should throw if ask to publish without provider', async () => {
        const log = Log.init({ name: 'test' });
        const err = new Error('Info Test');
        req.log = log;
        expect.assertions(1)
        try {
            await stackLog({ print: false, publish: true, sendAsResponse: false, writeLocal: false })(err, req, res, next);
        } catch (error) {
            expect((error as Error).message).toBe('[stackLog]: could not publish log missing provider settings');
        }
    });

    it('should send log as response', async () => {

        const log = Log.init({ name: 'test' });
        const send = jest.spyOn(res, 'status');
        jest.spyOn(res, 'status').mockImplementationOnce(() => ({ json: jest.fn() }))

        const err = new Error('Info Test');
        req.log = log;
        await stackLog({ print: false, publish: false, sendAsResponse: true, writeLocal: false })(err, req, res, next);
        expect(log.steps).toHaveLength(1);
        expect(send).toHaveBeenCalled();
    });

    it('should call callback fn', async () => {

        const log = Log.init({ name: 'test' });
        const callback = async (a: any, b: any, c: any, d: any, e: any) => {
            ({ a, b, c, d, e });
        };

        const useCase = { execute: callback };

        const call = jest.spyOn(useCase, 'execute');

        const err = new Error('Info Test');
        req.log = log;
        await stackLog({ print: false, publish: false, sendAsResponse: false, writeLocal: false, callback: useCase.execute  })(err, req, res, next);
        expect(log.steps).toHaveLength(1);
        expect(call).toHaveBeenCalled();
    });
    
});
