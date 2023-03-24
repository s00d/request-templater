[![npm version](https://badge.fury.io/js/request-templater.svg)](https://badge.fury.io/js/request-templater)
[![npm downloads](https://img.shields.io/npm/dw/request-templater)](https://badge.fury.io/js/request-templater)
[![NPM license](https://img.shields.io/npm/l/request-templater)](https://github.com/sood/request-templater/blob/master/LICENSE)
[![npm type definitions](https://img.shields.io/npm/types/request-templater)](https://github.com/sood/request-templater)
[![donate](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.me/s00d)
[![GitHub Repo stars](https://img.shields.io/github/stars/sood/request-templater?style=social)](https://github.com/sood/request-templater)

# RequestTemplater

RequestTemplater is a class for generating HTTP request examples based on templates for different programming languages.

# Example

[Show](https://s00d.github.io/request-templater/)

## Installation
To install RequestTemplater, run the following command:

```npm install request-templater```

## Usage
To get started with RequestTemplater, create an instance of the class:

```js
import RequestTemplater from 'request-templater';

const requestTemplater = new RequestTemplater();
```

Then you can set the base URL and other request parameters:
```js
requestTemplater.baseUrl('https://example.com/api')
.method('GET')
.url('users/123')
.params([
{ in: 'query', name: 'page', value: '1' },
{ in: 'query', name: 'limit', value: '10' },
{ in: 'headers', name: 'Authorization', value: 'Bearer xxxxxxxxxxxx' }
]);
```
After that, you can generate a request example for the desired language:

```js
const code = requestTemplater.lang('javascript').library('axios').generate();
console.log(code);
In this example, code in the JavaScript language will be generated using the Axios library.
```

## Methods
### baseUrl(value: string): RequestTemplater
Method for setting the base URL for requests.

### method(value: 'GET'|'POST'|'PUT'|'DELETE'|'PATCH'|'HEAD'|'OPTIONS'): RequestTemplater
Method for setting the HTTP method for requests.

### url(value: string): RequestTemplater
Method for setting the path for requests.

### params(value: Array<Param>): RequestTemplater
Method for setting request parameters.

### mimeType(value: "application/x-www-form-urlencoded"|"application/json"|'multipart/form-data'): RequestTemplater
Method for setting the MIME type for requests.

### lang(value: string): RequestTemplater
Method for setting the programming language for which a request example will be generated.

### library(value: string): RequestTemplater
Method for setting the library that will be used to send the request.

### generate(): string
Method for generating a request example based on the specified parameters.

### config(): Object
Method for getting a list of available templates for generating request examples.


## Language and Libraries

| Language    | Libraries                            |
|-------------|--------------------------------------|
| Swift       | URLSession, Alamofire                |
| Shell       | wget, httpie, curl                   |
| Scala       | scalaj-http, http4s, akka            |
| Rust        | surf, reqwest, hyper                 |
| Ruby        | RestClient, http                     |
| Python      | requests, http                       |
| PowerShell  | WebRequest, RestMethod               |
| PHP         | http2, http1, Guzzle, curl           |
| Perl        | UserAgent, Tiny, Request             |
| OCaml       | httpaf, cohttp_lwt                   |
| Objective-C | NSURLSession, AFNetworking           |
| Lua         | httpclient, http, curl               |
| Kotlin      | OkHttp3, Java, Fuel                  |
| JavaScript  | jQuery, Fetch, Axios, XMLHttpRequest |
| Java        | Unirest, OkHttp, NetHttp, AsyncHttp  |
| HTTP        | RFC7230                              |
| Go          | http, fasthttp                       |
| Dart        | http_client, http, Dio               |
| C#          | RestSharp, HttpClient                |
| C++         | iostream, curl, Arduino              |
| Clojure     | Ring-Client, clj-http                |
| C           | ghttp, curl                          |
| Brainfuck   | Brainfuck                            |
| R           | RCurl, httr                          |
