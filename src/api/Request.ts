/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                           IMPORTS                           *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import { UrlBuilder } from "@innova2/url-builder";

import { AxiosError, AxiosResponse } from "axios";
import { stringify } from "flatted";
import { StatusCodes } from "http-status-codes";

import { IRequest } from "../core/IRequest";
import { RequestOptions } from "../core/RequestOptions";

import { ApiEndpointError } from "../errors/ApiEndpointError";
import { ApiEndpointErrorMessage } from "../errors/ApiEndpointErrorMessage";

import { validateEndpoint } from "../utils/StringValidator";

export abstract class Request<T> implements IRequest<T> {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                          PROPERTIES                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    private readonly _intoOutput: (_: object) => T;
    private readonly _options: RequestOptions;
    private readonly _urlBuilder: UrlBuilder;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                        CONSTRUCTORS                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    constructor(
        endpoint: string,
        intoOutput: (_: any) => T,
        options: RequestOptions
    ) {
        // Validation
        {
            validateEndpoint(endpoint);
        }

        // Inputs
        {
            this._intoOutput = intoOutput;
            this._options = options;
            this._urlBuilder = new UrlBuilder().addPath(endpoint);
        }

        // Logging
        {
            this._options.logger.info(
                `Created request to endpoint '${endpoint}'.`
            );
        }
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                           PUBLIC                            *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    public addParam(key: string, value: string): IRequest<T> {
        this._urlBuilder.addQueryParam(key, encodeURIComponent(value));
        this._options.logger.info(
            `Added query parameter '${key}' with value '${value}'.`
        );

        return this;
    }

    public abstract execute(): Promise<T>;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                          PROTECTED                          *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    protected async executeRequest(
        sendRequestFunc: () => Promise<AxiosResponse>,
        method: string
    ): Promise<T> {
        const watchStart = Date.now();

        await this._options.throttleRequests.wait();
        this._options.logger.info(
            `${method} ${this.endpoint} throttling ${Date.now() - watchStart}ms`
        );

        const watchRestart = Date.now();

        try {
            const response: AxiosResponse = await sendRequestFunc();

            this._options.logger.info(
                `${method} ${this.endpoint} ${response.status} ${
                    Date.now() - watchRestart
                }ms`
            );

            const content: object = response.data;

            if (response.status === StatusCodes.OK) {
                return this._intoOutput(content);
            } else {
                const msg: ApiEndpointErrorMessage =
                    new ApiEndpointErrorMessage(response.statusText);

                msg.statusCode = response.status;
                msg.errorContent = stringify(content);

                throw new ApiEndpointError(msg);
            }
        } catch (err: unknown) {
            if (err instanceof ApiEndpointError) throw err;

            const error = err as AxiosError;

            const msg: ApiEndpointErrorMessage = new ApiEndpointErrorMessage(
                error?.response?.statusText ??
                    `Deserialization encountered an error while executing ${method} request to '${this.endpoint}'.`
            );

            msg.statusCode =
                error?.response?.status ?? StatusCodes.INTERNAL_SERVER_ERROR;

            if (error.response) {
                msg.errorContent = stringify(error.response.data);
            }

            if (!error.response) {
                msg.innerError = error;
            }

            throw new ApiEndpointError(msg);
        }
    }

    /* * * * * * * * * * * * * * * *\
    |*           GETTERS           *|
    \* * * * * * * * * * * * * * * */

    protected get endpoint(): string {
        return this._urlBuilder.getRelativePath(true, false);
    }
}
