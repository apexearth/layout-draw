require('./test.setup')

const Layout   = require('@apexearth/layout')
const draw     = require('./')
const {expect} = require('chai')
describe('layout-draw', function () {
    function drawShip(ship) {
        return draw(ship, {
            before: (block, context) => {
                context.fillStyle   = block.sections[0].data.fillStyle || 'rgb(100,100,100)'
                context.strokeStyle = block.sections[0].data.strokeStyle || 'rgba(0,0,0,0)'
                context.lineWidth   = block.sections[0].data.lineWidth || 1
            }
        })
    }

    it('draw() default', function (done) {
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
        canvas.toDataURL('image/png', function (err, png) {
            if (err) return done(err)
            expect(png).to.equal('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAABQCAYAAACTb8w2AAAABmJLR0QA/wD/AP+gvaeTAAAAnklEQVRoge3aMQqAMAxAUSMetcfqXXWXfAi2SIb/Rgf9ZCglGMeCMcb9fjbnjK/vO1didjOGGEOMIcaQ8mmZnbZV1VO51WSMIcYQY4gx5Np9j63KvttqMsYQY4gxxBgSK3fb3VpNxhhiDDGGGEOMIcYQY4gxxBhiDDGGGEOMIcaQdN/7x2Yi2zW3mowxxBhiDDGG+C8EMYYYQ4whxpAHgbwY9DgES08AAAAASUVORK5CYII=')
            done()
        })
    })

    it('draw() add color', function (done) {
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
        canvas.toDataURL('image/png', function (err, png) {
            if (err) return done(err)
            expect(png).to.equal('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAABQCAYAAACTb8w2AAAABmJLR0QA/wD/AP+gvaeTAAAAuElEQVRoge3aQQrCMBBAUSM5ajyVuWvd63wYnSCz+G9ZSvOZRQgl41aw1rren+29x6/fu1diTjOGGEOMIcaQ9G4Z7bZZ2V251WSMIcYQY4gxZJ4+x2ZF67aajDHEGGIMMYaMytn2tFaTMYYYQ4whxhBjiDHEGGIMMYbM/KvP4Nmj8N6nVpMxhhhDjCHGkBn98/3Hn4lo3VaTMYYYQ4whxpAv7kJcwa6cOwPvPbwLUWIMMYYYQ1rFvADLUh3ORqG/mwAAAABJRU5ErkJggg==')
            done()
        })
    })

    it('draw() add more color', function (done) {
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
        canvas.toDataURL('image/png', function (err, png) {
            if (err) return done(err)
            expect(png).to.equal('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAABQCAYAAACTb8w2AAAABmJLR0QA/wD/AP+gvaeTAAABWklEQVRoge2asW2FMBRFn6OIzjRQ0v8xSAb4TEEmYJywBQMka9DT0sQVFemQgHcVxyZfjnRPxxO2j4x19WRhJIK2bddjre97EzrfU4zM1VAGQRkEZRBJyQQH1LquL8MwfBzr9/v91Rjz+acyx7Rtmkbquhbn3Faz1krXdaexvqn87Cuj4ZyTaZq256qqYqZL68xQBkEZBGUQwTlTFIWUZSl5nm+1LMviZGL62GVZTgnsi7Zu8M7M88wEfhiUQVAGkZRMWgmsFbV01PBNYN/5mMAIyiAog6AMIv0E9iWmB75Uhgn8SCiDoAwiKZn/msDvp8qyfCkJfH5P5O1qmT3zjO6BczzoB5I6M5RBUAZBGURU22mt3XV3sW2net+r3xrsk/V2ExlHLVn9Eli7aw7+TOMYOhKT1JmhDIIyCMogkpL5xb8Qq5LKfgnc98ZrnaR2hjIIyiAog6AM4hsADXQLV9TxQwAAAABJRU5ErkJggg==')
            done()
        })
    })
})
