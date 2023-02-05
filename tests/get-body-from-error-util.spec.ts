import extractBodyAsObject from "../lib/utils/extract-body.util";

describe('get-body-from-error.util', () => {
    it('should get data from string with success', () => {
        const body = JSON.stringify({ HEY: "THERE", hello: "world", o: { data: "ok" } });
        const result = extractBodyAsObject(body);
        expect(result).toEqual({ HEY: "THERE", hello: "world", o: { data: "ok" } });
    });

    it('should get empty object from string with success', () => {
        const body = "";
        const result = extractBodyAsObject(body);
        expect(result).toEqual({});
    });

    it('should get empty object from null with success', () => {
        const body = null;
        const result = extractBodyAsObject(body as any);
        expect(result).toEqual({});
    });

    it('should get array from string with success', () => {
        const result = extractBodyAsObject([] as any);
        expect(result).toEqual([]);
    });
});
