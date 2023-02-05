import { Log, Step } from "../lib/core";
import { AutoPublishOptions, Requests, Responses } from "../lib/types";
import canAutoPublish from "../lib/utils/can-auto-publish.util";

describe('can-auto-publish', () => {

    it('should can auto publish', () => {
        const steps = [Step.info({ name: 'test', message: 'test' })];
        const log = Log.init({ name: 'Test', steps });

        const req: Requests = { log } as Requests;
        const res: Responses = { statusCode: 200 } as Responses;

        const canPublish = canAutoPublish(req, res);
        expect(canPublish).toBeTruthy();
    });

    it('should can not auto publish if steps is empty', () => {
        const steps = [];
        const log = Log.init({ name: 'Test', steps });

        const req: Requests = { log } as Requests;
        const res: Responses = { statusCode: 200 } as Responses;

        const canPublish = canAutoPublish(req, res);
        expect(canPublish).toBeFalsy();
    });

    it('should can not auto publish if response status is not 400 or 500', () => {
        const steps = [Step.info({ name: 'test', message: 'test' })];
        const log = Log.init({ name: 'Test', steps });

        const req: Requests = { log } as Requests;
        const res: Responses = { statusCode: 200 } as Responses;
        const options: AutoPublishOptions = { publishWhenStatus: (sts): boolean => [400,500].includes(sts)};

        const canPublish = canAutoPublish(req, res, options);
        expect(canPublish).toBeFalsy();
    });

    it('should can auto publish if response status is 400 or 500', () => {
        const steps = [Step.info({ name: 'test', message: 'test' })];
        const log = Log.init({ name: 'Test', steps });

        const req: Requests = { log } as Requests;
        const res: Responses = { statusCode: 500 } as Responses;
        const options: AutoPublishOptions = { publishWhenStatus: (sts): boolean => [400,500].includes(sts)};

        const canPublish = canAutoPublish(req, res, options);
        expect(canPublish).toBeTruthy();
    });
});
