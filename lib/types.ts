import { AxiosError, RawAxiosRequestHeaders, Axios } from "axios";
import { NextFunction, Request, Response } from "express";

export type Type = "error" | "info" | "warn" | "debug" | "fatal" | "stack";
export type Locale = Intl.LocalesArgument;
export type LocalOpt = Intl.DateTimeFormatOptions | undefined;
export type Method = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT' | 'OPTIONS' | 'HEAD' | 'LINK' | 'PURGE' | 'UNLINK' | 'NONE';
export type Encryption = 'cypher' | 'base64';
export type Http = Axios;
export type Requests = Request;
export type Responses = Response;
export type NextFunctions = NextFunction;
export type PublishConfig = S3Config | HttpConfig;;

/**
 * @description Defines the behavior of the state. Whether to change state or return a new instance without changing original state.
 */
export type LogStateType = 'stateful' | 'stateless';

export interface EncryptOption {
    level: Encryption;
    secretKey?: string;
}

export interface MiddlewareOptions {
    /**
     * @description function to be called after create log.
     * @param err Error
     * @param req Request
     * @param res Response
     * @param next NextFunction
     * @param log Log
     * @returns void | Promise<void>
     */
    callback?: (err: Error, req: Requests, res: Responses, next: NextFunctions, log: Readonly<Logs>) => void | Promise<void>;
    /**
     * @description Print log on terminal.
     */
    print?: boolean;
    /**
     * @description Publish as external provider.
     * @requires provider as config.
     */
    publish?: boolean;
    /**
     * @description Send log to client on response.
     */
    sendAsResponse?: boolean;
    /**
     * @description Remove some data by key from log.
     * @example ["card", "password", "token"]
     */
    remove?: string[];
    /**
     * @description Encrypt or encode data.
     * @default encode base64
     */
    encrypt?: boolean;
    /**
     * @description Define encryption strategy.
     * @default base64
     */
    encryptOption?: EncryptOption;
    /**
     * @description External provider to publish logs.
     * @param s3
     * @param http
     */
    provider?: PublishConfig;
    /**
     * @description Write a local file on root folder "log" with log data as .log extension
     */
    writeLocal?: boolean;
}

export interface IMask {
    key: string;
    nCharDisplay?: number;
}

export interface SProps {
    readonly uid: string;
    readonly name: string;
    readonly tags: Readonly<string[]>;
    readonly url: string;
    readonly stack: string;
    readonly data: string | {};
    readonly statusCode: number;
    readonly message: string;
    readonly method: Method;
    readonly type: Type;
    readonly createdAt: Date;
    readonly additionalInfo: string | null;
}

export interface LProps {
    uid: string | Readonly<string>;
    name: string | Readonly<string>;
    ip: string | Readonly<string>;
    origin: string | Readonly<string>;
    createdAt: Date | Readonly<Date>;
    steps: Readonly<Steps[]> | Steps[];
    readonly stateType: LogStateType;
}

export interface EncryptStepOption extends Omit<EncryptOption, 'level'> {
    attributes: string[];
}

export interface Steps extends SProps {
    addTag(tag: string): Readonly<Steps>;
    addTags(tags: string[]): Readonly<Steps>;
    setName(name: string): Readonly<Steps>;
    setMethod(method: Method): Readonly<Steps>;
    setStack(stack: string): Readonly<Steps>;
    setMessage(message: string): Readonly<Steps>;
    setStatusCode(code: number): Readonly<Steps>;
    setData(data: string | {}): Readonly<Steps>;
    setUid(uid: string): Readonly<Steps>;
    setURL(url: string): Readonly<Steps>;
    print(locales?: Locale, options?: LocalOpt): void;
    getPrintableMsg(locales?: Locale, options?: LocalOpt): string;
    remove(keys: string[]): Readonly<Steps>;
    setAdditionalInfo(info: string | null): Readonly<Steps>;
    encrypt(options: EncryptStepOption): Promise<Readonly<Steps>>;
    decrypt(options: EncryptStepOption): Promise<Readonly<Steps>>;
    mask(attrs: IMask[]): Readonly<Steps>;
}

export interface Logs extends LProps {
    setName(name: string): Readonly<Logs> | Logs;
    setIp(ip: string): Readonly<Logs> | Logs;
    setOrigin(url: string): Readonly<Logs> | Logs;
    addStep(step: Readonly<Steps>): Readonly<Logs> | Logs;
    addSteps(steps: Readonly<Steps[]>): Readonly<Logs> | Logs;
    removeStep(uid: string): Readonly<Logs> | Logs;
    writeLocal(path?: string): Promise<void> | Logs;
    print(locales?: Locale, options?: LocalOpt): void;
    publish(config: PublishConfig): Promise<SavePayload | null>;
    hasSteps(): boolean;
    clone(stateType: LogStateType): Readonly<Logs> | Logs;
}

export type BuildStepMessages = (step: Steps, locales?: Locale, options?: LocalOpt) => string;
export type BuildLogMessages = (log: Logs, locales?: Locale, options?: LocalOpt) => string;
type keys = Type | 'default';
export type FnTypes = { [k in keys]: BuildStepMessages };
export type StackMiddleware = (err: Error, req: Requests, res: Responses, next: NextFunctions) => Promise<any>;
export type BinderMiddleware = (req: Requests, res: Responses, next: NextFunctions) => void;
export type PublisherMiddleware = (req: Requests, res: Responses, next: NextFunctions) => Promise<void>;
export interface EncryptParam { data: string | {}; encrypt?: boolean; encryptOption?: EncryptOption; };

export interface StepDataFromRequest {
    message: string;
    stack: string;
    statusCode: number;
    method: Method;
    tags: string[];
    data: string | {};
    uid?: string;
    body: {};
}

export interface LogDataFromRequest {
    name: string;
    ip: string;
    origin: string;
    uid: string;
}

export interface CatchProps {
    remove?: string[];
}

export type CatchError = AxiosError & Error;

export type VProviders = 'S3' | 'Http';

export interface SavePayload {
    url: string | null;
    statusCode: number;
}

export abstract class Provider<T> {
    abstract save(config: T, log: Readonly<Logs>): Promise<SavePayload>;
}

export interface HttpConfig {
    url: string;
    headers?: RawAxiosRequestHeaders;
};

export interface S3Credentials {
    accessKeyId: string;
    secretAccessKey: string;
}

export type AWSRegions = 'us-east-2' |
    'us-east-1' |
    'us-west-1' |
    'us-west-2' |
    'af-south-1' |
    'ap-east-1' |
    'ap-southeast-3' |
    'ap-south-1' |
    'ap-northeast-3' |
    'ap-northeast-2' |
    'ap-southeast-1' |
    'ap-southeast-2' |
    'ap-northeast-1' |
    'ca-central-1' |
    'eu-central-1' |
    'eu-west-1' |
    'eu-west-2' |
    'eu-south-1' |
    'eu-west-3' |
    'eu-north-1' |
    'me-south-1' |
    'sa-east-1';

export interface S3Config {
    region: AWSRegions;
    credentials: S3Credentials;
    bucketName: string;
};

export interface S3Data {
    Bucket: string;
    Key: string;
    Body: Buffer;
    ContentType: string;
}

export interface AutoPublishOptions {
    publishWhenStatus: (status: number) => boolean;
};

export type AutoPublish = (config: PublishConfig, options: AutoPublishOptions) => PublisherMiddleware;

export { };

declare global {
    namespace Express {
        export interface Request {
            log?: Logs;
        }
    }
}