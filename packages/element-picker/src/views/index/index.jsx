import * as React from 'react'
import { ElementPicker, contain, fullContain } from '../../utils/element-picker'

export const Index = () => {
    React.useEffect(() => {
        ElementPicker.enable((intersect) => {
            const elements = intersect(fullContain)
            console.log(elements)
        })
        return () => {
            ElementPicker.disable()
        }
    }, [])
    return (
        <section>
            <div style={{
                backgroundColor: '#f00',
                width: '64px',
                height: '64px',
            }}></div>
            <div style={{
                backgroundColor: '#00f',
                width: '64px',
                height: '64px',
            }}></div>
            <style></style>
            123
            <script></script>
            <iframe src="/#/about"></iframe>
            <iframe src="/#/about"></iframe>
            <input />
            <button>Button</button>
        </section>
    )
}
