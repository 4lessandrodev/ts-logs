export const extractBodyAsObject = <T>(body: string | object): T => {
    try {
        if (body && typeof body === 'object' && !(body instanceof Date)) {
            return body as T;
        }

        if (Array.isArray(body)) {
            return body as T;
        }

        if (typeof body === 'string') {
            return JSON.parse(body);
        }

        return {} as T;
    } catch (error) {
        return {} as T;
    }
}

export default extractBodyAsObject;
