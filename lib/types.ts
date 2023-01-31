export type Type = "error" | "info" | "warn" | "debug" | "fatal" | "stack";
export type Locale = Intl.LocalesArgument;
export type LocalOpt = Intl.DateTimeFormatOptions | undefined;
export type Method = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT' | 'OPTIONS' | 'HEAD' | 'LINK' | 'PURGE' | 'UNLINK' | 'NONE';

export interface SProps {
    readonly uid: string;
    readonly name: string;
    readonly tags: Readonly<string[]>;
    readonly url: string;
    readonly stack: string;
    readonly data: string;
    readonly statusCode: number;
    readonly message: string;
    readonly method: Method;
    readonly type: Type;
    readonly createdAt: Date;
}

export interface LProps {
    readonly uid: string;
    readonly name: string;
    readonly ip: string;
    readonly origin: string;
    readonly createdAt: Date;
    readonly steps: Readonly<Steps[]>;
}

export interface Steps extends SProps {
    addTag(tag: string): Readonly<Steps>;
    addTags(tags: string[]): Readonly<Steps>;
    setName(name: string): Readonly<Steps>;
    setMethod(method: Method): Readonly<Steps>;
    setStack(stack: string): Readonly<Steps>;
    setMessage(message: string): Readonly<Steps>;
    setStatusCode(code: number): Readonly<Steps>;
    setData(data: string): Readonly<Steps>;
    setUid(uid: string): Readonly<Steps>;
    setURL(url: string): Readonly<Steps>;
    print(locales?: Locale, options?: LocalOpt): void;
    getPrintableMsg(locales?: Locale, options?: LocalOpt): string;
}

export interface Logs extends LProps {
    setName(name: string): Readonly<Logs>;
    setIp(ip: string): Readonly<Logs>;
    setOrigin(url: string): Readonly<Logs>;
    addStep(step: Readonly<Steps>): Readonly<Logs>;
    addSteps(steps: Readonly<Steps[]>): Readonly<Logs>;
    removeStep(uid: string): Readonly<Logs>;
    writeLocal(path?: string): Promise<void>;
    print(locales?: Locale, options?: LocalOpt): void;
    publish(): Promise<void>;
}

export type BuildStepMessages = (step: Steps, locales?: Locale, options?: LocalOpt) => string;
export type BuildLogMessages = (log: Logs, locales?: Locale, options?: LocalOpt) => string;
type keys = Type | 'default';
export type FnTypes = { [k in keys ]: BuildStepMessages };
