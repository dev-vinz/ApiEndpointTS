/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                           IMPORTS                           *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import { IRequest } from "./core/IRequest";

import { ApiEndpointError } from "./errors/ApiEndpointError";

/**
 * Interface for API endpoints.
 */
export interface IApiEndpoint {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                           PUBLIC                            *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     * Sends a DELETE request to the specified endpoint.
     *
     * @template T The type of the response object.
     * @param endpoint The endpoint to send the request to.
     * @param intoOutput A function that converts the response object into the desired output.
     *
     * @returns An {@link IRequest} object that represents the DELETE request.
     *
     * @throws An {@link ApiEndpointError} if the endpoint is null, invalid or if the request fails.
     */
    delete<T>(endpoint: string, intoOutput: (_: any) => T): IRequest<T>;

    /**
     * Sends a GET request to the specified endpoint.
     *
     * @template T The type of the response object.
     * @param endpoint The endpoint to send the request to.
     * @param intoOutput A function that converts the response object into the desired output.
     *
     * @returns An {@link IRequest} object that represents the GET request.
     *
     * @throws An {@link ApiEndpointError} if the endpoint is null, invalid or if the request fails.
     */
    get<T>(endpoint: string, intoOutput: (_: any) => T): IRequest<T>;

    /**
     * Sends a POST request to the specified endpoint.
     *
     * @template U The type of the request body.
     * @template T The type of the response object.
     * @param endpoint The endpoint to send the request to.
     * @param body The body of the request.
     * @param intoOutput A function that converts the response object into the desired output.
     *
     * @returns An {@link IRequest} object that represents the POST request.
     *
     * @throws An {@link ApiEndpointError} if the endpoint is null, invalid or if the request fails.
     */
    post<U, T>(
        endpoint: string,
        body: U,
        intoOutput: (_: any) => T
    ): IRequest<T>;

    /**
     * Sends a PUT request to the specified endpoint.
     *
     * @template U The type of the request body.
     * @template T The type of the response object.
     * @param endpoint The endpoint to send the request to.
     * @param body The body of the request.
     * @param intoOutput A function that converts the response object into the desired output.
     *
     * @returns An {@link IRequest} object that represents the PUT request.
     *
     * @throws An {@link ApiEndpointError} if the endpoint is null, invalid or if the request fails.
     */
    put<U, T>(
        endpoint: string,
        body: U,
        intoOutput: (_: any) => T
    ): IRequest<T>;
}
