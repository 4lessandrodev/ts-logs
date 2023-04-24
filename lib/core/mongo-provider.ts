import * as mongo from 'mongodb';
import { LProps, Logs, MongoConfig, Provider, SavePayload } from "../types";
import { GetFolderName } from '../utils';

const MongoProvider: Provider<MongoConfig> = ({
    async save(config: MongoConfig, log: Readonly<Logs>): Promise<SavePayload> {
        const ONE_DAY = 86400;
        const expireAfterSeconds = (config?.expireAfterDays ?? 30) * ONE_DAY;
        const client = new mongo.MongoClient(config.url, config.options);
        const collectionName = GetFolderName(log.name);
        await client.connect();

        await client.db('logs')
            .collection<LProps>(collectionName)
            .createIndex({ "createdAt": 1 }, { expireAfterSeconds });

        await client.db('logs')
            .collection<LProps>(collectionName)
            .createIndex({ "uid": 1, 'name': 1 });

        await client.db('logs')
            .collection<LProps>(collectionName)
            .updateOne({ uid: log.uid, name: log.name }, { $set: { ...log } }, { upsert: true });

        await client.close();
        return { statusCode: 200, url: log.uid };
    }
});

export default MongoProvider;
