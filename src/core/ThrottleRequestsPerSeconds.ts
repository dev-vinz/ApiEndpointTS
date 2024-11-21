/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                           IMPORTS                           *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import { IThrottleRequests } from "./IThrottleRequests";

export class ThrottleRequestsPerSeconds implements IThrottleRequests {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                          PROPERTIES                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    private readonly _delayBetweenCalls: number;
    private readonly _lock: Promise<void>;

    private _nextAllowedTime: number;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                        CONSTRUCTORS                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    constructor(requestsPerSecond: number, nbClients: number) {
        // Inputs
        {
            this._delayBetweenCalls = 1000 / (requestsPerSecond * nbClients);
        }

        // Tools
        {
            this._lock = Promise.resolve();
            this._nextAllowedTime = Date.now();
        }
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                           PUBLIC                            *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    public async wait(): Promise<void> {
        let delay = 0;

        // Lock logic to prevent race conditions
        await this._lock;

        const currentTime = Date.now();

        if (this._nextAllowedTime <= currentTime) {
            // If no waiting is needed, move the next allowed time forward
            this._nextAllowedTime = currentTime + this._delayBetweenCalls;
        } else {
            // Calculate the required delay and update the next allowed time
            delay = this._nextAllowedTime - currentTime;
            this._nextAllowedTime += this._delayBetweenCalls;
        }

        // Wait if delay is required
        if (delay > 0) {
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
}
