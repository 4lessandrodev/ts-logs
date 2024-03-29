import { Reference } from "../lib/utils/get-function-name.util";

describe('get-class-name.util', () => {

    class Example {
        execute(): string{
            const err = new Error('Simulation');
            return Reference.fromError(err);
        }
    }

    const instance = new Example();

    const GetName = (): string => {
        return Reference.new();
    }

    it('should get class name: Example.execute', () => {
        const result = instance.execute();
        expect(result).toBe('Object');
    });

    it('should get function name: GetName', () => {
        const result = GetName();
        expect(result).toBe('Object');
    });
});
