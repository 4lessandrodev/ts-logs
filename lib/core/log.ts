import { randomUUID } from "node:crypto";
import { Logs, LProps, Steps } from "../types";
import WriteDefaultLocal from "../utils/write-default-local.util";

export class Log implements Logs {
    uid!: string;
    name!: string;
    ip!: string;
    origin!: string;
    createdAt!: Date;
    steps!: Steps[];

    private constructor(props: Partial<LProps>){
        this.uid = props.uid ?? randomUUID();
        this.name = props.name ?? 'default';
        this.ip = props.ip ?? 'none';
        this.origin = props.origin ?? 'none';
        this.createdAt = new Date();
        this.steps = props.steps ?? [];
    }

    public static init(props: Partial<LProps> & { name: string; uid: string }): Log {
        return new Log(props);
    }

    setIp(ip: string): Log {
        return new Log({ ...this, ip });
    }

    setOrigin(url: string): Logs {
        return new Log({ ...this, origin: url });
    }

    setName(name: string): Logs {
        return new Log({ ...this, name });
    }

    addStep(step: Steps): Log {
        return new Log({ ...this, steps: [...this.steps, step ]});
    }

    removeStep(uid: string): Log {
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
        while(this.steps[i]){
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
