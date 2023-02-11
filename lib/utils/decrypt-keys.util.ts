import { EncryptStepOption, Steps } from "../types";
import decryptData from "./decrypt-data.util";
import extractBodyAsObject from "./extract-body.util";

const decryptKeys = async (step: Steps, options: EncryptStepOption): Promise<string> => {
	
	const dataObj = extractBodyAsObject<{}>(step.data);
	const keys = options.attributes;
	if (!dataObj || typeof dataObj !== 'object' || !(Array.isArray(keys))) return step.data;
	let result = Object.assign({}, dataObj);
	const secretKey = options.secretKey ?? step.uid;
	const decrypted = await decryptData(dataObj, keys, secretKey);
	result = Object.assign({}, result, decrypted);
	const data = JSON.stringify(result);
	return data;
};

export default decryptKeys;
