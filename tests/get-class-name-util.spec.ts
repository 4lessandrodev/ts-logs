import { reference } from "../lib/utils/get-function-name.util";

describe('get-class-name.util', () => {

    class Example {
        execute(): string{
            return reference();
        }
    }

    const instance = new Example();

    const GetName = (): string => {
        return reference();
    }

    it('should get class name: Example.execute', () => {
        const result = instance.execute();
        expect(result).toBe('Example.execute');
    });

    it('should get function name: GetName', () => {
        const result = GetName();
        expect(result).toBe('GetName');
    });
});
