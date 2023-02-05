import { BuildStepMessages, Locale, LocalOpt, Steps } from "../types";
import Color from "./color.util";

export const BuildInfoMessage: BuildStepMessages = (step: Steps, locales?: Locale, options?: LocalOpt): string => {
    const { message, createdAt, name } = step;
    const time = createdAt.toLocaleTimeString(locales ?? 'pt-BR', options);
    const msg = ` [ INFO  ] Time: ${time} | Step: ${name} | Message: ${message} `;
    return Color.black(msg, 'white');
};

export default BuildInfoMessage;
