export const deleteObjectKey = <T>(body: T, keys: string[]): Partial<T>  => {
    if(!Array.isArray(keys) || keys.length === 0) return body;
    const copy = body;
    let i = 0;
    while(keys[i]){
        const key = keys[i];
        delete copy?.[key];
        i++;
    }

    return copy;
}

export default deleteObjectKey;
