import { LogDataFromRequest, Requests } from "../types";

export const GetLogDataFromRequest = (req: Requests): LogDataFromRequest => {
    const uid = req?.headers['uid'] as string ?? req?.headers?.['id'] ?? req.body?.['id'] ?? req?.params?.['id'];
    const captName = req?.originalUrl?.replace(/\//, '') ?? '';
    const name = (typeof captName === 'string' && captName.length > 1) ? captName : 'index';
    const origin = req?.protocol + '://' + req?.headers['host'] + req?.originalUrl;
    let ip = req?.headers?.['x-forwarded-for'] as string ?? req?.ip as string ?? req?.connection?.remoteAddress as string;
    ip = ip?.replace(/[:]|[\s]|[f]/g, '');
    if (ip === '1') ip = '127.0.0.1';
    return { name, ip, origin, uid };
}

export default GetLogDataFromRequest;
