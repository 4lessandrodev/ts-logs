import { randomUUID } from 'crypto';
import Log from '../lib/core/log';
import Step from '../lib/core/step';

describe('log', () => {
    it('should log to be defined', () => {

        const uid = randomUUID();

        const global = Log.init({ name: 'First Log', uid });
        const step1 = Step.info({ message: 'Some step', name: 'Request' });
        const a = global.addStep(step1);
        const b = a.addStep(
            Step.error({
            message: 'Tieout', 
            name: 'Login', 
            stack: `Error("myError")@:0
                    trace()@file:///C:/example.html:9
                    b(3,,(void 0),[object Object])@file:///C:/example.html:16
                    first call, firsta)@file:///C:/example.html:19
                    @file:///C:/example.html:21
            `
        }))

        b.print();
        b.writeLocal();
    })
});
