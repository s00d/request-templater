import templates from './index';

const options = {
    baseUrl: 'https://example.com',
    url: '/api/v1/data',
    method: 'POST',
    mimeType: 'application/json',
    params: {},
    headers: [
        { name: 'Authorization', value: 'Bearer xxx' },
        { name: 'X-Custom-Header', value: 'Custom Value' }
    ],
    query: [
        { name: 'param1', value: 'value1' },
        { name: 'param2', value: [[1],[2,3]] },
        { name: 'param2', value: [{arritem: [1,2,3]}] },
        { name: 'param2', value: [{obj: {name: 'ddd'}}] }
    ],
    postData: [
        { name: 'param1', value: 'value1' },
        { name: 'param2', value: [[1],[2,3]] },
        { name: 'param2', value: [{arr: [1,2,3]}] },
        { name: 'param2', value: [{obj: {name: 'ddd'}}] }
    ],
    path: '/path/to/data',
    cookies: [
        { name: 'cookie1', value: 'value1' },
        { name: 'cookie2', value: 'value2' }
    ]
};


let baseUrl = options.baseUrl;
if (!baseUrl.endsWith('/')) {
    baseUrl += '/';
}
let url = options.url;
if (url.startsWith('/')) {
    url = url.substring(1);
}

const buildQueryParam = (name, value) => {
    if (Array.isArray(value)) {
        const queryValues = value.map(queryValue => buildQueryParam(name, queryValue));
        return queryValues.join('&');
    } else if (typeof value === 'object') {
        const queryValues = Object.entries(value).map(([key, val]) => buildQueryParam(`${name}[${key}]`, val));
        return queryValues.join('&');
    } else {
        return `${name}=${value}`;
    }
}

const queryArray = JSON.parse(JSON.stringify(options.query)).map(queryParam => buildQueryParam(queryParam.name, queryParam.value));
const queryString = queryArray.join('&');


if(queryString !== '') {
    url += '?' + queryString;
}

options.url = baseUrl + url

console.log(templates["swift/urlsession"](options) .replace(/&amp;/gmiu, '&')
    .replace(/&#39;/gmiu, '\'')
    .replace(/&#34;/gmiu, '\"')
    .replace(/\n\n+/gmiu, '\n')
    .replace(/^\n/gmiu, ''))
//
// const config = Object.keys(templates).reduce((acc, key) => {
//     const [category, name] = key.split('/');
//     if (!acc[category]) {
//         acc[category] = [];
//     }
//     acc[category].push(name);
//     return acc;
// }, {});
//
// console.log(222, config)
