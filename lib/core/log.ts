import { randomUUID } from "node:crypto";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { Logs, LProps, Steps } from "../types";

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

    addStep(step: Steps): Log {
        return new Log({ ...this, steps: [...this.steps, step ]});
    }

    removeStep(uid: string): Log {
        const steps = this.steps.filter((step) => step.uid !== uid);
        return new Log({ ...this, steps });
    }

    async writeLocal(path?: string): Promise<void> {
        const local = process.cwd();
        const lcl = resolve(path ?? local, 'log.json');
        writeFileSync(lcl, JSON.stringify(this, null, 2), 'utf8');
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
