import templates from './index';

// const options = {
//     baseUrl: 'https://example.com',
//     url: '/api/v1/data',
//     method: 'POST',
//     mimeType: 'application/json',
//     params: {},
//     headers: [
//         { name: 'Authorization', value: 'Bearer xxx' },
//         { name: 'X-Custom-Header', value: 'Custom Value' }
//     ],
//     query: [
//         { name: 'param1', value: 'value1' },
//         { name: 'param2', value: 'value2' }
//     ],
//     postData: [
//         { name: 'param1', value: 'value1' },
//         { name: 'param2', value: 'value2' }
//     ],
//     path: '/path/to/data',
//     cookies: [
//         { name: 'cookie1', value: 'value1' },
//         { name: 'cookie2', value: 'value2' }
//     ]
// };

console.log(1111, templates)

const config = Object.keys(templates).reduce((acc, key) => {
    const [category, name] = key.split('/');
    if (!acc[category]) {
        acc[category] = [];
    }
    acc[category].push(name);
    return acc;
}, {});

console.log(222, config)
