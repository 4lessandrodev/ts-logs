import { EncryptStepOption, Steps } from "../types";
import decryptStepValue from "./decrypt.util";
import extractBodyAsObject from "./extract-body.util";

const decryptKeys = async (step: Steps, options: EncryptStepOption): Promise<string> => {
	let i = 0;
	const dataObj = extractBodyAsObject<{}>(step.data);
	if (!dataObj || typeof dataObj !== 'object' || Array.isArray(dataObj)) return step.data;
	let result = Object.assign({}, dataObj);
	const secretKey = options.secretKey ?? step.uid;

	while (options.attributes[i]) {
		const key = options.attributes[i];
		const value = dataObj?.[key] ?? null;
		if (value === null || typeof value !== 'string') { i++; continue; };
		let decrypted = await decryptStepValue(value, secretKey);
		let res: any;

		try {
			res = JSON.parse(decrypted);
		} catch (error) {
			res = decrypted;
		}

		result = Object.assign({}, result, { [key]: res });
		i++;
	}

	const data = JSON.stringify(result);
	return data;
};

export default decryptKeys;
