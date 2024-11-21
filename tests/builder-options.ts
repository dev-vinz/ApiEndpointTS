/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                           IMPORTS                           *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import {
    ApiEndpointBuilder,
    ApiEndpointError,
    IApiEndpoint,
    IRequest,
    StatusCodes,
} from "../src";

import { HttpBinBearerResponse } from "./models/HttpBinBearerResponse";

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                        CONFIGURATION                        *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const bearerToken = "my-sup3r-s3cr3t-t0k3n";

// Build the api endpoint
const withBearer: IApiEndpoint = new ApiEndpointBuilder("https://httpbin.org/") //
    .addBearerTokens(bearerToken)
    .build();

const withoutBearer: IApiEndpoint = new ApiEndpointBuilder(
    "https://httpbin.org/"
).build();

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                            TESTS                            *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

test("Check authorization is granted when providing a Bearer token", async () => {
    // Build the request
    const request: IRequest<HttpBinBearerResponse> = withBearer.get(
        "/bearer",
        createHttpBinBearerResponse
    );

    // Execute the request
    const response: HttpBinBearerResponse = await request.execute();

    // Check the response
    expect(response).not.toBeNull();
    expect(response.isAuthenticated).toBe(true);
    expect(response.token).toBe(bearerToken);
});

test("Check ApiEndpointError is thrown when missing bearer token", async () => {
    // Build the request
    const request: IRequest<HttpBinBearerResponse> = withoutBearer.get(
        "/bearer",
        createHttpBinBearerResponse
    );

    try {
        // Execute the request
        await request.execute();
        fail("The request should have failed.");
    } catch (err) {
        // Check the error
        expect(err).toBeInstanceOf(ApiEndpointError);

        const error: ApiEndpointError = err as ApiEndpointError;

        expect(error.error?.statusCode).toBe(StatusCodes.UNAUTHORIZED);
    }
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                       USEFUL FUNCTIONS                      *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function createHttpBinBearerResponse(data: any): HttpBinBearerResponse {
    return new HttpBinBearerResponse(data.authenticated, data.token);
}
