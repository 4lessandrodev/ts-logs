import { IMask } from "../types";
import extractBodyAsObject from "./extract-body.util";
import maskAttribute from "./mask-attribute.util";

export const maskData = <T>(data: T, attributes: IMask[]): T => {
	const body: {} = extractBodyAsObject(data as {});
	if (JSON.stringify(body) === '{}') return data;

	if (Array.isArray(body)) {
		const res: T[] = [];
		let a = 0;
		while (body[a]) {
			let val = body[a];
			let at = 0;
			while (attributes[at]) {
				const mask = attributes[at];
				val = maskAttribute(mask, val) as T;
				at++;
			}
			res.push(val);
			a++;
		}

		return res as T;
	}

	let i = 0;
	let payload = body;
	while (attributes[i]) {
		const mask = attributes[i];
		payload = maskAttribute(mask, payload);
		i++;
	}

	return payload as T;
};
export default maskData;
