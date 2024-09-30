# route-generator
File-baseed route generator.
```shell
pnpm add route-generator
```
## How to use?
```js
const { generate, compile, build } = require('route-generator')
const path = require('path')
const fs = require('fs')
const encoding = 'utf-8'

const template = fs.readFileSync(path.resolve(__dirname, './templates/vue.tmpl'), {
    encoding,
})

const routes = generate({
    entry: path.resolve(__dirname, './views'),
    exclude: /components/,
    output: {
        path: path.resolve(__dirname, './dist'),
    },
    resolve: {
        extensions: [
            ".vue", ".js",
        ],
    },
})

build(path.resolve(__dirname, './dist/index.js'), compile(template, routes))
```
