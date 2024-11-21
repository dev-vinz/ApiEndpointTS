/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                           IMPORTS                           *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import { AxiosInstance } from "axios";

import { DeleteRequest } from "./api/DeleteRequest";
import { GetRequest } from "./api/GetRequest";
import { PostRequest } from "./api/PostRequest";
import { PutRequest } from "./api/PutRequest";

import { IRequest } from "./core/IRequest";
import { RequestOptions } from "./core/RequestOptions";

import { IApiEndpoint } from "./IApiEndpoint";

export class ApiEndpoint implements IApiEndpoint {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                          PROPERTIES                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    private readonly _clients: AxiosInstance[];
    private readonly _options: RequestOptions;

    private _indexBuffer: Int32Array;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                        CONSTRUCTORS                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    constructor(clients: AxiosInstance[], options: RequestOptions) {
        // Inputs
        {
            this._clients = clients;
            this._options = options;
        }

        // Tools
        {
            this._indexBuffer = new Int32Array(
                new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT)
            );
        }
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                           PUBLIC                            *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    public delete<T>(endpoint: string, intoOutput: (_: any) => T): IRequest<T> {
        return new DeleteRequest(
            this._client,
            endpoint,
            intoOutput,
            this._options
        );
    }

    public get<T>(endpoint: string, intoOutput: (_: any) => T): IRequest<T> {
        return new GetRequest(
            this._client,
            endpoint,
            intoOutput,
            this._options
        );
    }

    public post<U, T>(
        endpoint: string,
        body: U,
        intoOutput: (_: any) => T
    ): IRequest<T> {
        return new PostRequest(
            this._client,
            endpoint,
            body,
            intoOutput,
            this._options
        );
    }

    public put<U, T>(
        endpoint: string,
        body: U,
        intoOutput: (_: any) => T
    ): IRequest<T> {
        return new PutRequest(
            this._client,
            endpoint,
            body,
            intoOutput,
            this._options
        );
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                           PRIVATE                           *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /* * * * * * * * * * * * * * * *\
    |*           GETTERS           *|
    \* * * * * * * * * * * * * * * */

    private get _client(): AxiosInstance {
        const index = Atomics.add(this._indexBuffer, 0, 1);

        return this._clients[index % this._clients.length];
    }
}
