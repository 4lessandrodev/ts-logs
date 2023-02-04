import * as axios from 'axios';
import { Http, HttpConfig, Logs, Provider, SavePayload } from "../types";

const HttProvider: Provider<HttpConfig> = ({
    async save(config: HttpConfig, log: Readonly<Logs>): Promise<SavePayload> {
        const http = axios as unknown as Http;
        const url = typeof config.url === 'string' ? new URL(config.url) : config.url;
        const result = await http.post(url.toString(), log, { headers: config.headers });
        return { statusCode: result.status ?? 200, url: url.toString() };
    }
});

export default HttProvider;
