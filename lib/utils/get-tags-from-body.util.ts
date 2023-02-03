export const tagsFromBody = <T>(body: T): string[] => {
    try {
        if (body && typeof body === 'object' && !(body instanceof Date) && !(Array.isArray(body))) {
            return Object.keys(body);
        }

        if (Array.isArray(body)) {
            const result: string[] = [];
            let i = 0;
            while (body[i]) {
                const val = body[i]
                if (val && typeof val === 'string') {
                    result.push(val);
                }
                i++;
            }
            return result;
        }

        if (typeof body === 'string') {
            const obj = JSON.parse(body);
            return Object.keys(obj);
        }

        return [];
    } catch (error) {
        return [];
    }
}

export default tagsFromBody;
