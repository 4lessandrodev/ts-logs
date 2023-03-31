import { EncryptStepOption, Steps } from "../types";
import encryptData from "./encrypt-data.util";
import extractBodyAsObject from "./extract-body.util";

const encryptKeys = async (step: Steps, options: EncryptStepOption): Promise<string | {}> => {
	const secretKey = options.secretKey ?? step.uid;
	const dataObj = extractBodyAsObject<{}>(step.data);
	const keys = options.attributes;
	if(!(Array.isArray(keys)) || typeof dataObj !== 'object' || JSON.stringify(dataObj) === '{}') {
		if(typeof step.data === 'string') {
			return encryptData(step.data, keys, secretKey);
		}
		return step.data;
	}
	let result = Object.assign({}, dataObj);
	const encrypted = await encryptData(dataObj, keys, secretKey);
	result = Object.assign({}, result, encrypted);
	const data = JSON.stringify(result);
	return data;
};

export default encryptKeys;
