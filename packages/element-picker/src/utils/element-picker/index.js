export const ElementPicker = (() => {
    const windowTop = window.top
    let mousedowned = false
    let mask = null
    const exclude = ['STYLE', 'SCRIPT']
    const listeners = {
        done: [],
    }
    let unbind = []
    const createMark = ({
        x, y, width, height,
    }) => {
        const div = windowTop.document.createElement("div")
        div.style.backgroundColor = 'rgba(0,0,0,.1)'
        div.style.border = '2px solid #000'
        div.style.position = 'fixed'
        div.style.zIndex = 99999
        div.style.pointerEvents = 'none'
        div.style.left = `${x}px`
        div.style.top = `${y}px`
        div.style.width = `${width}px`
        div.style.height = `${height}px`
        div.style.boxSizing ='border-box'
        return div
    }
    const geometry = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    }
    const usePicker = (window) => {
        const getOffset = () => {
            if (window.frameElement) {
                const {
                    top,
                    left,
                } = window.frameElement.getBoundingClientRect()
                return {
                    top,
                    left,
                }
            }
            else {
                return {
                    top: 0,
                    left: 0,
                }
            }
        }
        const onMouseDown = (e) => {
            if (!mousedowned) {
                mousedowned = true
                e.preventDefault()
                geometry.width = 0
                geometry.height = 0
            }
        }
        const onMouseMove = (e) => {
            if (mousedowned) {
                const {
                    top,
                    left,
                } = getOffset()
                const x = left + e.x
                const y = top + e.y
                if (!mask) {
                    geometry.x = x
                    geometry.y = y
                    mask = createMark(geometry)
                    windowTop.document.body.appendChild(mask)
                }
                geometry.width = Math.abs(geometry.x - x)
                geometry.height = Math.abs(geometry.y - y)
                mask.style.left = geometry.x < x ? `${geometry.x}px` : `${x}px`
                mask.style.top = geometry.y < y ? `${geometry.y}px` : `${y}px`
                mask.style.width = `${geometry.width}px`
                mask.style.height = `${geometry.height}px`
            }
        }
        const onMouseUp = (e) => {
            if (mousedowned) {
                mousedowned = false
                mask?.parentNode.removeChild(mask)
                mask = null
                if (geometry.width > 1 || geometry.height > 1) {
                    const {
                        top,
                        left,
                    } = getOffset()
                    const x = left + e.x
                    const y = top + e.y
                    geometry.x = geometry.x < x ? geometry.x : x
                    geometry.y = geometry.y < y ? geometry.y : y
                    listeners.done.forEach((listener) => {
                        listener()
                    })
                }
            }
        }
        window.addEventListener("mousedown", onMouseDown, false)
        window.addEventListener("mousemove", onMouseMove, false)
        window.addEventListener("mouseup", onMouseUp, false)
        return () => {
            window.removeEventListener("mousedown", onMouseDown, false)
            window.removeEventListener("mousemove", onMouseMove, false)
            window.removeEventListener("mouseup", onMouseUp, false)
        }
    }
    return {
        intersect(method) {
            const results = []
            ;(function traverse(elements, offset) {
                Array.from(elements).forEach((element) => {
                    if (exclude.includes(element.tagName)) {
                        return
                    }
                    const {
                        top: y,
                        left: x,
                        width,
                        height,
                    } = element.getBoundingClientRect()
                    if (method({...geometry}, {
                        x: x + offset.left,
                        y: y + offset.top,
                        width,
                        height,
                    }, element)) {
                        results.push(element)
                    }
                    if (element.children && element.children.length > 0) {
                        traverse(element.children, offset)
                    }
                    else if (element.tagName === 'IFRAME') {
                        const {
                            top,
                            left,
                        } = element.contentWindow.frameElement.getBoundingClientRect()
                        traverse(element.contentWindow.document.body.children, {
                            top: offset.top + top,
                            left: offset.left + left,
                        })
                    }
                })
            })(window.document.body.children, {
                top: 0,
                left: 0,
            })
            return results
        },
        on(type, listener) {
            if (listeners[type]) {
                listeners[type].push(listener)
            }
            return this
        },
        enable() {
            (function use(window) {
                unbind.push(usePicker(window))
                if (window.frames && window.frames.length > 0) {
                    Array.from(window.frames).forEach(use)
                }
            })(window)
            return this
        },
        disable() {
            unbind.forEach((c) => {
                c()
            })
            unbind = []
            Object.entries(listeners).forEach(([type]) => {
                listeners[type] = []
            })
            return this
        },
    }
})(window)
