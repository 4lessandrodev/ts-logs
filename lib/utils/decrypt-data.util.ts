import DecryptStepValue from "./decrypt.util";

export const DecryptData = async <T>(data: T, keys: string[], secret: string): Promise<T> => {
    if(data && typeof data === 'string'){
        return DecryptStepValue(data, secret) as T;
    }
    if (data && Array.isArray(data)) {
        let result: T[] = [];
        let i = 0;
        while (data[i]) {
            const attr = data[i];
            const payload = await DecryptData(attr, keys, secret) as T;
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
        let keysToDecryptIndex = 0;

        while (objectKeys[objectKeysIndex]) {
            const currentObjectKey = objectKeys[objectKeysIndex];

            if (!(keysToEncrypt.includes(currentObjectKey))) {
                const target = data[currentObjectKey];
                if (typeof target === 'object') {
                    const subObj = await DecryptData(target, keys, secret);
                    result = Object.assign({}, result, { [currentObjectKey]: subObj });
                    objectKeysIndex++;
                    continue;
                }
                result = Object.assign({}, result, { [currentObjectKey]: target });
                objectKeysIndex++;
                continue;
            }

            while (keysToEncrypt[keysToDecryptIndex]) {
                const currentRemoveKey = keysToEncrypt[keysToDecryptIndex];
                const target = data[currentObjectKey];
                const isString = typeof target === 'string';
                if (currentRemoveKey === currentObjectKey && isString) {
                    let decrypted = '';
                    try {
                        decrypted = await DecryptStepValue(target, secret);
                    } catch (error) {
                        decrypted = target;
                    }

                    try {
                        const parseObject = JSON.parse(decrypted);
                        decrypted = parseObject;
                    } catch (error) {
                        decrypted = decrypted;
                    }

                    result = Object.assign({}, result, { [currentObjectKey]: decrypted });
                }
                keysToDecryptIndex++;
            }
            objectKeysIndex++;
        }
        return result;
    }
    return data;
}

export default DecryptData;
