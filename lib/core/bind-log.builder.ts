import { Log } from "./log";
import { Binder } from "../types";
import getLogDataFromRequest from "../utils/get-log-data-from-request.util";

/**
 * @description Bind log instance to request.
 * @returns execute next()
 * @summary you can access log from request like example:
 * @example req.log
 */
export const bindLog = (): Binder => {
    return (req: any, _: any, next: any) => {
        const { name, ip, origin, uid } = getLogDataFromRequest(req);
        req.log = Log.init({ name, ip, origin, uid })
        next();
    }
}

export default bindLog;
