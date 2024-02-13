class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // add background

        // add heart (player)
        this.heart = new Heart(this, w/2, h/2, 'heart', 0)




        // keyboard inputs
        cursors = this.input.keyboard.createCursorKeys()

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)
    }

    update() {
        this.heart.update()
    }
}