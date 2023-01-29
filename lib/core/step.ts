import { Color } from "../utils/color.util";
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

    private constructor(props: Partial<SProps>) {
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

    /**
     * @description Create an instance of Step type: error
     * @param props as Object with SProps params
     * @returns an instance of Step
     */
    public static error(props: Partial<SProps> & { name: string; message: string; }): Readonly<Step> {
        const statusCode = props.statusCode ?? 400;
        return new Step({ ...props, type: 'error', statusCode });
    }

    /**
     * @description Create an instance of Step type: stack
     * @param props as Object with SProps params
     * @returns an instance of Step
     */
    public static stack(props: Partial<SProps> & { name: string; message: string; stack: string; }): Readonly<Step> {
        const statusCode = props.statusCode ?? 500;
        return new Step({ ...props, type: 'error', statusCode });
    }

    /**
     * @description Create an instance of Step type: debug
     * @param props as Object with SProps params
     * @returns an instance of Step
     */
    public static debug(props: Omit<SProps, 'type'>): Readonly<Step> {
        return new Step({ ...props, type: 'debug' });
    }

    /**
     * @description Create an instance of Step type: fatal
     * @param props as Object with SProps params
     * @returns an instance of Step
     */
    public static fatal(props: Omit<SProps, 'type'>): Readonly<Step> {
        return new Step({ ...props, type: 'fatal' });
    }

    /**
     * @description Create an instance of Step type: info
     * @param props as Object with SProps params
     * @returns an instance of Step
     */
    public static info(props: Partial<SProps> & { name: string; message: string }): Readonly<Step> {
        return new Step({ ...props, type: 'info' })
    }

    /**
     * @description Create an instance of Step type: warn
     * @param props as Object with SProps params
     * @returns an instance of Step
     */
    public static warn(props: Partial<SProps> & { name: string; message: string }): Readonly<Step> {
        return new Step({ ...props, type: 'warn' })
    }

    /**
     * @description Create an instance of Step
     * @param props as Object with SProps params
     * @returns an instance of Step
     */
    public static create(props: Partial<SProps>): Readonly<Step> {
        return new Step({ ...props })
    }

    /**
     * @description Create a new instance of Step with provided tags.
     * @param tags as Array of Tags.
     * @returns new instance of Step with tags.
     */
    addTags(tags: string[]): Readonly<Step> {
        return new Step({ ...this, tags: [...this.tags, ...tags] });
    };

    /**
     * @description Create a new instance of Step with provided tag.
     * @param tag as Tag.
     * @returns new instance of Step with tag.
     */
    addTag(tag: string): Readonly<Step> {
        return new Step({ ...this, tags: [...this.tags, tag] });
    }

    /**
     * @description Create a new instance of Step with provided name.
     * @param name as string.
     * @returns new instance of Step with provided name.
     */
    setName(name: string): Steps {
        return new Step({ ...this, name });
    }

    /**
     * @description Create a new instance of Step with provided stack.
     * @param stack as Error stack as string.
     * @returns new instance of Step with provided stack.
     */
    setStack(stack: string): Readonly<Step> {
        return new Step({ ...this, stack });
    }

    /**
     * @description Create a new instance of Step with provided message.
     * @param message as Error message or Info message as string.
     * @returns new instance of Step with provided error or info message.
     */
    setMessage(message: string): Readonly<Step> {
        return new Step({ ...this, message });
    }

    /**
     * @description Create a new instance of Step with provided status code.
     * @param code number representing http status code. 200, 404, 400, 500 ...
     * @returns new instance of Step with provided status code.
     */
    setStatusCode(code: number): Readonly<Step> {
        return new Step({ ...this, statusCode: code });
    }

    /**
     * @description Create a new instance of Step with provided data.
     * @param data params or request body as string.
     * @returns new instance of Step with provided data.
     */
    setData(data: string): Readonly<Step> {
        return new Step({ ...this, data });
    }

    /**
     * @description Create a new instance of Step with uid.
     * @param uid as unique id or any string representing log id.
     * @returns new instance of Step with provided uid.
     */
    setUid(uid: string): Readonly<Step> {
        return new Step({ ...this, uid });
    }

    /**
     * @description Create a new instance of Step with url.
     * @param url as string.
     * @returns new instance of Step with provided url.
     */
    setURL(url: string): Readonly<Step> {
        return new Step({ ...this, url });
    }

    /**
     * @description Print single step on terminal.
     * @param locales as LocalesArgument to format date.
     * @param options as DateTimeFormatOptions to format date.
     */
    print(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions | undefined): void {
        const message = this.getPrintableMsg(locales, options);
        console.log(message);
    }

    /**
     * @description Create a formatted message as string to print on terminal.
     * @param locales as LocalesArgument to format date.
     * @param options as DateTimeFormatOptions to format date. 
     * @returns formatted message string based on unix code to print on terminal.
     */
    getPrintableMsg(locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions | undefined): string {
        const { message, createdAt, name, type, stack } = this;
        const time = createdAt.toLocaleTimeString(locales ?? 'pt-BR', options);
        if (type === 'error') {
            const msg = ` Time: ${time} - ${name} - ${message} `;
            const italic = Color.style().italic(stack);
            const title = Color.style().reset(msg);
            const result = `${title} \n ${italic}`;
            const resultReset = Color.style().reset(result);
            return Color.red(resultReset, 'white');
        }
        const msg = ` Time: ${time} - ${name} - ${message} `;
        return Color.black(msg, 'white');
    }
}

export default Step;
