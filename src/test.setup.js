const canvas = require('./canvas')
const Canvas = require('canvas')

canvas.create = (width, height) => {
    return new Canvas(width, height)
}