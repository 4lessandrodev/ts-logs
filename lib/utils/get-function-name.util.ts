/**
 * @description Get class or function name.
 * @returns className or functionName as string.
 */
export const reference = ({
    fromError(error: Error): string  {
        const isNotEmpty = (val: string): boolean => val !== '';
        const isNotAt = (val: string): boolean => val !== 'at';
        const validate = (val: string): boolean => isNotEmpty(val) && isNotAt(val);
        const reference = 'Object.<anonymous>';
        const stack = (error as Error).stack ?? '';
        const names = stack.split(' ').filter(validate);
        const indexRef = names.indexOf(reference);
        if (indexRef === -1) return 'Default';
        const name = names[indexRef - 2];
        return name ?? 'Default';
    },
    new(): string {
        try {
            throw new Error('[error-token@b7292691-6693-4ab9-9da8-aa72e9e19817]');
        } catch (error) {
            return this.fromError(error as Error);
        }
    }
})

export default reference;
