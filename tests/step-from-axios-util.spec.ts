import { Step } from "../lib/core/step";
import { Log } from "../lib/core/log";
import { CatchError } from "../lib/types";
import { StepPropsFromAxiosError } from "../lib/utils/step-from-axios-error.util";;

describe('step-from-axios-error', () => {

    class Test {
        execute(): Error {
            return new Error("Simulate Error");
        }
    }

    const instance = new Test();

    it('should get step with success', () => {
        const error = instance.execute();
        const step = StepPropsFromAxiosError(error as CatchError);
        expect(step).toBeDefined();
    });

    it('should get step with success', async () => {
        const log = Log.init({ name: 'Test' });
        const error = instance.execute();
        const props = StepPropsFromAxiosError(error as CatchError);
        const step = Step.create(props);
        const result = log.addStep(step);
        await result.writeLocal();
        expect(result.steps).toHaveLength(1);
        expect(step).toBeDefined();
    });
});
