export type Type = "error" | "info" | "warn" | "debug" | "fatal" | "trace";

export interface SProps {
    uid: string;
    name: string;
    tags: string[];
    url: string;
    stack: string;
    data: string;
    statusCode: number;
    message: string;
    type: Type;
    createdAt: Date;
}

export interface LProps {
    uid: string;
    name: string;
    ip: string;
    origin: string;
    createdAt: Date;
    steps: Steps[];
}

export interface Steps extends SProps {
    addTag(tag: string): Steps;
    addTags(tags: string[]): Steps;
    setName(name: string): Steps;
    setStack(stack: string): Steps;
    setMessage(message: string): Steps;
    setStatusCode(code: number): Steps;
    setData(data: string): Steps;
    setUid(uid: string): Steps;
    setURL(url: string): Steps;
}

export interface Logs extends LProps {
    addStep(step: Steps): Logs;
    removeStep(uid: string): Logs;
    writeLocal(path?: string): Promise<void>;
    print(): void;
    publish(): Promise<void>;
}
