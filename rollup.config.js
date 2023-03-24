import babel from '@rollup/plugin-babel';
import filesize from 'rollup-plugin-filesize';
import progress from 'rollup-plugin-progress';
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

import glob from "glob";
import ejs from "ejs";
import fs from "fs";

const templateFiles = glob.sync('src/templates/**/*.ejs');

// Compile each template file using EJS
const templates = templateFiles.map((filePath) => {
    const file = fs.readFileSync(filePath, 'utf8');
    console.log('rebuild: ' + filePath)
    const template = ejs.compile(file, { client: true, strict: true, compileDebug: false, });
    const name = filePath.replace(/^templates\//, '')
        .replace(/\.ejs$/, '')
        .replace('src/templates/', '')
        .toLowerCase();
    return { name, template };
});

// Generate the module code using ES6 template literals
const templateModule = `
const templates = {
${templates.map((t) => `${JSON.stringify(t.name)}: ${t.template.toString()},`).join('\n')}
};

export default templates;
`;

// Write the template module to a file
fs.writeFileSync('src/templates/index.js', templateModule);


const inputPath = './src'
const outputPath = './dist';

const banner = `/*!
 * Request Templater v${pkg.version}
 *
 * Copyright (C) 2012-${new Date().getFullYear()} Pavel Kuz\`min (@s00d).
 *
 * Date: ${new Date().toUTCString()}
 */
`;

const extensions = ['.ts', '.js', '.hbs', '.html', '.hbs.html', '.mustache', '.pug'];

const jsPlugins = [
    resolve({
        dedupe: ['core-js']
    }),
    commonjs({
        include: 'node_modules/**',
    }),
    json(),
    progress(),
    filesize({
        showGzippedSize: true,
    }),
    typescript(),
    babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        include: [`${inputPath}/**/*`],
        extensions,
    }),
    // terser()
];

export default [
    {
        input: `${inputPath}/index.ts`,
        output: {
            file: `${outputPath}/${pkg.main}`,
            format: 'umd',
            banner,
            name: 'RequestTemplater',
            sourcemap: true,
        },
        plugins: jsPlugins
    },
    {
        input: `${inputPath}/index.ts`,
        output: {
            file: `${outputPath}/minified/${pkg.main.replace(/\.js$/, '.min.js')}`,
            banner,
            format: 'umd',
            name: 'RequestTemplater',
            sourcemap: true,
        },
        plugins: jsPlugins
    },
    {
        input: `${inputPath}/index.ts`,
        output: {
            file: `${outputPath}/${pkg.module}`,
            banner,
            format: 'es',
            name: 'RequestTemplater',
            sourcemap: true,
        },
        plugins: jsPlugins
    },
    {
        input: `${inputPath}/index.ts`,
        output: {
            file: `${outputPath}/${pkg.browser}`,
            banner,
            format: 'iife',
            name: 'RequestTemplater',
            sourcemap: true,
        },
        plugins: jsPlugins
    }
];
