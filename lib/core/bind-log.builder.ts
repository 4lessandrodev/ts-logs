import { Log } from "./log";
import { Binder } from "../types";
import getLogDataFromRequest from "../utils/get-log-data-from-request.util";
import { NextFunction, Request, Response } from "express";

/**
 * @description Bind log instance to request.
 * @returns execute next()
 * @summary you can access log from request like example:
 * @example req.log
 */
export const bindLog = (): Binder => {
    return (req: Request, _: Response, next: NextFunction): void => {
        const { name, ip, origin, uid } = getLogDataFromRequest(req);
        req.log = Log.init({ name, ip, origin, uid })
        next();
    }
}

export default bindLog;
