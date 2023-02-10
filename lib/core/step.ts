import TerminalLog from "../utils/log.utils";
import { randomUUID } from "node:crypto";
import { CatchError, CatchProps, EncryptStepOption, Locale, LocalOpt } from "../types";
import { Method, SProps, Steps, Type } from "../types";
import { deleteObjectKey, Messages, reference, stepPropsFromAxiosError } from "../utils";
import extractBodyAsObject from "../utils/extract-body.util";
import encryptKeys from "../utils/encrypt-keys.util";
import decryptKeys from "../utils/decrypt-keys.util";

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
    readonly method!: Method;
    readonly createdAt!: Date;
    readonly additionalInfo!: string | null;

    private constructor (props: Partial<SProps>) {
        this.name = props.name ?? 'default';
        this.tags = props.tags ?? [];
        this.url = props.url ?? 'none';
        this.stack = props.stack ?? 'none';
        this.data = props.data ?? 'none';
        this.statusCode = props.statusCode ?? 200;
        this.message = props.message ?? 'none';
        this.type = props.type ?? 'info';
        this.method = props.method ?? 'NONE';
        this.createdAt = new Date();
        const uid = props.uid ?? Step.extractId(props.data);
        this.uid = uid;
        this.additionalInfo = props.additionalInfo ?? null;
        Object.freeze(this);
    }

    /**
     * @description Encrypt attributes.
     * @param options object as EncryptStepOption.
     * @returns instance of Step.
     */
    async encrypt(options: EncryptStepOption): Promise<Readonly<Steps>> {
        const data = await encryptKeys(this, options);
        return new Step({ ...this, data });
    }

    /**
     * @description Decrypt attributes.
     * @param options object as EncryptStepOption.
     * @returns instance of Step.
     */
    async decrypt(options: EncryptStepOption): Promise<Readonly<Steps>> {
        const data = await decryptKeys(this, options);
        return new Step({ ...this, data });
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
     * @description Create an instance of Step adding additional info.
     * @param info as string.
     * @returns an instance of Step
     */
    public setAdditionalInfo(info: string | null): Readonly<Steps> {
        return new Step({ ...this, info });
    }

    /**
     * @description Create an instance of Step type: stack
     * @param props as Object with SProps params
     * @returns an instance of Step
     */
    public static stack(props: Partial<SProps> & { name: string; message: string; stack: string; }): Readonly<Step> {
        const statusCode = props.statusCode ?? 500;
        return new Step({ ...props, type: 'stack', statusCode });
    }

    /**
     * @description Create an instance of Step type: debug
     * @param props as Object with SProps params
     * @returns an instance of Step
     */
    public static debug(props: Omit<SProps, 'type' | 'createdAt' | 'additionalInfo'>): Readonly<Step> {
        return new Step({ ...props, type: 'debug' });
    }

    /**
     * @description Create an instance of Step type: fatal
     * @param props as Object with SProps params
     * @returns an instance of Step
     */
    public static fatal(props: Omit<SProps, 'type' | 'createdAt' | 'additionalInfo'>): Readonly<Step> {
        return new Step({ ...props, type: 'fatal' });
    }

    /**
     * @description Create an instance of Step type: info
     * @param props as Object with SProps params
     * @returns an instance of Step
     */
    public static info(props: Partial<SProps> & { name: string; message: string; }): Readonly<Step> {
        return new Step({ ...props, type: 'info' });
    }

    /**
     * @description Create an instance of Step type: warn
     * @param props as Object with SProps params
     * @returns an instance of Step
     */
    public static warn(props: Partial<SProps> & { name: string; message: string; }): Readonly<Step> {
        return new Step({ ...props, type: 'warn' });
    }

    /**
     * @description Extract id from request body if exists.
     * @param body as string or object
     * @returns id or undefined
     */
    private static extractId(body: string | Object = {}): string {
        const data = extractBodyAsObject<{}>(body);
        const id = data?.['id'] ?? randomUUID();
        return id;
    }

    /**
     * @description Create an instance of Step
     * @param props as Object with SProps params
     * @returns an instance of Step
     */
    public static create(props: Partial<SProps>): Readonly<Step> {
        return new Step({ ...props });
    }

    /**
     * @description Create an step instance from error: Error from a try catch block.
     * @param error as instance of Error from catch block.
     * @param props object with CatchProps.
     */
    public static catch(error: Error | CatchError, props?: CatchProps): Readonly<Step> {
        const rmKeys = (props && props.remove) ? props.remove : [];
        const err = new Error('sample');
        const name = reference.fromError(err);
        error.name = name;
        const params = stepPropsFromAxiosError(error as CatchError, rmKeys);
        return Step.create(params);
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
     * @description Remove keys from body matching provided param.
     * @param keys as array of string.
     * @returns new instance of Step.
     */
    remove(keys: string[]): Readonly<Step> {
        const body = this.data;
        const result = extractBodyAsObject(body);
        const updated = deleteObjectKey(result, keys) as Partial<SProps>;
        const data = JSON.stringify(updated);
        return new Step({ ...this, data });
    }

    /**
     * @description Create a new instance of Step with provided method.
     * @param method as Method.
     * @returns new instance of Step with provided method.
     */
    setMethod(method: Method): Steps {
        return new Step({ ...this, method });
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
    print(locales?: Locale, options?: LocalOpt): void {
        const message = this.getPrintableMsg(locales, options);
        TerminalLog(message);
    }

    /**
     * @description Create a formatted message as string to print on terminal.
     * @param locales as LocalesArgument to format date.
     * @param options as DateTimeFormatOptions to format date. 
     * @returns formatted message string based on unix code to print on terminal.
     */
    getPrintableMsg(locales?: Locale, options?: LocalOpt): string {
        const builder = Messages[this.type];
        if (!builder) return Messages['default'](this, locales, options);
        return builder(this, locales, options);
    }
}

export default Step;
