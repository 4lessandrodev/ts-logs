import { S3Config, HttpConfig } from "../types";

export const Config = ({
    S3: (config: S3Config ): S3Config => config,
    Http: (config: HttpConfig): HttpConfig => { new URL(config.url); return config }
});

export default Config;
