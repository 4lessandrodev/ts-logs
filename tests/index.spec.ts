import { randomUUID } from 'node:crypto';
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

        // create a global log
        const global = Log.init({ name: 'First Log', uid, origin: 'https://global.com' });

        // create steps
        const info = Step.info({ message: 'Fetching api...', name: 'Request Login' });
        const error = Step.error({ message: 'Timeout', name: 'Login', stack: GetStack() });

        // add steps to global log
        const err = global.addSteps([ info, error ]);

        // print or save logs
        err.print();
        err.writeLocal();
        expect(err.steps).toHaveLength(2);
    })
});
