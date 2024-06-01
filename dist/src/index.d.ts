interface Param {
    in: 'headers' | 'query' | 'postData' | 'path' | 'cookie';
    name: string;
    value: string;
    type?: 'file';
    path?: string;
}
declare class RequestTemplater {
    private _baseUrl;
    private _url;
    private _method;
    private _params;
    private _mimeType;
    private _lang;
    private _library;
    constructor();
    library(value: string): this;
    lang(value: string): this;
    mimeType(value: "application/x-www-form-urlencoded" | "application/json" | 'multipart/form-data' | null): this;
    params(value: Array<Param>): this;
    method(value: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'): this;
    url(value: string): this;
    baseUrl(value: string): this;
    private convertParams;
    private cleanup;
    generate(): string;
    generateHighlight(): string;
    makeHighlightCode(code: string): string;
    config(): {};
}
export default RequestTemplater;
