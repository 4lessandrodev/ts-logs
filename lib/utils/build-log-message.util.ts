import { BuildLogMessages, Locale, LocalOpt, Logs } from "../types";
import Color from "./color.util";

export const BuildLogMessage: BuildLogMessages = (log: Logs, locales?: Locale, options?: LocalOpt): string => {
    const { name, createdAt, steps, origin, ip } = log;
    const time = createdAt.toLocaleString(locales ?? 'pt-BR', options);
    const title = ` [ LOG   ] > Date: ${time} | Log: ${name} | Origin: ${origin} | IP: ${ip} `;
    const titleBg = Color.white(title, 'magenta');
    const titleFont = Color.style().bold(titleBg);
    const header = Color.style().reset(titleFont);
    const stepsMsgs = steps.map((step): string => step.getPrintableMsg(locales, options) + '\n');
    const msgs = stepsMsgs.toString().replace(/,/g, '');
    return `${header}\n${msgs}`;
};

export default BuildLogMessage;
