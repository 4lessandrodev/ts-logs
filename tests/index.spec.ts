import Log from '../lib/core/index';

describe('log', () => {
    it('should log to be defined', () => {
        Log('logging...');
        expect(Log).toBeDefined();
    })
});
