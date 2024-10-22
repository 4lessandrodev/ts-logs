import { ExtractBodyToJson } from "../lib/utils/body-to-json.util"

describe('', () => {
    it('should return null', () => {
        const result = ExtractBodyToJson({} as any);
        expect(result).toBeNull();
    });

    it('should call toJson fn', () => {
        const result = ExtractBodyToJson({ toJSON: () => ({ sample: 'data' })} as any);
        expect(result).toEqual({ sample: 'data' });
    });
});
