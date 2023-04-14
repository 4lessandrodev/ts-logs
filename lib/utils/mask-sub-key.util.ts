import { Callback } from "../types";


export const MaskSubObjectKey = <T = {}>(path: string, object: T, callback: Callback): T => {
	if (typeof path !== 'string') return object;
	if (typeof object !== 'object') return object;
	if (typeof callback !== 'function') return object;

	const keys = path.split('.');
	const isArr = Array.isArray(keys);

	if (!isArr) return object;
	if (keys.length <= 1) return object;
	const lastKey = keys[keys.length - 1];

	let value = object;
	for (let i = 0; i < keys.length - 1; i++) {
		value = value?.[keys[i]];
	};

	const strOrNullA = (typeof value?.[lastKey] === 'string') ? value[lastKey] : null;
	const strOrNullB = (typeof value?.[lastKey] === 'number') ? value[lastKey].toString() : null;

	if ((!strOrNullA && !strOrNullB)) return object;

	const valToChange: string = strOrNullA ? strOrNullA : strOrNullB;

	if (value?.[lastKey]) value[lastKey] = callback(valToChange);

	return object;
};

export default MaskSubObjectKey;
