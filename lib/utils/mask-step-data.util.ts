import { IMask } from "../types";
import ExtractBodyAsObject from "./extract-body.util";
import MaskAttribute from "./mask-attribute.util";

export const MaskData = <T>(data: T, attributes: IMask[]): T => {
	const body: {} = ExtractBodyAsObject(data as {});
	if (JSON.stringify(body) === '{}') return data;

	if (Array.isArray(body)) {
		const res: T[] = [];
		let a = 0;
		while (body[a]) {
			let val = body[a];
			let at = 0;
			while (attributes[at]) {
				const mask = attributes[at];
				val = MaskAttribute(mask, val) as T;
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
		payload = MaskAttribute(mask, payload);
		i++;
	}

	return payload as T;
};
export default MaskData;
