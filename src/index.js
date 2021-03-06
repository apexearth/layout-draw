let Canvas = require('./canvas')

module.exports = (layout, {
    canvas,
    scaleX = 5,
    scaleY = 5,
    width, height,
    before, after,
} = {}) => {
    if (typeof scaleX !== 'number') throw new Error(`scaleX must be a number`)
    if (typeof scaleY !== 'number') throw new Error(`scaleY must be a number`)
    if (before && typeof before !== 'function') throw new Error(`before must be a function`)
    if (after && typeof after !== 'function') throw new Error(`after must be a function`)

    canvas        = canvas || Canvas.create()
    canvas.width  = (width || layout.width) * scaleX
    canvas.height = (height || layout.height) * scaleY

    let offset = {
        x: (width ? width - layout.width : 0) * scaleX,
        y: (height ? height - layout.height : 0) * scaleY
    }

    let ctx = canvas.getContext('2d')
    layout.sections.forEach(section => {
        ctx.fillStyle = 'rgba(75,75,75,.75)'
        if (before) before(section, ctx)
        const rect = {
            x     : offset.x - layout.bounds.left * scaleX + section.left * scaleX,
            y     : offset.y - layout.bounds.top * scaleY + section.top * scaleY,
            width : section.width * scaleX,
            height: section.height * scaleY
        }
        switch (section.corner) {
            case 'top-left':
                ctx.moveTo(rect.x + rect.width, rect.y) // Top-right
                ctx.lineTo(rect.x, rect.y + rect.height) // Bottom-left
                ctx.lineTo(rect.x + rect.width, rect.y + rect.height) // Bottom-right
                ctx.fill()
                ctx.stroke()
                break
            case 'top-right':
                ctx.moveTo(rect.x, rect.y) // Top-left
                ctx.lineTo(rect.x, rect.y + rect.height) // Bottom-left
                ctx.lineTo(rect.x + rect.width, rect.y + rect.height) //Bottom-right
                ctx.fill()
                ctx.stroke()
                break
            case 'bottom-left':
                ctx.moveTo(rect.x, rect.y) // Top-left
                ctx.lineTo(rect.x + rect.width, rect.y) // Top-right
                ctx.lineTo(rect.x + rect.width, rect.y + rect.height) // Bottom-right
                ctx.fill()
                ctx.stroke()
                break
            case 'bottom-right':
                ctx.moveTo(rect.x + rect.width, rect.y) // Top-right
                ctx.lineTo(rect.x, rect.y + rect.height) // Bottom-left
                ctx.lineTo(rect.x, rect.y) // Top-left
                ctx.fill()
                ctx.stroke()
                break
            default:
                ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
                ctx.strokeRect(rect.x, rect.y, rect.width, rect.height)
        }
        if (after) after(section, ctx)
    })
    return canvas
}