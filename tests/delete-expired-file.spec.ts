import { mkdirSync, writeFileSync, utimesSync, existsSync, rmSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import cron from "../lib/utils/delete-expired-file.util";

describe('cron-expiration-file', () => {
    const dirname = join(__dirname, 'to-delete')

    beforeAll(() => {
        const exists = existsSync(dirname);

        const createFiles = () => {
            mkdirSync(dirname);
            const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
            let index = 0;

            while (index <= 10) {
                const time = Math.trunc((Date.now() - index * ONE_DAY_IN_MS));
                const filePath = join(dirname, `file-${index}`);
                const date = new Date(time).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
                writeFileSync(filePath, date)
                const unixTmsInSec = time / 1000;
                utimesSync(filePath, unixTmsInSec, unixTmsInSec);

                index++;
            };
        }

        if (exists) {
            rmSync(dirname, { recursive: true });
        } else {
            createFiles();
        }
    })

    afterAll(() => {
        rmSync(dirname, { recursive: true });
    })

    it('should verify if directory exists and exist files inside', () => {
        const exists = existsSync(dirname);
        const files = exists ? readdirSync(dirname) : [];

        expect(exists).toBe(true);
        expect(files.length).toBe(11);
    })

    it('should run CronValidateExpirationFile with 1 day', () => {
        const spyCron = jest.spyOn(cron, 'CronValidateExpirationFile')

        cron.CronValidateExpirationFile(1, dirname)

        expect(spyCron).toBeCalledTimes(1)
    });

    it('should verify if directory has one log', () => {
        const files = readdirSync(dirname);

        expect(files.length).toBe(1);
    })

    it('should run CronValidateExpirationFile with day 0', () => {
        const spyCron = jest.spyOn(cron, 'CronValidateExpirationFile')

        cron.CronValidateExpirationFile(0, dirname)

        expect(spyCron).toBeCalledTimes(1)
    });

    it('should verify if directory is empty', () => {
        const files = readdirSync(dirname);

        expect(files.length).toBe(0);
    })
})