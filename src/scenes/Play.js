class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // add background
        this.flesh = this.add.tileSprite(w/2, h/2, 1600, 800, 'scrolling-flesh').setOrigin(0.5).setScale(2).setDepth(-100)

        // add heart (player)
        this.heart = new Heart(this, w/2, h/2, 'heart', 0)

        // add eyes
        this.eye1 = new Eye(this, Phaser.Math.Between(0 + 75, w - 75), Phaser.Math.Between(0 - 550, 0 - 1600), 'eye').setOrigin(0.5)
        this.eye2 = new Eye(this, Phaser.Math.Between(0 + 75, w - 75), Phaser.Math.Between(0 - 550, 0 - 1600), 'eye').setOrigin(0.5)
        this.eye3 = new Eye(this, Phaser.Math.Between(0 + 75, w - 75), Phaser.Math.Between(0 - 550, 0 - 1600), 'eye').setOrigin(0.5)
        this.eye4 = new Eye(this, Phaser.Math.Between(0 + 75, w - 75), Phaser.Math.Between(0 - 550, 0 - 1600), 'eye').setOrigin(0.5)
        this.eye5 = new Eye(this, Phaser.Math.Between(0 + 75, w - 75), Phaser.Math.Between(0 - 550, 0 - 1600), 'eye').setOrigin(0.5)
        this.eye6 = new Eye(this, Phaser.Math.Between(0 + 75, w - 75), Phaser.Math.Between(0 - 550, 0 - 1600), 'eye').setOrigin(0.5)
        this.eye7 = new Eye(this, Phaser.Math.Between(0 + 75, w - 75), Phaser.Math.Between(0 - 550, 0 - 1600), 'eye').setOrigin(0.5)
        this.eye8 = new Eye(this, Phaser.Math.Between(0 + 75, w - 75), Phaser.Math.Between(0 - 550, 0 - 1600), 'eye').setOrigin(0.5)
        this.eye9 = new Eye(this, Phaser.Math.Between(0 + 75, w - 75), Phaser.Math.Between(0 - 550, 0 - 1600), 'eye').setOrigin(0.5)
        this.eye10 = new Eye(this, Phaser.Math.Between(0 + 75, w - 75), Phaser.Math.Between(0 - 550, 0 - 1600), 'eye').setOrigin(0.5)

        this.eyes = this.add.group([this.eye1, this.eye2, this.eye3, this.eye4, this.eye5, this.eye6, this.eye7, this.eye8, this.eye9, this.eye10])
        this.physics.add.collider(this.heart, this.eyes, this.heartCollide, null, this)
        this.physics.add.collider(this.eyes, this.eyes, (eyeC1, eyeC2) => {
            console.log(eyeC1, eyeC2)
            eyeC2.reset()
        }, null, this)


        // keyboard inputs
        cursors = this.input.keyboard.createCursorKeys()

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)
    }

    update() {
        // scrolling background
        this.flesh.tilePositionY -= 1

        // run heart
        this.heart.update()
        // run eyes
        this.eye1.update()
        this.eye2.update()
        this.eye3.update()
        this.eye4.update()
        this.eye5.update()
        this.eye6.update()
        this.eye7.update()
        this.eye8.update()
        this.eye9.update()
        this.eye10.update()
    }

    heartCollide() {
        console.log('collisions with eye')
    }
}