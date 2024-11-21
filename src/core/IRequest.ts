/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                           IMPORTS                           *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import { ApiEndpointError } from "../errors/ApiEndpointError";

/**
 * Represents a request to an API endpoint.
 * @template T The type of the response object.
 */
export interface IRequest<T> {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                           PUBLIC                            *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     * Adds a parameter to the request.
     *
     * @param key The key of the parameter.
     * @param value The value of the parameter.
     *
     * @returns The request object.
     */
    addParam(key: string, value: string): IRequest<T>;

    /**
     * Executes the request.
     *
     * @returns A promise that resolves to the response object.
     * @throws An {@link ApiEndpointError} if the request fails.
     */
    execute(): Promise<T>;
}
