import bodyFromError from "../lib/utils/get-body-from-error.util";

describe('get-body-from-error.util', () => {
    it('should get data from string with success', () => {
        const body = JSON.stringify({ HEY: "THERE", hello: "world", o: { data: "ok" } });
        const result = bodyFromError(body);
        expect(result).toEqual({ HEY: "THERE", hello: "world", o: { data: "ok" } });
    });

    it('should get empty object from string with success', () => {
        const body = "";
        const result = bodyFromError(body);
        expect(result).toEqual({});
    });

    it('should get empty object from null with success', () => {
        const body = null;
        const result = bodyFromError(body as any);
        expect(result).toEqual({});
    });

    it('should get array from string with success', () => {
        const result = bodyFromError([] as any);
        expect(result).toEqual([]);
    });
});
