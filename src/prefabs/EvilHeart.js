class EvilHeart extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        //vars
        this.scene = scene
        this.xPos = x
        this.yPos = y

        this.fired = false

        // add to scene and physics
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // eye settings
        this.depth = 100
        this.setScale(4)
        this.body.setImmovable(true)
        this.body.setCircle(12, 4, 1)

        // play anim
        this.anims.play('evil-chomp')
    }

    update() {
        if (this.y <= 0 - 160) {
            this.reset()
        }
    }

    launch() {
        this.scene.sound.play('growl', { volume: 0.5 })
        this.body.setVelocityY(-200 * difficulty)
    }

    reset() {
        this.body.setVelocityY(0)

        this.setX(this.xPos)
        this.setY(this.yPos)
    }
}