import { BuildStepMessages, Locale, LocalOpt, Steps } from "../types";
import Color from "./color.util";

export const BuildDebugMessage: BuildStepMessages = (step: Steps, locales?: Locale, options?: LocalOpt): string => {
    const { message, createdAt, name, stack, data, uid, url, statusCode } = step;
    const time = createdAt.toLocaleTimeString(locales ?? 'pt-BR', options);
    const msg = ` [ DEBUG ] Time: ${time} | Step: ${name} | Message: ${message} | Uid: ${uid} | Url: ${url} | Code: ${statusCode} `;
    const info = (typeof data === 'string') ? data : JSON.stringify(data);
    const italicData = Color.style().italic(info);
    const titleData = Color.style().reset(msg);
    const resultData = `${titleData} \n Data: ${italicData}`;
    const resultDataReset = Color.style().reset(resultData);

    const italic = Color.style().italic(stack);
    const title = Color.style().reset(resultDataReset);
    const result = `${title} \n ${italic}`;
    const resultReset = Color.style().reset(result);
    return Color.red(resultReset, 'white');
};

export default BuildDebugMessage;
