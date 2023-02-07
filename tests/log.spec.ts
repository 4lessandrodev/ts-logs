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
            "stateType",
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
        expect(log.ip).toBe('none');
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

    it('should default state type for log to be stateful', () => {
        const global = Log.init({ name: 'Teste' });
        const step = Step.info({ name: 'Info', message: 'Teste 1' });
        global.addStep(step);
        expect(Object.isFrozen(global.steps)).toBeFalsy();
        expect(global.steps).toHaveLength(1);
    });

    it('should default state type for log to be stateful on create', () => {
        const step = Step.info({ name: 'Info', message: 'Teste 1' });
        const global = Log.init({ name: 'Teste', steps: [step] });
        expect(global.steps).toHaveLength(1);
        expect(Object.isFrozen(global.steps)).toBeFalsy();

        global.removeStep(step.uid);
        expect(global.steps).toHaveLength(0);
    });

    it('should do not change original state', () => {
        const log = Log.init({ name: 'Teste', stateType: 'stateless' });
        const step = Step.info({ name: 'Info', message: 'Teste 1' });
        const newLog = log.addStep(step);
        expect(Object.isFrozen(log.steps)).toBeTruthy();
        expect(log.steps).toHaveLength(0);
        expect(newLog.steps).toHaveLength(1);
    });

    it('should do not change original state on create', () => {
        const step = Step.info({ name: 'Info', message: 'Teste 1' });
        const log = Log.init({ name: 'Teste', steps: [step], stateType: 'stateless' });
        expect(log.steps).toHaveLength(1);
        expect(Object.isFrozen(log.steps)).toBeTruthy();

        const newLog = log.removeStep(step.uid);
        expect(log.steps).toHaveLength(1);
        expect(newLog.steps).toHaveLength(0);
    });

    it('should change ip with success if stateful', () => {
        const log = Log.init({ name: 'sample' });
        expect(log.ip).toBe('none');
        log.setIp('127.0.0.1');
        expect(log.ip).toBe('127.0.0.1');
    });

    it('should change name with success if stateful', () => {
        const log = Log.init({ name: 'sample' });
        expect(log.name).toBe('sample');
        log.setName('change');
        expect(log.name).toBe('change');
    });

    it('should change origin with success if stateful', () => {
        const log = Log.init({ name: 'sample' });
        expect(log.origin).toBe('none');
        log.setOrigin('http://localhost');
        expect(log.origin).toBe('http://localhost')
    });

    it('should can not change ip if stateless', () => {
        const log = Log.init({ name: 'sample', stateType: 'stateless' });
        log.setIp('0.0.0.0')
        expect(log.ip).toBe('none');
    });

    it('should can not change change name if stateless', () => {
        const log = Log.init({ name: 'sample', stateType: 'stateless' });
        log.setName('change');
        expect(log.name).toBe('sample');
    });

    it('should can not change change origin if stateless', () => {
        const log = Log.init({ name: 'sample', stateType: 'stateless' });
        log.setOrigin('http://localhost')
        expect(log.ip).toBe('none');
    });

    it('should clone changing state type with success', () => {
        const log = Log.init({ name: 'sample' });
        expect(log.stateType).toBe('stateful');
        const clone = log.clone('stateless');
        expect(clone.stateType).toBe('stateless');
    });
});
