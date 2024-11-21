/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                           IMPORTS                           *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import { IThrottleRequests } from "./IThrottleRequests";
import { Logger } from "./Logger";

export class RequestOptions {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                          PROPERTIES                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    private readonly _dateFormat?: string;
    private readonly _logger: Logger;
    private readonly _throttleRequests: IThrottleRequests;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                        CONSTRUCTORS                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    constructor(
        logger: Logger,
        throttleRequests: IThrottleRequests,
        dateFormat?: string
    ) {
        // Inputs
        {
            this._dateFormat = dateFormat;
            this._logger = logger;
            this._throttleRequests = throttleRequests;
        }
    }

    /* * * * * * * * * * * * * * * *\
    |*           GETTERS           *|
    \* * * * * * * * * * * * * * * */

    public get dateFormat(): string | undefined {
        return this._dateFormat;
    }

    public get logger(): Logger {
        return this._logger;
    }

    public get throttleRequests(): IThrottleRequests {
        return this._throttleRequests;
    }
}
