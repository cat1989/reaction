import fs from 'fs'
import path from 'path'
import ejs from 'ejs'
import { format } from 'prettier'
import {
    toCamelCase,
} from './utils/common'

type GenerateOptions = {
    entry: string;
    exclude?: RegExp;
    output?: {
        path?: string;
    },
    resolve?: {
        extensions?: string[];
    };
}

type Route = {
    name: string;
    path: string;
    lazy: boolean;
    filepath: string;
    children?: Route[];
}

const getMainFile = (src: string, extensions: string[] = [".js"]) => {
    const dirs = fs.readdirSync(src, {
        withFileTypes: true,
    })
    const results = new Array(extensions.length).fill(void 0)
    for (const dir of dirs) {
        if (dir.isFile()) {
            const [name, ...rest] = dir.name.split(".")
            if (name === 'index') {
                const [extension, ...args] = rest.reverse()
                const index = extensions.findIndex((ext) => `.${extension}` === ext)
                if (index !== -1) {
                    results[index] = {
                        name: dir.name,
                        lazy: args.includes('lazy'),
                        extension: extension,
                    }
                }
            }
        }
    }
    return results.find((mainFile) => mainFile !== void 0)
}

export const generate = ({
    entry,
    exclude,
    output,
    resolve,
}: GenerateOptions) => {
    const [,dirname,] = process.argv
    const input = path.resolve(path.dirname(dirname), entry)
    if (fs.existsSync(input)) {
        const outputPath = output?.path ?? path.resolve(process.cwd(), "dist")
        const routes: Route[] = (function traverse(input: string, paths: string[]) {
            const routes: Route[] = []
            fs.readdirSync(input, {
                withFileTypes: true,
            }).map((dir) => {
                const filepath = path.resolve(input, dir.name)
                if (exclude) {
                    if (exclude.test(dir.name)) {
                        return
                    }
                }
                if (dir.isDirectory()) {
                    const entryFile = getMainFile(filepath, resolve?.extensions)
                    if (!entryFile) {
                        return
                    }
                    const children = traverse(filepath, [...paths, dir.name])
                    const name = [...paths, dir.name].join("/")
                    const route: Route = {
                        name: toCamelCase(name),
                        lazy: entryFile.lazy,
                        path: `/${name}`,
                        filepath: path.relative(outputPath, [input, dir.name, entryFile.name].join("/")).replace(/\\/g, '/'),
                    }
                    if (children.length > 0) {
                        route.children = children
                    }
                    routes.push(route)
                }
            })
            return routes
        })(input, [])
        return routes
    }
    return []
}

export const compile = (template: string, routes: Route[]) => ejs.compile(template)({
    routes,
})

export const build = (output: string, code: string) => {
    format(code, {
        parser: 'babel',
    }).then((code) => {
        const dirname = path.dirname(output)
        if (!fs.existsSync(dirname)) {
            fs.mkdirSync(dirname, {
                recursive: true,
            })
        }
        fs.writeFileSync(output, code, {
            encoding: 'utf-8',
        })
    })
}
