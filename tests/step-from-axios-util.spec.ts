import { Log } from "../lib/core/log";;
import { CatchError } from "../lib/types";
import { stepPropsFromAxiosError } from "../lib/utils/step-from-axios-error.util";;

describe('step-from-axios-error', () => {

    class Test {
        execute(): Error {
            return new Error("Simulate Error");
        }
    }

    const instance = new Test();

    it('should get step with success', () => {
        const error = instance.execute();
        const step = stepPropsFromAxiosError(error as CatchError);
        expect(step).toBeDefined();
    });

    it('should get step with success', async () => {
        const log = Log.init({ name: 'Test' });
        const error = instance.execute();
        const step = stepPropsFromAxiosError(error as CatchError);

        const result = log.addStep(step);
        await result.writeLocal();
        expect(result.steps).toHaveLength(1);
        expect(step).toBeDefined();
    });
});
