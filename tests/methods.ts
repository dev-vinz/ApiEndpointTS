/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                           IMPORTS                           *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

import { ApiEndpointBuilder, IApiEndpoint, IRequest } from "../src";

import { HttpBinResponse } from "./models/HttpBinResponse";

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                        CONFIGURATION                        *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// Build the api endpoint
const endpoint: IApiEndpoint = new ApiEndpointBuilder("https://httpbin.org/") //
    .build();

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                            TESTS                            *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

test("Simple GET Request", async () => {
    // Build the request
    const request: IRequest<HttpBinResponse> = endpoint.get(
        "/anything",
        createHttpBinResponse
    );

    // Execute the request
    const response: HttpBinResponse = await request.execute();

    // Validate the response
    expect(response).not.toBeNull();
    expect(response.args.size).toBe(0);
    expect(response.data).toBeNull();
    expect(response.form.size).toBe(0);
    expect(response.method).toBe("GET");
});

test("SIMPLE GET Request with Query Parameters", async () => {
    // Build the request
    const request: IRequest<HttpBinResponse> = endpoint.get(
        "/anything",
        createHttpBinResponse
    );

    // Add the query parameters
    request.addParam("foo", "bar");

    // Execute the request
    const response: HttpBinResponse = await request.execute();

    // Validate the response
    expect(response).not.toBeNull();
    expect(response.args.size).toBe(1);
    expect(response.args.get("foo")).toBe("bar");
    expect(response.data).toBeNull();
    expect(response.form.size).toBe(0);
    expect(response.method).toBe("GET");
});

test("Simple POST Request with JSON Data", async () => {
    // Build the request
    const request: IRequest<HttpBinResponse> = endpoint.post(
        "/anything",
        { foo: "bar", baz: "qux" },
        createHttpBinResponse
    );

    // Execute the request
    const response: HttpBinResponse = await request.execute();

    // Validate the response
    expect(response).not.toBeNull();
    expect(response.args.size).toBe(0);
    expect(response.data).not.toBeNull();
    expect(response.data).toStrictEqual({ foo: "bar", baz: "qux" });
    expect(response.form.size).toBe(0);
    expect(response.method).toBe("POST");
});

test("Simple POST Request with Form Data", async () => {
    // Create the form data
    const formData: FormData = new FormData();
    formData.append("foo", "bar");
    formData.append("baz", "qux");

    // Build the request
    const request: IRequest<HttpBinResponse> = endpoint.post(
        "/anything",
        formData,
        createHttpBinResponse
    );

    // Execute the request
    const response: HttpBinResponse = await request.execute();

    // Validate the response
    expect(response).not.toBeNull();
    expect(response.args.size).toBe(0);
    expect(response.data).toBeNull();
    expect(response.form.size).toBe(2);
    expect(response.form.get("foo")).toBe("bar");
    expect(response.form.get("baz")).toBe("qux");
    expect(response.method).toBe("POST");
});

test("Simple PUT Request with JSON Data", async () => {
    // Build the request
    const request: IRequest<HttpBinResponse> = endpoint.put(
        "/anything",
        { foo: "bar", baz: "qux" },
        createHttpBinResponse
    );

    // Execute the request
    const response: HttpBinResponse = await request.execute();

    // Validate the response
    expect(response).not.toBeNull();
    expect(response.args.size).toBe(0);
    expect(response.data).not.toBeNull();
    expect(response.data).toStrictEqual({ foo: "bar", baz: "qux" });
    expect(response.form.size).toBe(0);
    expect(response.method).toBe("PUT");
});

test("Simple PUT Request with Form Data", async () => {
    // Create the form data
    const formData: FormData = new FormData();
    formData.append("foo", "bar");
    formData.append("baz", "qux");

    // Build the request
    const request: IRequest<HttpBinResponse> = endpoint.put(
        "/anything",
        formData,
        createHttpBinResponse
    );

    // Execute the request
    const response: HttpBinResponse = await request.execute();

    // Validate the response
    expect(response).not.toBeNull();
    expect(response.args.size).toBe(0);
    expect(response.data).toBeNull();
    expect(response.form.size).toBe(2);
    expect(response.form.get("foo")).toBe("bar");
    expect(response.form.get("baz")).toBe("qux");
    expect(response.method).toBe("PUT");
});

test("Simple DELETE Request", async () => {
    // Build the request
    const request: IRequest<HttpBinResponse> = endpoint.delete(
        "/anything",
        createHttpBinResponse
    );

    // Execute the request
    const response: HttpBinResponse = await request.execute();

    // Validate the response
    expect(response).not.toBeNull();
    expect(response.args.size).toBe(0);
    expect(response.data).toBeNull();
    expect(response.form.size).toBe(0);
    expect(response.method).toBe("DELETE");
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
|*                       USEFUL FUNCTIONS                      *|
\* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function createHttpBinResponse(data: any): HttpBinResponse {
    return new HttpBinResponse(
        new Map(Object.entries(data.args)),
        data.json,
        new Map(Object.entries(data.form)),
        data.method,
        data.url
    );
}
