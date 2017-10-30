let {create} = require('./canvas')

module.exports = (layout, {
    scaleX = 5,
    scaleY = 5,
    before, after
} = {}) => {
    let canvas = create(layout.width * scaleX, layout.height * scaleY)
    let ctx    = canvas.getContext('2d')
    layout.sections.forEach(section => {
        ctx.fillStyle = 'rgba(75,75,75,.75)'
        if (before) before(section, ctx)
        const rect = {
            x     : -layout.bounds.left * scaleX + section.left * scaleX,
            y     : -layout.bounds.top * scaleY + section.top * scaleY,
            width : section.width * scaleX,
            height: section.height * scaleY
        }
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height)
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height)
        if (after) after(section, ctx)
    })
    return canvas
}