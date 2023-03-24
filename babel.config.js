module.exports = {
    "presets": [
        // ["@babel/preset-typescript", {}],
        [
            "@babel/preset-env",
            {
                modules: false,
                spec: true,
                useBuiltIns: "usage",
                forceAllTransforms: true,
                corejs: 3
            }
        ]
    ],
    // "plugins": [
    //     [
    //         "@babel/transform-runtime",
    //         {
    //             corejs: 3,
    //             helpers: true,
    //             regenerator: true,
    //             useESModules: false
    //         }
    //     ]
    // ]
}
