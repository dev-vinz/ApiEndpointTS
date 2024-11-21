/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                           IMPORTS                           *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import { ApiEndpointErrorMessage } from "./ApiEndpointErrorMessage";

/**
 * Error thrown when an API endpoint fails.
 */
export class ApiEndpointError extends Error {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                          PROPERTIES                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    private readonly _error: ApiEndpointErrorMessage;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                        CONSTRUCTORS                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     * Creates a new instance of ApiEndpointError.
     * @param error The error message returned by the API endpoint.
     */
    constructor(error: ApiEndpointErrorMessage) {
        super(error.message);

        // Inputs
        {
            this._error = error;
        }

        // Tools
        {
            Object.setPrototypeOf(this, ApiEndpointError.prototype);
            this.name = ApiEndpointError.name;
        }
    }

    /* * * * * * * * * * * * * * * *\
    |*           GETTERS           *|
    \* * * * * * * * * * * * * * * */

    /**
     * The error message returned by the API endpoint.
     */
    public get error(): ApiEndpointErrorMessage {
        return this._error;
    }
}
