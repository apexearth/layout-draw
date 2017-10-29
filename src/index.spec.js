require('./test.setup')

const Layout   = require('@apexearth/layout')
const draw     = require('./')
const {expect} = require('chai')
const fs       = require('fs')

const saveNewImages = true

describe('layout-draw', function () {


    it('default', function (done) {
        let ship    = new Layout()
        let cockpit = ship.addSection(0, 0, 0, 0, 'cockpit')
        let walkway = cockpit.addBottom({
            width: 1, height: 5, name: 'walkway'
        })
        walkway.addLeft({
            width: 1, height: 2, name: 'quarters'
        })
        walkway.addRight({
            width: 1, height: 2, name: 'quarters'
        })
        let enginel = walkway.addLeft({
            width: 1, height: 3, shift: 4, name: 'engine'
        })
        let enginer = walkway.addRight({
            width: 1, height: 3, shift: 4, name: 'engine'
        })
        walkway.addBottom({
            width: 1, height: 2, name: 'cargo'
        })
        let generatorl = walkway.addLeft({
            width: 2, height: 2, shift: 2, name: 'generator'
        })
        generatorl.addLeft({
            width: 1, height: 2, shift: -1, name: 'laser'
        })
        generatorl.addLeft({
            width: 1, height: 2, shift: 1, name: 'shield'
        })
        let generatorr = walkway.addRight({
            width: 2, height: 2, shift: 2, name: 'generator'
        })
        generatorr.addRight({
            width: 1, height: 2, shift: -1, name: 'laser'
        })
        generatorr.addRight({
            width: 1, height: 2, shift: 1, name: 'shield'
        })
        enginel.addLeft({
            width: 1, height: 2, name: 'shield'
        })
        enginer.addRight({
            width: 1, height: 2, name: 'shield'
        })


        let canvas = drawShip(ship)
        check(canvas, this.test.title, done)
    })

    it('add color', function (done) {
        let ship    = new Layout()
        let cockpit = ship.addSection(0, 0, 0, 0, 'cockpit')
        let walkway = cockpit.addBottom({
            width: 1, height: 5, name: 'walkway'
        })
        walkway.addLeft({
            width: 1, height: 2, name: 'quarters'
        })
        walkway.addRight({
            width: 1, height: 2, name: 'quarters'
        })
        let enginel = walkway.addLeft({
            width: 1, height: 3, shift: 4, name: 'engine'
        })
        let enginer = walkway.addRight({
            width: 1, height: 3, shift: 4, name: 'engine'
        })
        walkway.addBottom({
            width: 1, height: 2, name: 'cargo'
        })
        let generatorl = walkway.addLeft({
            width: 2, height: 2, shift: 2, name: 'generator'
        })
        generatorl.addLeft({
            width: 1, height: 2, shift: -1, name: 'laser'
        })
        generatorl.addLeft({
            width: 1, height: 2, shift: 1, name: 'shield'
        })
        let generatorr = walkway.addRight({
            width: 2, height: 2, shift: 2, name: 'generator'
        })
        generatorr.addRight({
            width: 1, height: 2, shift: -1, name: 'laser'
        })
        generatorr.addRight({
            width: 1, height: 2, shift: 1, name: 'shield'
        })
        enginel.addLeft({
            width: 1, height: 2, name: 'shield'
        })
        enginer.addRight({
            width: 1, height: 2, name: 'shield'
        })

        enginel.data.fillStyle = 'rgb(100,100,255)'
        enginer.data.fillStyle = 'rgb(100,100,255)'

        let canvas = drawShip(ship)
        check(canvas, this.test.title, done)
    })

    it('add more color', function (done) {
        let ship    = new Layout()
        let cockpit = ship.addSection(0, 0, 0, 0, 'cockpit')
        let walkway = cockpit.addBottom({
            width: 1, height: 5, name: 'walkway', data: {
                fillStyle  : 'rgb(200,200,200,1)',
                strokeStyle: 'rgb(255,255,255,1)',
                lineWidth  : 1,
            }
        })
        walkway.addLeft({
            width: 1, height: 2, name: 'quarters'
        })
        walkway.addRight({
            width: 1, height: 2, name: 'quarters'
        })
        let enginel = walkway.addLeft({
            width: 1, height: 3, shift: 4, name: 'engine', data: {fillStyle: 'rgb(100,100,255)'}
        })
        let enginer = walkway.addRight({
            width: 1, height: 3, shift: 4, name: 'engine', data: {fillStyle: 'rgb(100,100,255)'}
        })
        walkway.addBottom({
            width: 1, height: 2, name: 'cargo'
        })
        let generatorl = walkway.addLeft({
            width: 2, height: 2, shift: 2, name: 'generator'
        })
        generatorl.addLeft({
            width: 1, height: 2, shift: -1, name: 'laser'
        })
        generatorl.addLeft({
            width: 1, height: 2, shift: 1, name: 'shield'
        })
        let generatorr = walkway.addRight({
            width: 2, height: 2, shift: 2, name: 'generator'
        })
        generatorr.addRight({
            width: 1, height: 2, shift: -1, name: 'laser'
        })
        generatorr.addRight({
            width: 1, height: 2, shift: 1, name: 'shield'
        })
        enginel.addLeft({
            width: 1, height: 2, name: 'shield'
        })
        enginer.addRight({
            width: 1, height: 2, name: 'shield'
        })

        let canvas = drawShip(ship)
        check(canvas, this.test.title, done)
    })
})

function drawShip(ship) {
    return draw(ship, {
        scaleX: 5,
        scaleY: 10,
        before: (block, context) => {
            context.fillStyle   = block.sections[0].data.fillStyle || 'rgb(100,100,100)'
            context.strokeStyle = block.sections[0].data.strokeStyle || 'rgba(0,0,0,0)'
            context.lineWidth   = block.sections[0].data.lineWidth || 1
        }
    })
}

function check(canvas, name, done) {
    if (saveNewImages) {
        savePng(canvas, name, () => {
            checkFile(canvas, name, done)
        })
    } else {
        checkFile(canvas, name, done)
    }
}

function checkFile(canvas, name, done) {
    let stream   = canvas.pngStream()
    let expected = fs.readFileSync(__dirname + `/../test/${name}.png`)
    let index    = 0
    stream.on('data', chunk => {
        for (let i = 0; i < chunk.length; i++) {
            if (expected[index++] !== chunk[i]) {
                throw new Error(`${name} does not match at ${index} ${expected[index]} !== ${chunk[i]}`)
            }
        }
    })
    stream.on('end', done)
}

function savePng(canvas, name, done) {
    console.log(name)
    let out    = fs.createWriteStream(__dirname + `/../test/${name}.png`)
    let stream = canvas.pngStream()

    stream.on('error', done)

    stream.on('data', function (chunk) {
        out.write(chunk)
    })

    stream.on('end', function () {
        out.end()
        setTimeout(done, 100)
    })
}