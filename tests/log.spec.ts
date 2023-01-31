import { LProps } from "../lib/types";
import { Log, Step } from "../lib/core";

describe('log', () => {

    const step1 = Step.info({ message: 'a', name: 'step-1' });
    const step2 = Step.info({ message: 'a', name: 'step-1' });

    it('should create a step with success', () => {
        const keys: Array<keyof LProps> = [
            "uid",
            "name",
            "ip",
            "origin",
            "createdAt",
            "steps"
        ];
        const log = Log.init({ name: 'sample' });
        expect.assertions(keys.length + 1);
        expect(Object.keys(log)).toEqual(keys);
        let i = 0;
        while (keys[i]) {
            expect(log[keys[i]]).toBeDefined();
            i++;
        }
    });

    it('should create setName', () => {
        const log = Log.init({ name: 'sample' });
        const res = log.setName('changed');
        expect(res.name).toBe('changed');
    });

    it('should create setIp', () => {
        const log = Log.init({ name: 'sample' });
        const res = log.setIp('127.0.0.1');
        expect(res.ip).toBe('127.0.0.1');
    });

    it('should create setOrigin', () => {
        const log = Log.init({ name: 'sample' });
        const res = log.setOrigin('http://localhost:3000');
        expect(res.origin).toBe('http://localhost:3000');
    });

    it('should create addStep', () => {
        const log = Log.init({ name: 'sample' });
        const res = log.addStep(step1);
        expect(res.steps).toHaveLength(1);
    });

    it('should create addSteps', () => {
        const log = Log.init({ name: 'sample' });
        const res = log.addSteps([step1, step2]);
        expect(res.steps).toHaveLength(2);
    });

    it('should create removeStep', () => {
        const log = Log.init({ name: 'sample', steps: [step1, step2] });
        const res = log.removeStep(step1.uid);
        expect(res.steps).toHaveLength(1);
    });

});