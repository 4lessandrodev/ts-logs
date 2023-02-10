import { EncryptParam } from "../types";
import encryptStepValue from "./encrypt.util";

export const encryptString = async (param: EncryptParam): Promise<string> => {
    if (!param.encrypt) return param.data;
    if (param?.encryptOption?.level === 'cypher') {
        const key = param.encryptOption.secretKey ?? 'default';
        const encrypted = await encryptStepValue(param.data, key);
        return encrypted;
    }
    const payload = param.data;
    return Buffer.from(payload).toString('base64');
};

export default encryptString;
