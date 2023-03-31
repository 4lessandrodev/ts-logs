import encryptStepValue from "./encrypt.util";

export const encryptData = async <T>(data: T, keys: string[], secret: string): Promise<T> => {
    if(data && typeof data === 'string') {
        return encryptStepValue(data, secret) as T;
    }
    if (data && Array.isArray(data)) {
        let result: T[] = [];
        let i = 0;
        while(data[i]){
            const attr = data[i];
            const payload = await encryptData(attr, keys, secret) as T;
            result.push(payload);
            i++;
        }
        return result as T;
    }
    if (data && typeof data === 'object') {
        let result = Object.assign({}, data);
        const objectKeys = Object.keys(data);
        let objectKeysIndex = 0;

        const keysToEncrypt = keys;
        let keysToEncryptIndex = 0;

        while (objectKeys[objectKeysIndex]) {
            const currentObjectKey = objectKeys[objectKeysIndex];

            if (!(keysToEncrypt.includes(currentObjectKey))) {
                const target = data[currentObjectKey];
                if(typeof target === 'object'){
                    const subObj = await encryptData(target, keys, secret);
                    result = Object.assign({}, result, { [currentObjectKey]: subObj });
                    objectKeysIndex++;
                    continue;
                }
                result = Object.assign({}, result, { [currentObjectKey]: target });
                objectKeysIndex++;
                continue;
            }

            while (keysToEncrypt[keysToEncryptIndex]) {
                const currentRemoveKey = keysToEncrypt[keysToEncryptIndex];
                const target = data[currentObjectKey];
                if(currentRemoveKey === currentObjectKey){
                    const value = typeof target === 'string' ? target : JSON.stringify(target);
                    const encrypted = await encryptStepValue(value, secret);
                    result = Object.assign({}, result, { [currentObjectKey]: encrypted });
                }
                keysToEncryptIndex++;
            }
            objectKeysIndex++;
        }
        return result;
    }
    return data;
}

export default encryptData;
