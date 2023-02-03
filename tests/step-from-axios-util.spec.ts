import { AxiosError } from "axios";
import { stepFromAxiosError } from "../lib/utils/step-from-axios-error.util";;

describe('step-from-axios-error', () => {

    class Test {
        execute() {
            try {
                throw new Error("Simulate Error");
            } catch (error) {
                return error;
            }
        }
    }

    const instance = new Test();

    it('should get step with success', () => {
        const error = instance.execute();
        const step = stepFromAxiosError(error as unknown as AxiosError);
        expect(step).toBeDefined();
    });
});
