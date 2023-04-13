/**
 * @description Remove keys from an object or array of objects.
 * @param body as object or array of objects.
 * @param keys as array of string.
 * @returns body as object or array without removed keys.
 */
export const DeleteObjectKey = <T>(body: T, keys: string[]): Partial<T> => {
    if(!Array.isArray(keys)) return body;

    if (Array.isArray(body)) {
        return body.map((val): Partial<T> => DeleteObjectKey(val, keys)) as T;
    }
    
    if (body && typeof body === 'object' && !(body instanceof Date) && keys.length > 0) {        
        let result = {};
        const objectKeys = Object.keys(body);
        let currentObjectKeyIndex = 0;

        while (objectKeys[currentObjectKeyIndex]) {
            const currentKey = objectKeys[currentObjectKeyIndex];
            if (keys.includes(currentKey)) { currentObjectKeyIndex++; continue };
            const value = body[currentKey];

            if (Array.isArray(value)) {
                const arr = value.map((val): Partial<T> => DeleteObjectKey(val, keys));
                result = Object.assign({}, result, { [currentKey]: arr });
                currentObjectKeyIndex++;
                continue;
            }

            if (value && typeof value === 'object' && !(value instanceof Date)) {
                const subObj = DeleteObjectKey(value, keys);
                result = Object.assign({}, result, { [currentKey]: subObj });
                currentObjectKeyIndex++;
                continue;
            }

            result = Object.assign({}, result, { [currentKey]: value });
            currentObjectKeyIndex++;
        }

        return result;
    }

    return body;
}

export default DeleteObjectKey;
