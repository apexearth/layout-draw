let {create} = require('./canvas')

module.exports = (layout, {
    scaleX = 5,
    scaleY = 5,
    before, after
} = {}) => {
    let canvas = create(layout.width * scaleX, layout.height * scaleY)
    let ctx    = canvas.getContext('2d')
    layout.forEachSquare(square => {
        ctx.fillStyle = 'rgba(75,75,75,.75)'
        if (before) before(square, ctx)
        ctx.fillRect(
            -layout.bounds.left * scaleX + square.x * scaleX,
            -layout.bounds.top * scaleY + square.y * scaleY,
            scaleX,
            scaleY
        )
        ctx.strokeRect(
            -layout.bounds.left * scaleX + square.x * scaleX,
            -layout.bounds.top * scaleY + square.y * scaleY,
            scaleX,
            scaleY
        )
        if (after) after(square, ctx)
    })
    return canvas
}