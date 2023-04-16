import { Log } from "./log";

/**
 * @description Global log instance
 */
export abstract class GlobalLog {
    private static instance: Log;

    /**
     * @description Get or Create a log singleton instance
     * @param props as options to define id and name for log object.
     * @returns instance of Log.
     */
    public static singleton(props?: { uid?: string, name?: string }): Log {
        if(!GlobalLog.instance){
            const name = props?.name ?? 'global-log';
            const uid = props?.uid;
            GlobalLog.instance = Log.init({ name, uid }) as Log;
        }
        return GlobalLog.instance;
    }
}

export default GlobalLog;
