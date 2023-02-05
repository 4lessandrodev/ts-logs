import { BuildStepMessages, Locale, LocalOpt, Steps } from "../types";
import Color from "./color.util";

export const BuildErrorMessage: BuildStepMessages = (step: Steps, locales?: Locale, options?: LocalOpt): string => {
    const { message, createdAt, name } = step;
    const time = createdAt.toLocaleTimeString(locales ?? 'pt-BR', options);
    const msg = ` [ ERROR ] Time: ${time} | Step: ${name} | Message: ${message} `;
    return Color.red(msg, 'white');
};

export default BuildErrorMessage;
