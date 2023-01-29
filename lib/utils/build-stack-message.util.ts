import { BuildStepMessages, Locale, LocalOpt, Steps } from "../types";
import Color from "./color.util";

export const BuildStackMessage: BuildStepMessages = (step: Steps, locales?: Locale, options?: LocalOpt): string => {
    const { message, createdAt, name, stack } = step;
    const time = createdAt.toLocaleTimeString(locales ?? 'pt-BR', options);
    const msg = ` [ STACK ] > Time: ${time} | Log: ${name} | Message: ${message} `;
    const italic = Color.style().italic(stack);
    const title = Color.style().reset(msg);
    const result = `${title} \n ${italic}`;
    const resultReset = Color.style().reset(result);
    return Color.red(resultReset, 'white');
};

export default BuildStackMessage;
