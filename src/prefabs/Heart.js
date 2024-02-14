class Heart extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // var/consts
        this.VELOCITY = 600

        this.scene = scene
        this.moving = false

        // add to scene and engine
        scene.add.existing(this) 
        scene.physics.add.existing(this) 

        // heart settings
        this.scale = 4
        this.body.setSize(this.width/2, this.height/2)
        this.body.setCollideWorldBounds(true)
        this.setDamping(true)
        this.setBounce(1)
        this.setDrag(0.25)

        // play anim
        this.anims.play('heart-beat')

        // create emitter for heart
        this.emitter = scene.add.particles(0, 0, '4x4', {
            speed: 25,
            scale: { start: 1, end: 3 },
            alpha: { start: 1, end: 0 },
            tint:  [ 0x380000, 0x460000, 0x6f0000 ]
        })
        this.emitter.startFollow(this, 0, 0, false)
        this.emitter.depth = -1
    }

    update() {
        // check movement
        this.movement()
    }

    movement() {
        // handle movement
        if (cursors.left.isDown){
            this.body.setAngularVelocity(-250)
        } else if (cursors.right.isDown){
            this.body.setAngularVelocity(250)
        } else {
            this.body.setAngularVelocity(0)
        }

        if (cursors.up.isDown){
            this.scene.physics.velocityFromRotation(this.rotation + 1.5708, this.VELOCITY, this.body.acceleration)
            this.moving = true
        } else if (cursors.down.isDown){
            this.scene.physics.velocityFromRotation(this.rotation + 1.5708, -this.VELOCITY, this.body.acceleration)
            this.moving = true
        } else {
            this.body.setAcceleration(0)
            this.moving = false
        }
        // found in phaser documentation examples:
        // https://github.com/phaserjs/examples/blob/master/public/src/physics/arcade/asteroids%20movement.js 
        if (this.moving) {
            this.emitter.start()
        } else {
            this.emitter.stop()
        }
    }
    
    blowUp() {
        // explode particles
        this.setAlpha(0)
        this.scene.add.particles(0, 0, '4x4', {
            speed: 50,
            frequency: 100,
            scale: { start: 1, end: 3 },
            alpha: { start: 1, end: 0 },
            lifespan: 1000,
            tint:  [ 0x380000, 0x460000, 0x6f0000 ]
        }).setDepth(-1).explode(75, this.x, this.y)
    }
}