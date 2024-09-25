import * as React from 'react'
import { ElementPicker } from '../../utils/element-picker'

export const Index = () => {
    React.useEffect(() => {
        ElementPicker.enable().on("done", () => {
            const elements = ElementPicker.intersect((src, dest, { tagName }) => {
                console.log(tagName, dest)
                return (
                    src.x + src.width >= dest.x &&
                    src.x <= dest.x + dest.width &&
                    src.y + src.height >= dest.y &&
                    src.y <= dest.y + dest.height
                )
            })
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
