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

    private _currentIndex: number = 0;
    private _lock: boolean = false;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                        CONSTRUCTORS                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    constructor(clients: AxiosInstance[], options: RequestOptions) {
        // Inputs
        {
            this._clients = clients;
            this._options = options;
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

    private _acquireLock(): void {
        while (this._lock) {
            // Wait
        }

        this._lock = true;
    }

    private _releaseLock(): void {
        this._lock = false;
    }

    /* * * * * * * * * * * * * * * *\
    |*           GETTERS           *|
    \* * * * * * * * * * * * * * * */

    private get _client(): AxiosInstance {
        this._acquireLock();
        const index = this._currentIndex++;
        this._releaseLock();

        return this._clients[index % this._clients.length];
    }
}
