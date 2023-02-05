import { StepDataFromRequest, Method, Requests } from "../types";
import extractBodyAsObject from "./extract-body.util";

export const getStepDataFromRequest = (err: Error, req: Requests): StepDataFromRequest => {
    const message = err?.message ?? 'Internal Server Error';
    const stack = err?.stack ?? '';
    const statusCode = 500;
    const method = req?.method as Method ?? 'NONE' as Method;
    const body = extractBodyAsObject<{}>(req?.body ?? {});
    const uid = body?.['id'] ?? req?.params?.['id'];
    const hasData = typeof body === 'object' && (Object.keys(body ?? {}).length > 0);
    const data = hasData ? JSON.stringify(body, null, 2) : '{}';
    const tags = hasData ? Object.keys(body) : [];
    return { message, stack, statusCode, method, tags, data, body, uid  };
}

export default getStepDataFromRequest;
