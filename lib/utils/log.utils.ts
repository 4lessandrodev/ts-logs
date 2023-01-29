
export const TerminalLog = (message: string): void => {
    process.stdout.write.bind(process.stdout)(message);
}
export default TerminalLog;
