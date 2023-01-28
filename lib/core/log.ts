import { randomUUID } from "node:crypto";
import { Logs, LProps, Steps } from "../types";
import WriteDefaultLocal from "../utils/write-default-local.util";

export class Log implements Logs {
    readonly uid!: string;
    readonly name!: string;
    readonly ip!: string;
    readonly origin!: string;
    readonly createdAt!: Date;
    readonly steps!: Readonly<Steps[]>;

    private constructor(props: Partial<LProps>) {
        this.uid = props.uid ?? randomUUID();
        this.name = props.name ?? 'default';
        this.ip = props.ip ?? 'none';
        this.origin = props.origin ?? 'none';
        this.createdAt = new Date();
        this.steps = props.steps ?? [];
        Object.freeze(this);
    }

    public static init(props: Partial<LProps> & { name: string; uid: string }): Readonly<Logs> {
        return new Log(props);
    }

    /**
     * @description Create a new instance of Log with ip attribute. This is an immutable instance, the method does not change state, it returns a new one.
     * @param ip as request origin address
     * @returns instance of Log with ip address set
     */
    setIp(ip: string): Readonly<Logs> {
        return new Log({ ...this, ip });
    }

    /**
     * @description Create a new instance of Log with url attribute. This is an immutable instance, the method does not change state, it returns a new one.
     * @param url as request origin url address
     * @returns instance of Log with url address set
     */
    setOrigin(url: string): Readonly<Logs> {
        return new Log({ ...this, origin: url });
    }

    /**
     * @description Define log name. This attribute is used to create a folder name on store local.
     * @param name log name as string
     * @returns instance of Log with log name set
     */
    setName(name: string): Readonly<Logs> {
        return new Log({ ...this, name });
    }

    /**
     * @description Add a log step to instance.
     * @param step as instance of Step.
     * @returns instance of Log with added step.
     */
    addStep(step: Steps): Readonly<Logs> {
        return new Log({ ...this, steps: [...this.steps, step] });
    }

    /**
     * @description Add a log step to instance.
     * @param step as instance of Step.
     * @returns instance of Log with added step.
     */
    addSteps(steps: Steps[]): Readonly<Logs> {
        return new Log({ ...this, steps: [...this.steps, ...steps] });
    }

    /**
     * @description Remove a log step from instance.
     * @param uid as step uid to identify what step to remove.
     * @returns instance of Log without removed step.
     */
    removeStep(uid: string): Readonly<Logs> {
        const steps = this.steps.filter((step) => step.uid !== uid);
        return new Log({ ...this, steps });
    }

    /**
     * @description Save logs locally where the app is running
     * @param path absolute path of the folder where the file will be saved.
     * @returns 
     * @emits fileName: Omit the file name as the file name is defined based on the log name plus creation date
     * @example path: "/home/user/my-app/logs"
     * @default path: "/[app-folder]/logs/[log-name]-[year]-[month]-[day].txt".
     * @throws If an error occurs in the local saving process, the logs will be displayed on the standard output (terminal)
     */
    async writeLocal(path?: string): Promise<void> {
        try {
            return WriteDefaultLocal(this, path);
        } catch (error) {
            return this.print();
        }
    }

    print(): void {
        const { name, uid, ip, origin, createdAt } = this;
        console.info(JSON.stringify({ name, uid, ip, origin, createdAt }));
        let i = 0;
        while (this.steps[i]) {
            const step = this.steps[i];
            console.info(JSON.stringify(step));
            i++;
        }
    }

    /**
     * @todo implement provider to publish on
     * @external firebase
     * @external aws-s3
     * @external mongodb
     * @external redis
     */
    async publish(): Promise<void> {
        console.log("publishing...");
    }
}

export default Log;
