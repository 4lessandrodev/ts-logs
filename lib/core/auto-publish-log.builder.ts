import CanAutoPublish from "../utils/can-auto-publish.util";
import { AutoPublishOptions, NextFunctions, PublishConfig } from "../types";
import { PublisherMiddleware, Requests, Responses } from "../types";

/**
 * @description Add middleware to listen response and publish log when status match if options.
 * @param config connection configuration to connect on provider.
 * @param options option to check status before publish. You can define publish log only when status match with options.
 * @returns middleware to apply.
 * @default publishWhenStatus every statusCode.
 * @default publish only when exist some step on log.
 */
export const autoPublishLog = (config: PublishConfig, options?: AutoPublishOptions): PublisherMiddleware => {
    return async (req: Requests, res: Responses, next: NextFunctions): Promise<void> => {
        res.on('finish', async (): Promise<void> => { 
            const canPublish = CanAutoPublish(req, res, options);
            if(!canPublish) return next();
            await req?.log?.publish(config);
            return next();
        });
        return next();
    }
}
export default autoPublishLog;
