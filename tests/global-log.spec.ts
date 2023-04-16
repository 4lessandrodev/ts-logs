import { Step } from "../lib/core/step";
import GlobalLog from "../lib/core/global-log";

describe('global-log', () => {
    const log = GlobalLog.singleton();
    it('should create a global log', () => {
        expect(log.hasSteps()).toBeFalsy();
        expect(log.name).toBe('global-log');
    });

    it('should add an step to global log', () => {
        log.addStep(Step.create({}));
        expect(log.hasSteps()).toBeTruthy();
    });

    it('should to get the same instance', () => {
        const global = GlobalLog.singleton();
        expect(global.hasSteps()).toBeTruthy();
    });
});
