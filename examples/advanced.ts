import * as api from "../src";

import { HttpBinBearerResponse } from "./models/HttpBinBearerResponse";

async function main() {
    const baseUrl: string = "https://httpbin.org/";

    // Build the endpoint
    const endpoint: api.IApiEndpoint = new api.ApiEndpointBuilder(baseUrl) //
        .addBearerTokens("my-sup3r-s3cr3t-t0k3n")
        .setLogger(console.warn)
        .build();

    // Build the request
    const request: api.IRequest<HttpBinBearerResponse> = endpoint.get(
        "/bearer",
        (data: any) => new HttpBinBearerResponse(data.authenticated, data.token)
    );

    // Execute the request
    const response: HttpBinBearerResponse = await request.execute();

    // Output the response
    console.log(response);
}

main().catch(console.error);
