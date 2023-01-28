import { randomUUID } from "crypto";
import { SProps, Steps, Type } from "../types";

export class Step implements Steps {
    public uid!: string;
    public name!: string;
    public tags!: string[];
    public url!: string;
    public stack!: string;
    public data!: string;
    public statusCode!: number;
    public message!: string;
    public type!: Type;
    public createdAt!: Date;

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
    }

    public static error(props: Partial<SProps> & { name: string; stack: string; message: string; }): Step {
        const statusCode = props.statusCode ?? 400;
        return new Step({ ...props, type: 'error', statusCode });
    }

    public static info(props: Partial<SProps> & { name: string; message: string }): Step {
        return new Step({ ...props, type: 'info' })
    }

    public static create(props: Partial<SProps>): Step {
        return new Step({ ...props })
    }

    addTags(tags: string[]): Step {
        return new Step({ ...this, tags: [...this.tags, ...tags ] });
    };

    addTag(tag: string): Step {
        return new Step({ ...this, tags: [...this.tags, tag] });
    }

    setName(name: string): Steps {
        return new Step({ ...this, name });
    }

    setStack(stack: string): Step {
        return new Step({ ...this, stack });
    }

    setMessage(message: string): Step {
        return new Step({ ...this, message });
    }

    setStatusCode(code: number): Step {
        return new Step({ ...this, statusCode: code });
    }

    setData(data: string): Step {
        return new Step({ ...this, data });
    }

    setUid(uid: string): Step {
        return new Step({ ...this, uid });
    }

    setURL(url: string): Step {
        return new Step({ ...this, url });
    }
}

export default Step;
