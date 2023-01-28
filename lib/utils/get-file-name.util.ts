/**
 * @description Create log file name applying date on name.
 * @param date as Date instance as time log was created.
 * @returns name as string. Generated name
 */
export const GetFileName = (date: Date): string => {
    const time = (date instanceof Date) ? date : new Date();
    const year = time.getUTCFullYear();
    const monthNumber = time.getUTCMonth() + 1;
    const month = monthNumber >= 10 ? monthNumber : '0' + monthNumber;
    const day = time.getUTCDate();
    return `log-${year}-${month}-${day}.txt`;
}

export default GetFileName;
