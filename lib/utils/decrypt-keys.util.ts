import { EncryptStepOption, Steps } from "../types";
import decryptData from "./decrypt-data.util";
import extractBodyAsObject from "./extract-body.util";

const decryptKeys = async (step: Steps, options: EncryptStepOption): Promise<string | {}> => {
	const secretKey = options.secretKey ?? step.uid;
	const dataObj = extractBodyAsObject<{}>(step.data);
	const keys = options.attributes;
	if (!dataObj || typeof dataObj !== 'object' || !(Array.isArray(keys)) || JSON.stringify(dataObj) === '{}') {
		if (typeof step.data === 'string') {
			return decryptData(step.data, keys, secretKey);
		}
		return step.data;

	}
	let result = Object.assign({}, dataObj);
	const decrypted = await decryptData(dataObj, keys, secretKey);
	result = Object.assign({}, result, decrypted);
	const data = result;
	return data;
};

export default decryptKeys;
