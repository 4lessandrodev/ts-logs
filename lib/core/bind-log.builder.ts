import { Log } from "./log";
import { BinderMiddleware, NextFunctions, Requests, Responses } from "../types";
import getLogDataFromRequest from "../utils/get-log-data-from-request.util";

/**
 * @description Bind log instance to request.
 * @returns execute next()
 * @summary you can access log from request like example:
 * @example req.log
 */
export const bindLog = (): BinderMiddleware => {
    return (req: Requests, _: Responses, next: NextFunctions): void => {
        const { name, ip, origin, uid } = getLogDataFromRequest(req);
        req.log = Log.init({ name, ip, origin, uid })
        next();
    }
}

export default bindLog;
