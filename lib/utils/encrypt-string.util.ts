import { EncryptParam } from "../types";

export const encryptString = (param: EncryptParam): string => {
    if(!param.encrypt) return param.data;
    if(param?.encryptOption?.level === 'cypher'){
        /** @todo encrypt data on body */
        console.log('[encryptOption]: cypher is not implemented yet');
    }
    const payload = param.data;
    return Buffer.from(payload).toString('base64');
}

export default encryptString;
