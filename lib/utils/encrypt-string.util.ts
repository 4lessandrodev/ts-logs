import { EncryptParam } from "../types";
import encryptStepValue from "./encrypt.util";

export const encryptString = async (param: EncryptParam): Promise<string | {}> => {
    if (!param.encrypt) return param.data;
    const data = typeof param.data === 'string' ? param.data : JSON.stringify(param.data);
    if (param?.encryptOption?.level === 'cypher') {
        const key = param.encryptOption.secretKey ?? 'default';
        const encrypted = await encryptStepValue(data, key);
        return encrypted;
    }
    return Buffer.from(data).toString('base64');
};

export default encryptString;
