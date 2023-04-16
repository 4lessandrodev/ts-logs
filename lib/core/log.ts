import { randomUUID } from "node:crypto";
import { HttpConfig, Locale, LocalOpt, Logs, LProps, S3Config, Steps, LogStateType } from "../types";
import WriteDefaultLocal from "../utils/write-default-local.util";
import BuildLogMessage from "../utils/build-log-message.util";
import { DeleteExpiredFile } from "../utils/delete-expired-file.util";
import TerminalLog from "../utils/log.utils";
import S3Provider from "./s3-provider";
import { SavePayload } from "../types";
import HttProvider from "./http-provider";
import { GetLogsDirname } from "../utils/get-logs-dirname.util";

/**
 * @description Global log to manage steps and behavior.
 * @summary Create a global log and added steps, print or publish result.
 * @summary Check `stateType` option.
 * It defines the behavior of the state. Whether to change state or return a new instance without changing original state.
 * If `stateType` is defined as `stateful` the original state of log will be changed. If `stateType` is defined as `stateless`
 * a new instance of Log will be created and returned without change the original state.
 * @default `stateType` is `stateful`
*/
export class Log implements Logs {
    uid!: string | Readonly<string>;
    name!: string | Readonly<string>;
    ip!: string | Readonly<string>;
    origin!: string | Readonly<string>;
    createdAt!: Date | Readonly<Date>;
    steps!: Readonly<Steps[]> | Steps[];
    /**
     * @description Defines the behavior of the state. Whether to change state or return a new instance without changing original state.
     */
    readonly stateType!: LogStateType;

    private constructor({ stateType, ...props }: Partial<LProps>) {
        this.uid = props.uid ?? randomUUID();
        this.name = props.name ?? 'default';
        this.ip = props.ip ?? 'none';
        this.origin = props.origin ?? 'none';
        this.createdAt = new Date();
        this.stateType = stateType ?? 'stateful';
        const statefulArr = props.steps ? [...props.steps] : [];
        const statelessArr = Object.freeze(props.steps ?? []);
        const isStateful = typeof stateType === 'undefined' || stateType === 'stateful';
        this.steps = isStateful ? statefulArr : statelessArr;
        !isStateful && Object.freeze(this);
    }

    /**
     * @description Create a new global log.
     * @param props as Partial LProps
     * @returns instance of Log
     */
    public static init(props: Partial<LProps> & { name: string; }): Readonly<Logs> | Logs {
        return new Log(props);
    }

    /**
     * @description Create a new global log changing stateType.
     * @param stateType as LogStateType
     * @returns instance of Log
     */
    public clone(stateType: LogStateType): Readonly<Logs> | Logs {
        return new Log({ ...this, stateType });
    }


    /**
     * @description Check if exist some step for log.
     * @returns true if exist some step and return false if step is empty.
     */
    hasSteps(): boolean {
        return this.steps.length > 0;
    }

    /**
     * @description Create a new instance of Log with ip attribute. This is an immutable instance, the method does not change state, it returns a new one.
     * @param ip as request origin address
     * @returns instance of Log with ip address set
     * @summary Check `stateType` option.
     * It defines the behavior of the state. Whether to change state or return a new instance without changing original state.
     * If `stateType` is defined as `stateful` the original state of log will be changed. If `stateType` is defined as `stateless`
     * a new instance of Log will be created and returned without change the original state.
     * @default `stateType` is `stateful`
     */
    setIp(ip: string): Readonly<Logs> | Logs {
        if (this.stateType === 'stateful') {
            this.ip = ip;
            return this;
        }
        return new Log({ ...this, ip });
    }

    /**
     * @description Create a new instance of Log with url attribute. This is an immutable instance, the method does not change state, it returns a new one.
     * @param url as request origin url address
     * @returns instance of Log with url address set
     * @summary Check `stateType` option.
     * It defines the behavior of the state. Whether to change state or return a new instance without changing original state.
     * If `stateType` is defined as `stateful` the original state of log will be changed. If `stateType` is defined as `stateless`
     * a new instance of Log will be created and returned without change the original state.
     * @default `stateType` is `stateful`
     */
    setOrigin(url: string): Readonly<Logs> | Logs {
        if (this.stateType === 'stateful') {
            this.origin = url;
            return this;
        }
        return new Log({ ...this, origin: url });
    }

    /**
     * @description Define log name. This attribute is used to create a folder name on store local.
     * @param name log name as string
     * @returns instance of Log with log name set
     * @summary Check `stateType` option.
     * It defines the behavior of the state. Whether to change state or return a new instance without changing original state.
     * If `stateType` is defined as `stateful` the original state of log will be changed. If `stateType` is defined as `stateless`
     * a new instance of Log will be created and returned without change the original state.
     * @default `stateType` is `stateful`
     */
    setName(name: string): Readonly<Logs> | Logs {
        if (this.stateType === 'stateful') {
            this.name = name
            return this;
        }
        return new Log({ ...this, name });
    }

