# element-picker
```shell
pnpm add element-picker
```
## How to use?
```js
import { ElementPicker } from 'element-picker'

ElementPicker.enable((intersect) => {
    // judge which element is contained
    const elements = intersect((src, dest) => {
        // TODO
        return true
    })
})
```
