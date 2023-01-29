import { randomUUID } from "node:crypto";
import { SProps, Steps, Type } from "../types";

export class Step implements Steps {
    readonly uid!: string;
    readonly name!: string;
    readonly tags!: Readonly<string[]>;
    readonly url!: string;
    readonly stack!: string;
    readonly data!: string;
    readonly statusCode!: number;
    readonly message!: string;
    readonly type!: Type;
    readonly createdAt!: Date;

    private constructor(props: Partial<SProps>){
        this.uid = props.uid ?? randomUUID();
        this.name = props.name ?? 'default';
        this.tags = props.tags ?? [];
        this.url = props.url ?? 'none';
        this.stack = props.stack ?? 'none';
        this.data = props.data ?? 'none';
        this.statusCode = props.statusCode ?? 200;
        this.message = props.message ?? 'none';
        this.type = props.type ?? 'info';
        this.createdAt = new Date();
        Object.freeze(this);
    }

    public static error(props: Partial<SProps> & { name: string; stack: string; message: string; }): Readonly<Step> {
        const statusCode = props.statusCode ?? 400;
        return new Step({ ...props, type: 'error', statusCode });
    }

    public static info(props: Partial<SProps> & { name: string; message: string }): Readonly<Step> {
        return new Step({ ...props, type: 'info' })
    }

    public static create(props: Partial<SProps>): Readonly<Step> {
        return new Step({ ...props })
    }

    addTags(tags: string[]): Readonly<Step> {
        return new Step({ ...this, tags: [...this.tags, ...tags ] });
    };

    addTag(tag: string): Readonly<Step> {
        return new Step({ ...this, tags: [...this.tags, tag] });
    }

    setName(name: string): Steps {
        return new Step({ ...this, name });
    }

    setStack(stack: string): Readonly<Step> {
        return new Step({ ...this, stack });
    }

    setMessage(message: string): Readonly<Step> {
        return new Step({ ...this, message });
    }

    setStatusCode(code: number): Readonly<Step> {
        return new Step({ ...this, statusCode: code });
    }

    setData(data: string): Readonly<Step> {
        return new Step({ ...this, data });
    }

    setUid(uid: string): Readonly<Step> {
        return new Step({ ...this, uid });
    }

    setURL(url: string): Readonly<Step> {
        return new Step({ ...this, url });
    }
}

export default Step;
