import { StepDataFromRequest, Method, Requests } from "../types";
import ExtractBodyAsObject from "./extract-body.util";

export const GetStepDataFromRequest = (err: Error, req: Requests): StepDataFromRequest => {
    const message = err?.message ?? 'Internal Server Error';
    const stack = err?.stack ?? '';
    const statusCode = 500;
    const method = req?.method as Method ?? 'NONE' as Method;
    const body = ExtractBodyAsObject<{}>(req?.body ?? {});
    const uid = body?.['id'] ?? req?.params?.['id'];
    const isNotArr = !(Array.isArray(body));
    const hasKeys = (Object.keys(body ?? {}).length > 0);
    const hasData = typeof body === 'object' && isNotArr && hasKeys;
    const data = hasData ? JSON.stringify(body, null, 2) : '{}';
    const tags = hasData ? Object.keys(body) : [];
    return { message, stack, statusCode, method, tags, data, body, uid  };
}

export default GetStepDataFromRequest;
