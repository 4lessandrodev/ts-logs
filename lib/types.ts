export type Type = "error" | "info" | "warn" | "debug" | "fatal" | "trace";

export interface SProps {
    readonly uid: string;
    readonly name: string;
    readonly tags: Readonly<string[]>;
    readonly url: string;
    readonly stack: string;
    readonly data: string;
    readonly statusCode: number;
    readonly message: string;
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
    setStack(stack: string): Readonly<Steps>;
    setMessage(message: string): Readonly<Steps>;
    setStatusCode(code: number): Readonly<Steps>;
    setData(data: string): Readonly<Steps>;
    setUid(uid: string): Readonly<Steps>;
    setURL(url: string): Readonly<Steps>;
}

export interface Logs extends LProps {
    setName(name: string): Readonly<Logs>;
    setIp(ip: string): Readonly<Logs>;
    setOrigin(url: string): Readonly<Logs>;
    addStep(step: Steps): Readonly<Logs>;
    addSteps(steps: Steps[]): Readonly<Logs>;
    removeStep(uid: string): Readonly<Logs>;
    writeLocal(path?: string): Promise<void>;
    print(): void;
    publish(): Promise<void>;
}
