import { BuildStepMessages, Locale, LocalOpt, Steps } from "../types";
import Color from "./color.util";

export const BuildWarnMessage: BuildStepMessages = (step: Steps, locales?: Locale, options?: LocalOpt): string => {
    const { message, createdAt, name } = step;
    const time = createdAt.toLocaleTimeString(locales ?? 'pt-BR', options);
    const msg = ` [ WARN  ] > Time: ${time} | Log: ${name} | Message: ${message} `;
    return Color.magenta(msg, 'white');
};

export default BuildWarnMessage;
