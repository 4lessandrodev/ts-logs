import tagsFromBody from "../lib/utils/get-tags-from-body.util";

describe('get-tags-from-body', () => {
    it('should get tags from object with success', () => {
        const tags = tagsFromBody({ some: "123", value: 20, profile: {}, isOwner: true });
        expect(tags).toEqual(["some", "value", "profile", "isOwner"]);
    });

    it('should get tags from string with success', () => {
        const tags = tagsFromBody(JSON.stringify({ some: "123", value: 20, profile: {}, isOwner: true }));
        expect(tags).toEqual(["some", "value", "profile", "isOwner"]);
    });

    it('should get tags from array with success', () => {
        const tags = tagsFromBody(["some", "fruit", 100, 200, true]);
        expect(tags).toEqual(["some", "fruit"]);
    });

    it('should get empty if provide null', () => {
        const tags = tagsFromBody(null);
        expect(tags).toEqual([]);
    });

    it('should get empty if provide empty string', () => {
        const tags = tagsFromBody('');
        expect(tags).toEqual([]);
    });
});
