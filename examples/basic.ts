import * as api from "../src";

import { HttpBinResponse } from "./models/HttpBinResponse";

async function main() {
    const baseUrl: string = "https://httpbin.org/";

    // Build the endpoint
    const endpoint: api.IApiEndpoint = new api.ApiEndpointBuilder(baseUrl) //
        .setLogger(console.warn)
        .build();

    // Build the data
    const data = new HttpBinResponse("bar", "qux");

    // const data = new FormData();
    // data.append("foo", "bar");
    // data.append("baz", "qux");

    // const data = {
    //     foo: "bar",
    //     baz: "qux",
    // };

    // Build the request
    const request: api.IRequest<any> = endpoint
        .post("/anything", data, (data: any) => data)
        .addParam("foo", "bar");

    // Execute the request
    const response: any = await request.execute();

    // Output the response
    console.log(response);
}

main().catch(console.error);
