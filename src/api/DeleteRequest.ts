/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                           IMPORTS                           *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import { AxiosInstance } from "axios";

import { RequestOptions } from "../core/RequestOptions";

import { Request } from "./Request";

export class DeleteRequest<T> extends Request<T> {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                          PROPERTIES                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    private readonly _client: AxiosInstance;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                        CONSTRUCTORS                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    constructor(
        client: AxiosInstance,
        endpoint: string,
        intoOutput: (_: any) => T,
        options: RequestOptions
    ) {
        super(endpoint, intoOutput, options);

        // Inputs
        {
            this._client = client;
        }
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                           PUBLIC                            *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    public async execute(): Promise<T> {
        return await this.executeRequest(
            () => this._client.delete(this.endpoint),
            "DELETE"
        );
    }
}
