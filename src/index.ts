import templates from './templates';
interface Param {
    in: 'headers'|'query'|'postData'|'path'|'cookie';
    name: string;
    value: string;
    type?: 'file'
    path?: string
}
class RequestTemplater {
    private _baseUrl: string = '';
    private _url: string = '';
    private _method: 'GET'|'POST'|'PUT'|'DELETE'|'PATCH'|'HEAD'|'OPTIONS' = 'GET';
    private _params: Param[] = [];
    private _mimeType: "application/x-www-form-urlencoded"|"application/json"|'multipart/form-data' = 'application/x-www-form-urlencoded';
    private _lang: string = 'javascript';
    private _library: string = 'xmlhttprequest';
    constructor() {}

    library(value: string) {
        value = value.toLowerCase();
        this._library = value;
        return this;
    }
    lang(value: string) {
        value = value.toLowerCase();
        const config = this.config()[value];
        if (!config) {
            throw new Error('bad lang: ' + value)
        }
        this._lang = value;
        this._library = this.config()[value][0] ?? null;

        return this;
    }
    mimeType(value: "application/x-www-form-urlencoded"|"application/json"|'multipart/form-data') {
        this._mimeType = value;
        return this;
    }
    params(value: Array<Param>) {
        this._params = value;
        return this;
    }
    method(value: 'GET'|'POST'|'PUT'|'DELETE'|'PATCH'|'HEAD'|'OPTIONS') {
        this._method = value;
        return this;
    }
    url(value: string) {
        value = value.startsWith('/') ? value.substring(1) : value
        this._url = value;
        return this;
    }
    baseUrl(value: string) {
        if (!value.endsWith('/')) {
            value += '/';
        }
        this._baseUrl = value;
        return this;
    }
    private convertParams() {
        let baseUrl = this._baseUrl;
        if (!baseUrl.endsWith('/')) {
            baseUrl += '/';
        }
        let url = this._url;
        if (url.startsWith('/')) {
            url = url.substring(1);
        }

        this._params
            .filter(param => param.in === 'path')
            .forEach(param => {
                url = url.replace(`{${param.name}}`, param.value)
            });

        const queryParams = this._params.filter(param => param.in === 'query');
        const queryStrings = queryParams.map(param => `${param.name}=${param.value}`);
        const queryString = queryStrings.join('&');

        if(queryString !== '') {
            url += '?' + queryString;
        }

        url = baseUrl + url

        const host = baseUrl.match(/^https?:\/\/([^\/]+)/i)[1] ?? ''

        return {
            method: this._method,
            mimeType: this._mimeType,
            url,
            host,
            headers: this._params.filter(param => param.in === 'headers'),
            postData: this._params.filter(param => param.in === 'postData'),
            cookies: this._params.filter(param => param.in === 'cookie'),
        }
    }
    generate(): string {
        const template = templates[this._lang + '/' + this._library] ?? null;
        if (!template) {
            throw new Error('bad library')
        }
        const params = this.convertParams();
        return template(params);
    }

    config() {
        return  Object.keys(templates).reduce((acc, key) => {
            const [category, name] = key.split('/');
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(name);
            return acc;
        }, {});
    }
}

export default RequestTemplater;