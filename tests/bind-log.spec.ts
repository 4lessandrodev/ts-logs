import { bindLog } from "../lib/core/bind-log.builder";
import { Requests } from "../lib/types";

describe('bind-log', () => {
    it('should bind log to request with success', () => {
        const req = { originalUrl: '/login', params: { id: 'my-param-id' }, protocol: 'http', headers: { host: 'localhost', 'x-forwarded-for': '::1' } } as unknown as Requests;
        const res = {} as any;
        const next = jest.fn();
        bindLog()(req, res, next)
        expect(req.log).toBeDefined();
        expect(req.log?.name).toBe('login');
    })
});
