export const getLogDataFromRequest = (req: any) => {
    const uid = req?.headers['uid'] as string ?? req?.headers?.['id'] ?? req.body?.['id'] ?? req?.params?.['id'];
    const name = req?.originalUrl?.replace(/\//, '') ?? 'index';
    const origin = req?.protocol + '://' + req?.headers['host'] + req?.originalUrl;
    let ip = req?.headers?.['x-forwarded-for'] ?? req?.connection?.remoteAddress ?? req?.ip;
    ip = ip?.replace(/[:]|[\s]|[f]/g, '');
    if (ip === '1') ip = '127.0.0.1';
    return { name, ip, origin, uid };
}

export default getLogDataFromRequest;
