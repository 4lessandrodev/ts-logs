import { AutoPublishOptions, Requests, Responses } from "../types";

export const canAutoPublish = (req: Requests, res: Responses, options?: AutoPublishOptions): boolean => {
    if(!req?.log) return false;
    if(
        options && typeof options.publishWhenStatus === 'function' && 
        !options.publishWhenStatus(res.statusCode)
    ){
        return false;
    }
    if(!req.log.hasSteps()) return false;
    return true;
}
export default canAutoPublish;
