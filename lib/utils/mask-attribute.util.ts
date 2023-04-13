import { IMask } from "../types";
import maskSubObjectKey from "./mask-sub-key.util";

export const maskAttribute = <T extends {}>(mask: IMask, object: T): T => {
	let result = object;
	const key = mask.key;
	const nDigitsDisplay = (typeof mask?.nCharDisplay === 'undefined') ? 0 : mask.nCharDisplay;
	const regexPattern = `.(?=.{${nDigitsDisplay}})`;
	const regex = new RegExp(regexPattern, 'g'); 

	const hasObject = (typeof object !== 'undefined');
	const isArr = (Array.isArray(object));
	const isDate = (object instanceof Date);
	const isObj = (typeof object === 'object');
	const isFn = (typeof object === 'function');

	const keys = (hasObject && !isArr && !isDate && isObj && !isFn) ? Object.keys(object) : [];
	let i = 0;

	while (object && keys[i]) {
		const currentKey = keys[i];
		const keyValue = object?.[currentKey] ?? null;

		const isTargetKey = currentKey === key;
		const isStr = (typeof keyValue === 'string');
		const isNum = (typeof keyValue === 'number');

		if (isTargetKey && (isStr || isNum)) {
			const val = isNum ? keyValue.toString() : keyValue;
			const hash = val.replace(regex, '*');
			result = Object.assign({}, result, { [currentKey]: hash });
			i++;
			continue;
		} else if (keyValue && (typeof keyValue === 'object')) {
			if (Array.isArray(keyValue)) {
				const subs = keyValue.map((el): T[] => maskAttribute(mask, el));
				result = Object.assign({}, result, { [currentKey]: subs });
			} else if ((typeof keyValue !== 'function') && !(keyValue instanceof Date)) {
				const sub = maskAttribute(mask, keyValue);
				result = Object.assign({}, result, { [currentKey]: sub });
			}
		}
		i++;
	}

	result = (!isArr && !isDate && isObj && !isFn) ? Object.assign({}, object, result) : object;
	result = maskSubObjectKey(key, result, (val): string => val.replace(regex, '*'));
	return result;
};
export default maskAttribute;
