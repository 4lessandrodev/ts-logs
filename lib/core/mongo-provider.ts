import * as mongo from 'mongodb';
import { LProps, Logs, MongoConfig, Provider, SavePayload } from "../types";
import { GetFolderName } from '../utils';

const MongoProvider: Provider<MongoConfig> = ({
    async save(config: MongoConfig, log: Readonly<Logs>): Promise<SavePayload> {
        const client = new mongo.MongoClient(config.url, config.options);
        const collectionName = GetFolderName(log.name);
        await client.connect();
        await client.db('logs')
            .collection<LProps>(collectionName)
            .updateOne({ uid: log.uid, name: log.name }, { $set: { ...log } }, { upsert: true });
        await client.close();
        return { statusCode: 200, url: log.uid };
    }
});

export default MongoProvider;
