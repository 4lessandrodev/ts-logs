import { randomUUID } from 'node:crypto';
import { SProps } from '../lib/types';
import Log from '../lib/core/log';
import Step from '../lib/core/step';

describe('log', () => {

    // create a stack
    const GetStack = (): string => {
        try {
            throw new Error("Connection Refused - Timeout")
        } catch (error) {
            return (error as Error).stack as string;
        }
    }

    it('should create global log and add steps', () => {

        // any id or unique string value
        const uid = randomUUID();

        const origin = 'https://global.com';

        const url = origin + '/register';
        const tags = ['register', 'user', 'app'];
        const data = JSON.stringify({ "name": "Jane Doe" });
        const message = "Internal Error";

        // full props for debug step
        const debugProps: Omit<SProps, 'type' | 'createdAt' | 'additionalInfo'> = { data, message, name: 'Signup', stack: GetStack(), statusCode: 500, tags, uid, url, method: 'GET' };

        // create a global log
        const global = Log.init({ name: 'First Log', uid, origin });

        // create steps
        const info = Step.info({ message: 'Fetching api...', name: 'Request Login' });
        const error = Step.error({ message: 'Timeout', name: 'Login', statusCode: 502 });
        const stack = Step.stack({ message: 'Not Found', name: 'Get Product', stack: GetStack(), statusCode: 404 });
        const debug = Step.debug(debugProps);

        // add steps to global log
        const err = global.addSteps([info, error, stack, debug]);

        // print or save logs
        err.print();
        err.writeLocal();
        expect(err.steps).toHaveLength(4);
    })
});
