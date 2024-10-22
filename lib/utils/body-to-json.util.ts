import { CatchError } from "../types";

export const ExtractBodyToJson = (body: CatchError): object | null => {
    try {
        if (typeof body?.toJSON !== 'function') return null;
        return body.toJSON()
    } catch (error) {
        return null
    }
}

export default ExtractBodyToJson;