    /**
     * @description Add a log step to instance.
     * @param step as instance of Step.
     * @returns instance of Log with added step.
     * @summary Check `stateType` option.
     * It defines the behavior of the state. Whether to change state or return a new instance without changing original state.
     * If `stateType` is defined as `stateful` the original state of log will be changed. If `stateType` is defined as `stateless`
     * a new instance of Log will be created and returned without change the original state.
     * @default `stateType` is `stateful`
     */
    addStep(step: Readonly<Steps>): Readonly<Logs> | Logs {
        if (this.stateType === 'stateful') {
            this.steps = [...this.steps, step];
            return this;
        }
        return new Log({ ...this, steps: [...this.steps, step] });
    }

    /**
     * @description Add a log step to instance.
     * @param step as instance of Step.
     * @returns instance of Log with added step.
     * @summary Check `stateType` option.
     * It defines the behavior of the state. Whether to change state or return a new instance without changing original state.
     * If `stateType` is defined as `stateful` the original state of log will be changed. If `stateType` is defined as `stateless`
     * a new instance of Log will be created and returned without change the original state.
     * @default `stateType` is `stateful`
     */
    addSteps(steps: Readonly<Steps[]>): Readonly<Logs> | Logs {
        if (this.stateType === 'stateful') {
            this.steps = [...this.steps, ...steps];
            return this;
        }
        return new Log({ ...this, steps: [...this.steps, ...steps] });
    }

    /**
     * @description Remove a log step from instance.
     * @param uid as step uid to identify what step to remove.
     * @returns instance of Log without removed step.
     * @summary Check `stateType` option.
     * It defines the behavior of the state. Whether to change state or return a new instance without changing original state.
     * If `stateType` is defined as `stateful` the original state of log will be changed. If `stateType` is defined as `stateless`
     * a new instance of Log will be created and returned without change the original state.
     * @default `stateType` is `stateful`
     */
    removeStep(uid: string): Readonly<Logs> | Logs {
        const steps = this.steps.filter((step): boolean => step.uid !== uid);
        if (this.stateType === 'stateful') {
            this.steps = steps;
            return this;
        }
        return new Log({ ...this, steps });
    }

    /**
     * @description Save logs locally where the app is running
     * @param path absolute path of the folder where the file will be saved.
     * @returns 
     * @emits fileName: Omit the file name as the file name is defined based on the log name plus creation date
     * @example path: "/home/user/my-app/logs"
     * @default path: "/[app-folder]/logs/[log-name]-[year]-[month]-[day].log".
     * @throws If an error occurs in the local saving process, the logs will be displayed on the standard output (terminal)
     */
    async writeLocal(path?: string): Promise<void> {
        try {
            return WriteDefaultLocal(this, path);
        } catch (error) {
            TerminalLog((error as Error).message + '\n');
            return this.print();
        }
    }

    /**
     * @description Print log and all steps on terminal.
     * @param locales as LocalesArgument to format date.
     * @param options as DateTimeFormatOptions to format date.
     */
    print(locales?: Locale, options?: LocalOpt): void {
        const message = BuildLogMessage(this, locales, options);
        TerminalLog(message);
    }

    /**
     * @description Publish log using a provider.
     * @requires provider as `S3Config` or `HttpConfig` you can provide it using CONFIG @see example below.
     * @todo implement provider to publish on
     * @external aws-s3
     * @external http
     * @example
     * 
     * import { Config, Log } from 'ts-logs';
     * 
     * const httpConfig = Config.Http({ url: "https://domain.com/logs" });
     * 
     * const log = Log.init({ name: "test..." });
     * 
     * const result = await log.publish(httpConfig);
     * 
     * console.log(result.statusCode);
     * 
     * > 200
     * 
     */
    async publish(config: S3Config | HttpConfig): Promise<SavePayload | null> {
        try {
            if ((config as S3Config)?.bucketName && (config as S3Config)?.region && (config as S3Config)?.credentials) {
                return S3Provider.save(config as S3Config, this);
            }
            if ((config as HttpConfig)?.url) {
                return HttProvider.save(config as HttpConfig, this);
            }
            return null;
        } catch (error) {
            TerminalLog(`error on publish...${(error as Error).message}\n`);
            return null;
        }
    }

    /**
     * @description Delete expired files based in 'days' params.
     * @param days as integer.
     * @param dirname as string.
     */
    rmLogs(days: number, dirname?: string): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const dir = GetLogsDirname(this.name, dirname);
                DeleteExpiredFile(days, dir);
                resolve();
            } catch (error) {
                TerminalLog(`error on delete expired files...${(error as Error).message}\n`);
                reject(error);
            }
        });
    }

    /**
     * @description Delete all steps from log instance.
     * @summary If statetype is defined as `stateful` the original state will be replaced.
     * @summary If statetype is defined as `stateless` a new instance will be created and the original state will not be changed.
     * @returns instance of Log
     */
    clearSteps(): Logs | Readonly<Logs> {
        if (this.stateType === 'stateful') {
            this.steps = [];
            return this;
        }
        return new Log({ ...this, steps: [] });
    }
}

export default Log;
