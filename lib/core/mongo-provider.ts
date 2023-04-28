import * as mongo from 'mongodb';
import { LProps, Logs, MongoConfig, Provider, SavePayload } from "../types";
import { GetFolderName } from '../utils';

const MongoProvider: Provider<MongoConfig> = ({
    async save(config: MongoConfig, log: Readonly<Logs>): Promise<SavePayload> {
        const ONE_DAY = 86400;
        const expireAfterSeconds = (config?.expireAfterDays ?? 30) * ONE_DAY;
        const client = new mongo.MongoClient(config.url, config.options);
        const collectionName = GetFolderName(log.name);
        const indexes: mongo.IndexDescription[] = [
            { key: { "createdAt": 1 }, expireAfterSeconds },
            { key: { "uid": 1, 'name': 1 } }
        ];

        await client.connect();

        const collection = client.db('logs')
            .collection<LProps>(collectionName);

        const filter: mongo.Filter<LProps> = { uid: log.uid, name: log.name };
        const update: mongo.UpdateFilter<LProps> = {
            $set: {
                createdAt: log.createdAt,
                ip: log.ip, name: log.name,
                origin: log.origin,
                stateType: log.stateType,
                uid: log.uid
            },
            $push: { steps: { $each: [...log.steps] } }
        };

        try { await collection.createIndexes(indexes) } catch (error) { };

        try {
            await collection.updateOne(filter, update, { upsert: true });
        } catch (error) {
            return { statusCode: 400, url: (error as Error).message };
        } finally {
            await client.close();
        }
        return { statusCode: 200, url: log.uid };
    }
});

export default MongoProvider;
