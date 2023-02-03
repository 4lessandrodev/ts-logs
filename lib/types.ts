import { AxiosError } from "axios";
import { NextFunction, Request, Response } from "express";

export type Type = "error" | "info" | "warn" | "debug" | "fatal" | "stack";
export type Locale = Intl.LocalesArgument;
export type LocalOpt = Intl.DateTimeFormatOptions | undefined;
export type Method = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT' | 'OPTIONS' | 'HEAD' | 'LINK' | 'PURGE' | 'UNLINK' | 'NONE';
export type Encryption = 'cypher' | 'base64';

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
    callback?: (err: Error, req: any, res: any, next: any, log: Logs) => void | Promise<void>;
    /**
     * @description Print log on terminal.
     */
    print?: boolean;
    /**
     * @description Publish as external provider.
     * @requires provider
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
     * @param mongo
     * @param firebase
     * @param redis
     */
    provider?: any;
    /**
     * @description Write a local file on root folder "log" with log data as .log extension
     */
    writeLocal?: boolean;
}

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
    publish(provider: any): Promise<void>;
}

export type BuildStepMessages = (step: Steps, locales?: Locale, options?: LocalOpt) => string;
export type BuildLogMessages = (log: Logs, locales?: Locale, options?: LocalOpt) => string;
type keys = Type | 'default';
export type FnTypes = { [k in keys]: BuildStepMessages };
export type Middleware = (err: Error, req: any, res: any, next: any) => Promise<any>;
export type Binder = (req: any, res: any, next: any) => void;
export interface EncryptParam { data: string; encrypt?: boolean; encryptOption?: EncryptOption };
export interface StepDataFromRequest {
    message: string;
    stack: string;
    statusCode: number;
    method: Method;
    tags: string[];
    data: string;
    body: {}
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

export type Requests = Request;
export type Responses = Response;
export type NextFunctions = NextFunction;

export {}

declare global {
  namespace Express {
    export interface Request {
      log?: Logs;
    }
  }
}