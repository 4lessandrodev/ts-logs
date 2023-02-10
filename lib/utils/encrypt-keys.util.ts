import { EncryptStepOption, Steps } from "../types";
import encryptStepValue from "./encrypt.util";
import extractBodyAsObject from "./extract-body.util";

const encryptKeys = async (step: Steps, options: EncryptStepOption): Promise<string> => {
	let i = 0;
	const dataObj = extractBodyAsObject<{}>(step.data);
	if (!dataObj || typeof dataObj !== 'object' || Array.isArray(dataObj)) return step.data;
	let result = Object.assign({}, dataObj);
	const secretKey = options.secretKey ?? step.uid;

	while (options.attributes[i]) {
		const key = options.attributes[i];
		const value = dataObj?.[key] ?? null;
		if (value === null) { i++; continue; };
		const target = typeof value !== 'string' ? JSON.stringify(value) : value;
		const encrypted = await encryptStepValue(target, secretKey);
		result = Object.assign({}, result, { [key]: encrypted });
		i++;
	}

	const data = JSON.stringify(result);
	return data;
};

export default encryptKeys;
