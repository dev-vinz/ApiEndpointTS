/* Exportation of all the classes and interfaces that are part of the library */

export * from "./core/IRequest";

export * from "./errors/ApiEndpointError";
export * from "./errors/ApiEndpointErrorMessage";

export * from "./ApiEndpointBuilder";
export * from "./IApiEndpoint";

/* Exportation of all the utilities imported in the library */

export { StatusCodes } from "http-status-codes";
