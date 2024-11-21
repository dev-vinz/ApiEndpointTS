/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                           IMPORTS                           *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import axios, { AxiosInstance } from "axios";

import { IThrottleRequests } from "./core/IThrottleRequests";
import { Logger } from "./core/Logger";
import { RequestOptions } from "./core/RequestOptions";
import { ThrottleRequestsPerSeconds } from "./core/ThrottleRequestsPerSeconds";

import { ApiEndpointError } from "./errors/ApiEndpointError";

import { validateBaseUrl, validateTokens } from "./utils/StringValidator";

import { ApiEndpoint } from "./ApiEndpoint";
import { IApiEndpoint } from "./IApiEndpoint";

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                          CONSTANTS                          *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const DEFAULT_MAX_REQUESTS_PER_SECOND = 10;

/**
 * Builder class for creating an instance of the {@link IApiEndpoint} interface.
 */
export class ApiEndpointBuilder {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                          PROPERTIES                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    private readonly _baseUri: string;
    private readonly _clients: AxiosInstance[];

    private _dateFormat?: string;
    private _logger: (message: string) => void;
    private _maxRequestsPerSecond: number;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                        CONSTRUCTORS                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     * Creates an instance of the {@link ApiEndpointBuilder} class.
     *
     * @param baseUri The base URI of the API endpoint.
     *
     * @throws An {@link ApiEndpointError} if the base URI is null, undefined or empty.
     */
    constructor(baseUri: string) {
        // Validation
        {
            validateBaseUrl(baseUri);
        }

        // Inputs
        {
            this._baseUri = baseUri;
        }

        // Tools
        {
            this._clients = [];
            this._logger = (_) => {};
            this._maxRequestsPerSecond = DEFAULT_MAX_REQUESTS_PER_SECOND;
        }
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                           PUBLIC                            *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /**
     * Adds one or more bearer tokens to the API endpoint.
     *
     * @param bearerTokens The bearer tokens to add to the API endpoint.
     *
     * @returns The current instance of the {@link ApiEndpointBuilder} class.
     *
     * @throws An {@link ApiEndpointError} if no bearer tokens are provided, or if any of the bearer tokens are null, undefined or empty.
     */
    public addBearerTokens(...bearerTokens: string[]): ApiEndpointBuilder {
        // Validate the bearer tokens
        validateTokens(...bearerTokens);

        // Create a client for each bearer token
        bearerTokens.forEach((token) => {
            this._clients.push(this._createBearerClient(token));
        });

        return this;
    }

    /**
     * Builds an instance of the {@link IApiEndpoint} interface.
     * @remark If no secure tokens were provided, a default client will be added.
     *
     * @returns An instance of the {@link IApiEndpoint} interface.
     */
    public build(): IApiEndpoint {
        if (this._clients.length === 0) {
            this._clients.push(axios.create({ baseURL: this._baseUri }));
        }

        // Create the throttle requests
        const throttle: IThrottleRequests = new ThrottleRequestsPerSeconds(
            this._maxRequestsPerSecond,
            this._clients.length
        );

        // Create the logger
        const logger: Logger = new Logger(this._logger);

        // Create the request options
        const options: RequestOptions = new RequestOptions(
            logger,
            throttle,
            this._dateFormat
        );

        return new ApiEndpoint(this._clients, options);
    }

    /**
     * Sets the date format for the API endpoint.
     *
     * @param format The date format to set.
     *
     * @returns The current instance of the {@link ApiEndpointBuilder} class.
     */
    public setDateFormat(format: string): ApiEndpointBuilder {
        this._dateFormat = format;
        return this;
    }

    /**
     * Sets the logger for the API endpoint.
     *
     * @param logger The logger to set.
     *
     * @returns The current instance of the {@link ApiEndpointBuilder} class.
     */
    public setLogger(logger: (message: string) => void): ApiEndpointBuilder {
        this._logger = logger;
        return this;
    }

    /**
     * Sets the maximum number of requests per second for the API endpoint.
     * @remark The requests throttle will limit the number of requests per second among all the clients.
     *
     * @param maxRequestsPerSecond The maximum number of requests per second.
     *
     * @returns The current instance of the {@link ApiEndpointBuilder} class.
     */
    public setRequestsThrottle(
        maxRequestsPerSecond: number
    ): ApiEndpointBuilder {
        this._maxRequestsPerSecond = maxRequestsPerSecond;
        return this;
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                           PRIVATE                           *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    private _createBearerClient(bearerToken: string): AxiosInstance {
        return axios.create({
            baseURL: this._baseUri,
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        });
    }
}
