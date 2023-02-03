/**
 * @description Get class or function name.
 * @returns className or functionName as string.
 */
export const reference = ({
    fromError(error: Error): string  {
        const isNotEmpty = (val: string): boolean => val !== '';
        const isNotAt = (val: string): boolean => val !== 'at';
        const validate = (val: string): boolean => isNotEmpty(val) && isNotAt(val);
        const reference = '.<anonymous>';
        const stack = error.stack ?? '';
        const names = stack.split(' ')
        .filter(validate)
        .filter((str): boolean => str
        .includes(reference));
        const name = names[0];
        if (!name) return 'Default';
        if(typeof name === 'string'){
            const result =  name.slice(0, name.indexOf('.'))
            if(typeof result !== 'string') return 'Default';
            return result;
        }
        return 'Default';
    },
    new(): string {
            const error = new Error('[error-token@b7292691-6693-4ab9-9da8-aa72e9e19817]');
            return this.fromError(error);
    }
})

export default reference;
