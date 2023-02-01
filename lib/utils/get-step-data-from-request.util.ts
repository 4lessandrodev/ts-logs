export const getStepDataFromRequest = (err: Error, req: any) => {
    const message = err?.message ?? 'Internal Server Error';
    const stack = err?.stack ?? '';
    const statusCode = 500;
    const method = req?.method ?? 'NONE';
    const hasData = typeof req?.body === 'object' && (Object.keys(req?.body ?? {}).length > 0);
    const body = req?.body ?? {};
    const data = hasData ? JSON.stringify(body) : '{}';
    const tags = hasData ? Object.keys(body) : [];
    return { message, stack, statusCode, method, tags, data, body  };
}

export default getStepDataFromRequest;
