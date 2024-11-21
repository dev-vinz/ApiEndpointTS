/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                           IMPORTS                           *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import { StatusCodes } from "http-status-codes";

/**
 * Class representing an error message from an API endpoint.
 */
export class ApiEndpointErrorMessage {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                          PROPERTIES                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    private _statusCode?: StatusCodes;
    private _message: string;
    private _errorContent?: string;
    private _innerError?: Error;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                        CONSTRUCTORS                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     * Creates an instance of ApiEndpointErrorMessage.
     * @param message The error message.
     */
    constructor(message: string) {
        // Inputs
        {
            this._message = message;
        }
    }

    /* * * * * * * * * * * * * * * *\
    |*           GETTERS           *|
    \* * * * * * * * * * * * * * * */

    /**
     * The status code of the error message.
     */
    public get statusCode(): StatusCodes | undefined {
        return this._statusCode;
    }

    /**
     * The error message.
     */
    public get message(): string {
        return this._message;
    }

    /**
     * An additional content to the error message, provided by the API endpoint.
     */
    public get errorContent(): string | undefined {
        return this._errorContent;
    }

    /**
     * The inner error that caused the error message.
     */
    public get innerError(): Error | undefined {
        return this._innerError;
    }

    /* * * * * * * * * * * * * * * *\
    |*           SETTERS           *|
    \* * * * * * * * * * * * * * * */

    /**
     * The status code of the error message.
     */
    public set statusCode(statusCode: StatusCodes | undefined) {
        this._statusCode = statusCode;
    }

    /**
     * An additional content to the error message, provided by the API endpoint.
     */
    public set errorContent(errorContent: string | undefined) {
        this._errorContent = errorContent;
    }

    /**
     * The inner error that caused the error message.
     */
    public set innerError(innerError: Error | undefined) {
        this._innerError = innerError;
    }
}
