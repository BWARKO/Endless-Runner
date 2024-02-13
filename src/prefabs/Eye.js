class Eye extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // set vars/consts
        this.VELOCITY = -1
        this.scene = scene

        // add to scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        // eye settings
        this.setScale(4)
        this.body.setSize(this.width/1.5, this.height/2)
        this.body.setImmovable(true)

        // play anim
        this.anims.play('eye-anim')
    }

    update() {
        this.scroll()
        if (this.y >= h + this.height) {
            this.reset()
        }
    }


    reset() {
        // add to scene
        this.x = Phaser.Math.Between(0 + this.width, w - this.width)
        this.y = Phaser.Math.Between(0 - this.height, 0 - 1600)
    }

    scroll() {
        this.y += 2 * difficulty
    }
}