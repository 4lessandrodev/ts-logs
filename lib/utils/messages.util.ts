import { FnTypes } from "../types";
import BuildDebugMessage from "./build-debug-message.util";
import BuildDefaultMessage from "./build-default-message.util";
import BuildErrorMessage from "./build-error-message.util";
import BuildFatalMessage from "./build-fatal-message.util";
import BuildInfoMessage from "./build-info-message.util";
import BuildStackMessage from "./build-stack-message.util";
import BuildWarnMessage from "./build-warn-message.util";

export const Messages: FnTypes = {
    error: BuildErrorMessage,
    info: BuildInfoMessage,
    warn: BuildWarnMessage,
    debug: BuildDebugMessage,
    fatal: BuildFatalMessage,
    stack: BuildStackMessage,
    default: BuildDefaultMessage
};

export default Messages;
