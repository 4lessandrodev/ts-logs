import { EncryptStepOption, Steps } from "../types";
import EncryptData from "./encrypt-data.util";
import ExtractBodyAsObject from "./extract-body.util";

const EncryptKeys = async (step: Steps, options: EncryptStepOption): Promise<string | {}> => {
	const secretKey = options.secretKey ?? step.uid;
	const dataObj = ExtractBodyAsObject<{}>(step.data);
	const keys = options.attributes;
	if(!(Array.isArray(keys)) || typeof dataObj !== 'object' || JSON.stringify(dataObj) === '{}') {
		if(typeof step.data === 'string') {
			return EncryptData(step.data, keys, secretKey);
		}
		return step.data;
	}
	let result = Object.assign({}, dataObj);
	const encrypted = await EncryptData(dataObj, keys, secretKey);
	result = Object.assign({}, result, encrypted);
	const data = JSON.stringify(result);
	return data;
};

export default EncryptKeys;
