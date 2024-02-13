class Eye extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // set vars/consts
        this.VELOCITY = 400
        this.scene = scene

        // add to scene
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        // eye settings
        this.setScale(Phaser.Math.Between(2, 5))
        this.body.setCircle(18,21,11)
        this.body.setImmovable(true)
        
        // randomly play anim
        scene.time.delayedCall(Phaser.Math.Between(0, 5000), () => this.anims.play('eye-anim'), null, scene)

    }

    update() {
        this.scroll()
        if (this.y >= h + this.height) {
            this.reset()
        }
    }

    reset() {
        // create emitter for eye
        this.eyeEmitter = this.scene.add.particles(this.x, this.y, '4x4', {
            speed: 100,
            frequency: 10,
            scale: { start: 1, end: 3 },
            alpha: { start: 1, end: 0 },
            lifespan: 1000,
            maxParticles: 20,
            blendMode: 'ADD',
            tint:  [ 0x380000, 0x460000, 0x6f0000 ]
        }).setDepth(-1)
        this.eyeEmitter.y -= 2

        // play anim
        this.anims.restart('eye-anim')
        // randomize scale again
        this.setScale(Phaser.Math.Between(2, 5))
        // add to scene
        this.x = Phaser.Math.Between(0 + this.width, w - this.width)
        this.y = Phaser.Math.Between(0 - this.height, 0 - 1600)
    }

    scroll() {
        this.body.setVelocityY(120 * difficulty)
    }
}