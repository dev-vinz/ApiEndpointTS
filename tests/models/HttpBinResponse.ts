export class HttpBinResponse {
    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                          PROPERTIES                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    private readonly _args: Map<string, string>;
    private readonly _data: object;
    private readonly _form: Map<string, string>;
    private readonly _method: string;
    private readonly _url: string;

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                        CONSTRUCTORS                         *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    constructor(
        args: Map<string, string>,
        data: object,
        form: Map<string, string>,
        method: string,
        url: string
    ) {
        // Inputs
        {
            this._args = args;
            this._data = data;
            this._form = form;
            this._method = method;
            this._url = url;
        }
    }

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *\
    |*                           PUBLIC                            *|
    \* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

    /* * * * * * * * * * * * * * * *\
    |*           GETTERS           *|
    \* * * * * * * * * * * * * * * */

    public get args(): Map<string, string> {
        return this._args;
    }

    public get data(): object {
        return this._data;
    }

    public get form(): Map<string, string> {
        return this._form;
    }

    public get method(): string {
        return this._method;
    }

    public get url(): string {
        return this._url;
    }
}
