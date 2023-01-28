import { randomUUID } from 'crypto';
import Log from '../lib/core/log';
import Step from '../lib/core/step';

describe('log', () => {
    it('should log to be defined', () => {

        const uid = randomUUID();
        // create a global log
        const global = Log.init({ name: 'First Log', uid });

        // create steps
        const info = Step.info({ message: 'Some step', name: 'Request' });
        const error = Step.error({
            message: 'Tieout', 
            name: 'Login', 
            stack: `Error("myError")@:0
                    trace()@file:///C:/example.html:9
                    b(3,,(void 0),[object Object])@file:///C:/example.html:16
                    first call, firsta)@file:///C:/example.html:19
                    @file:///C:/example.html:21
            `
        });

        // add steps to global log
        const err = global.addStep(info).addStep(error);

        // print or save logs
        err.print();
        err.writeLocal();
    })
});
