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

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                        CONFIGURATION                        *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Build the api endpoint
const endpoint: IApiEndpoint = new ApiEndpointBuilder("https://httpbin.org/") //
    .build();

const statusCodes = Object.values(StatusCodes).filter(
    (code) => typeof code === "number" && code >= 400
);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                            TESTS                            *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

test("Check ApiEndpointError is thrown when base URI is empty", () => {
    expect(() => new ApiEndpointBuilder("")).toThrow(ApiEndpointError);
});

test("Check ApiEndpointError is thrown when base URI contains spaces", () => {
    expect(() => new ApiEndpointBuilder(" ")).toThrow(ApiEndpointError);
});

test("Check ApiEndpointError is thrown when base URI is null", () => {
    expect(() => new ApiEndpointBuilder(null as any)).toThrow(ApiEndpointError);
});

test("Check ApiEndpointError is thrown when base URI is undefined", () => {
    expect(() => new ApiEndpointBuilder(undefined as any)).toThrow(
        ApiEndpointError
    );
});

test("Check ApiEndpointError is thrown when endpoint is empty", () => {
    expect(() => endpoint.get("", (_) => _)).toThrow(ApiEndpointError);
});

test("Check ApiEndpointError is thrown when endpoint contains spaces", () => {
    expect(() => endpoint.get(" ", (_) => _)).toThrow(ApiEndpointError);
});

test("Check ApiEndpointError is thrown when endpoint is null", () => {
    expect(() => endpoint.get(null as any, (_) => _)).toThrow(ApiEndpointError);
});

test("Check ApiEndpointError is thrown when endpoint is undefined", () => {
    expect(() => endpoint.get(undefined as any, (_) => _)).toThrow(
        ApiEndpointError
    );
});

test("Check ApiEndpointError is thrown when endpoint does not start with '/'", () => {
    expect(() => endpoint.get("anything", (_) => _)).toThrow(ApiEndpointError);
});

test("Check ApiEndpointError is thrown when bearer token is empty", () => {
    expect(() =>
        new ApiEndpointBuilder("some-url").addBearerTokens("")
    ).toThrow(ApiEndpointError);
});

test("Check ApiEndpointError is thrown when bearer token contains spaces", () => {
    expect(() =>
        new ApiEndpointBuilder("some-url").addBearerTokens(" ")
    ).toThrow(ApiEndpointError);
});

test("Check ApiEndpointError is thrown when bearer token is null", () => {
    expect(() =>
        new ApiEndpointBuilder("some-url").addBearerTokens(null as any)
    ).toThrow(ApiEndpointError);
});

test("Check ApiEndpointError is thrown when bearer token is undefined", () => {
    expect(() =>
        new ApiEndpointBuilder("some-url").addBearerTokens(undefined as any)
    ).toThrow(ApiEndpointError);
});

test.each(statusCodes)(
    "Check ApiEndpointError is thrown on %i status code",
    async (statusCode) => {
        // Build the request
        const request: IRequest<any> = endpoint.get(
            `/status/${statusCode}`,
            (_) => _
        );

        // Execute the request
        try {
            await request.execute();
            fail("Request should have thrown an error");
        } catch (err: unknown) {
            expect(err).toBeInstanceOf(ApiEndpointError);

            const error = err as ApiEndpointError;

            expect(error.error.statusCode).toBe(statusCode);
        }
    }
);
