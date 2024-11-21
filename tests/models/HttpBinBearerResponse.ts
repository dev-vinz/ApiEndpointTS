export class HttpBinBearerResponse {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                          PROPERTIES                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    private readonly _isAuthenticated: boolean;
    private readonly _token: string;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                        CONSTRUCTORS                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    constructor(isAuthenticated: boolean, token: string) {
        // Inputs
        {
            this._isAuthenticated = isAuthenticated;
            this._token = token;
        }
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                           PUBLIC                            *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /* * * * * * * * * * * * * * * *\
    |*           GETTERS           *|
    \* * * * * * * * * * * * * * * */

    public get isAuthenticated(): boolean {
        return this._isAuthenticated;
    }

    public get token(): string {
        return this._token;
    }
}
