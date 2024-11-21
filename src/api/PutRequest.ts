/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                           IMPORTS                           *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import { AxiosInstance } from "axios";

import { RequestOptions } from "../core/RequestOptions";

import { Request } from "./Request";

export class PutRequest<U, T> extends Request<T> {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                          PROPERTIES                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    private readonly _client: AxiosInstance;
    private readonly _body: U;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                        CONSTRUCTORS                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    constructor(
        client: AxiosInstance,
        endpoint: string,
        body: U,
        intoOutput: (_: any) => T,
        options: RequestOptions
    ) {
        super(endpoint, intoOutput, options);

        // Inputs
        {
            this._client = client;
            this._body = body;
        }
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                           PUBLIC                            *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    public async execute(): Promise<T> {
        return await this.executeRequest(
            () => this._client.put(this.endpoint, this._body),
            "PUT"
        );
    }
}
