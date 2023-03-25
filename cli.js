#!/usr/bin/env node

const { Command } = require('commander');
const RequestTemplater = require('./dist/request-templater.es');

const program = new Command();

program
    .option('-u, --url <url>', 'The URL to make a request to')
    .option('-m, --method <method>', 'The HTTP method to use', 'GET')
    .option('-t, --mimeType <mimeType>', 'The MIME type of the request', 'application/x-www-form-urlencoded')
    .option('-p, --params <params>', 'The parameters to send with the request', JSON.stringify([{in: "query", name: "param", value: 1}]))
    .option('-b, --baseUrl <baseUrl>', 'The base URL to prepend to the request URL')
    .option('-l, --language <language>', 'The programming language to generate code for', 'bash')
    .option('-r, --library <library>', 'The HTTP library to use', 'curl');

program.parse();

const options = program.opts();

if (!options.url) {
    throw new Error('url required, see -h')
}

if (!options.baseUrl) {
    throw new Error('baseUrl required, see -h')
}

const templater = new RequestTemplater()
    .baseUrl(options.baseUrl)
    .lang(options.language)
    .method(options.method)
    .mimeType(options.mimeType)
    .params(JSON.parse(options.params))
    .library(options.library);

const result = templater.generate();

console.log('Request: \n', result);
