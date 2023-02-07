import { getLogDataFromRequest } from "../lib/utils/get-log-data-from-request.util";

describe('get-log-data-from-request.util', () => {

    it('should get log data with success', () => {
        const req: any = { originalUrl: '/route-06', protocol: 'http', headers: { host: 'localhost' }, ip: '::1', body: { id: '1' } };
        const origin = 'http://localhost/route-06';

        const data = getLogDataFromRequest(req);
        expect(data).toEqual({ name: 'route-06', ip: '127.0.0.1', origin, uid: '1' });
    });

    it('should get index name if route is /', () => {
        const req: any = { originalUrl: '/', protocol: 'http', headers: { host: 'localhost' }, ip: '::1', body: { id: '1' } };
        const origin = 'http://localhost/';

        const data = getLogDataFromRequest(req);
        expect(data).toEqual({ name: 'index', ip: '127.0.0.1', origin, uid: '1' });
    });

    it('should get index name if route is empty', () => {
        const req: any = { originalUrl: '', protocol: 'http', headers: { host: 'localhost' }, ip: '::1', body: { id: '1' } };
        const origin = 'http://localhost';

        const data = getLogDataFromRequest(req);
        expect(data).toEqual({ name: 'index', ip: '127.0.0.1', origin, uid: '1' });
    });

    it('should get log data and id from param', () => {
        const req: any = { originalUrl: '/route-06', protocol: 'http', headers: { host: 'localhost' }, ip: '::1', body: {}, params: { id: '200' } };
        const origin = 'http://localhost/route-06';

        const data = getLogDataFromRequest(req);
        expect(data).toEqual({ name: 'route-06', ip: '127.0.0.1', origin, uid: '200' });
    });

    it('should get log data and id from headers', () => {
        const req: any = { originalUrl: '/route-06', protocol: 'http', headers: { host: 'localhost', id: '42' }, ip: '::1', body: {} };
        const origin = 'http://localhost/route-06';

        const data = getLogDataFromRequest(req);
        expect(data).toEqual({ name: 'route-06', ip: '127.0.0.1', origin, uid: '42' });
    });

    it('should get log data and remote address', () => {
        const req: any = { originalUrl: '/route-06', protocol: 'http', headers: { host: 'localhost', uid: '42' }, connection: { remoteAddress: '45.05.192.118' }, body: {} };
        const origin = 'http://localhost/route-06';

        const data = getLogDataFromRequest(req);
        expect(data).toEqual({ name: 'route-06', ip: '45.05.192.118', origin, uid: '42' });
    });

    it('should get log data and x-forwarded-for', () => {
        const req: any = { originalUrl: '/route-06', protocol: 'http', headers: { host: 'localhost', uid: '42', 'x-forwarded-for': '45.05.192.118' }, connection: {}, body: {} };
        const origin = 'http://localhost/route-06';

        const data = getLogDataFromRequest(req);
        expect(data).toEqual({ name: 'route-06', ip: '45.05.192.118', origin, uid: '42' });
    });
});
