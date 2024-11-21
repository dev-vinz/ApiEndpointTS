import axios from "axios";

import { ApiEndpointError } from "../errors/ApiEndpointError";
import { ApiEndpointErrorMessage } from "../errors/ApiEndpointErrorMessage";

export function validateBaseUrl(baseUri: string): void {
    if (baseUri === undefined || baseUri === null || baseUri.trim() === "") {
        throw new ApiEndpointError(
            new ApiEndpointErrorMessage(
                "Base URI cannot be null, undefined or empty."
            )
        );
    }
}

export function validateEndpoint(endpoint: string): void {
    if (endpoint === undefined || endpoint === null || endpoint.trim() === "") {
        throw new ApiEndpointError(
            new ApiEndpointErrorMessage(
                "Endpoint cannot be null, undefined or empty."
            )
        );
    }

    if (!endpoint.startsWith("/")) {
        throw new ApiEndpointError(
            new ApiEndpointErrorMessage(
                "Endpoint must start with '/' character."
            )
        );
    }
}

export function validateTokens(...tokens: string[]): void {
    if (tokens.length < 1) {
        throw new ApiEndpointError(
            new ApiEndpointErrorMessage("At least one API token is required.")
        );
    }

    tokens.forEach((token) => {
        if (token === undefined || token === null || token.trim() === "") {
            throw new ApiEndpointError(
                new ApiEndpointErrorMessage(
                    "API token cannot be null, undefined or empty."
                )
            );
        }
    });
}
