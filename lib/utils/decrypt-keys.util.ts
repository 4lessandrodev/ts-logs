import { EncryptStepOption, Steps } from "../types";
import DecryptData from "./decrypt-data.util";
import ExtractBodyAsObject from "./extract-body.util";

const DecryptKeys = async (step: Steps, options: EncryptStepOption): Promise<string | {}> => {
	const secretKey = options.secretKey ?? step.uid;
	const dataObj = ExtractBodyAsObject<{}>(step.data);
	const keys = options.attributes;
	if (!dataObj || typeof dataObj !== 'object' || !(Array.isArray(keys)) || JSON.stringify(dataObj) === '{}') {
		if (typeof step.data === 'string') {
			return DecryptData(step.data, keys, secretKey);
		}
		return step.data;

	}
	let result = Object.assign({}, dataObj);
	const decrypted = await DecryptData(dataObj, keys, secretKey);
	result = Object.assign({}, result, decrypted);
	const data = result;
	return data;
};

export default DecryptKeys;
