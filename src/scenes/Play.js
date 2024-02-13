class Play extends Phaser.Scene {
    constructor() {
        super("playScene")

        // vars/consts
        this.PADDING = 80

        this.gameTime = 0
        this.gameOver = false  

        this.rng
        
        // flags
        this.scrollFlag = true
        this.launchFlag = false
        this.difficultyFlag = false
    }

    create() {
        // add tilesprites
        this.flesh = this.add.tileSprite(w/2, h/2, 1600, 800, 'scrolling-flesh').setOrigin(0.5).setScale(2).setDepth(-100)

        this.fleshGround = this.add.tileSprite(w/2, h - 25, 1600, 200, 'flesh').setOrigin(0.5)
        this.physics.add.existing(this.fleshGround)
        this.fleshGround.body.setSize(w, this.fleshGround.height/2)
        this.fleshGround.depth = 75

        // add heart (player)
        this.heart = new Heart(this, w/2, h/2, 'heart', 0).setCircle(6)

        // add eyes .-.
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
        // group eyes
        this.eyes = this.add.group([this.eye1, this.eye2, this.eye3, this.eye4, this.eye5, this.eye6, this.eye7, this.eye8, this.eye9, this.eye10])

        // add evil hearts
        this.evil1 = new EvilHeart(this, 1600 * 1/10 - this.PADDING, h - 50, 'evil-heart').setOrigin(0.5)
        this.evil2 = new EvilHeart(this, 1600 * 2/10 - this.PADDING, h - 50, 'evil-heart').setOrigin(0.5)
        this.evil3 = new EvilHeart(this, 1600 * 3/10 - this.PADDING, h - 50, 'evil-heart').setOrigin(0.5)
        this.evil4 = new EvilHeart(this, 1600 * 4/10 - this.PADDING, h - 50, 'evil-heart').setOrigin(0.5)
        this.evil5 = new EvilHeart(this, 1600 * 5/10 - this.PADDING, h - 50, 'evil-heart').setOrigin(0.5)
        this.evil6 = new EvilHeart(this, 1600 * 6/10 - this.PADDING, h - 50, 'evil-heart').setOrigin(0.5)
        this.evil7 = new EvilHeart(this, 1600 * 7/10- this.PADDING, h - 50, 'evil-heart').setOrigin(0.5)
        this.evil8 = new EvilHeart(this, 1600 * 8/10- this.PADDING, h - 50, 'evil-heart').setOrigin(0.5)
        this.evil9 = new EvilHeart(this, 1600 * 9/10 - this.PADDING, h - 50, 'evil-heart').setOrigin(0.5)
        this.evil10 = new EvilHeart(this, 1600 * 10/10 - this.PADDING , h - 50, 'evil-heart').setOrigin(0.5, 0.5)
        // group evils
        this.evils = this.add.group([this.evil1, this.evil2, this.evil3, this.evil4, this.evil5, this.evil6, this.evil7, this.evil8,this.evil9, this.evil10])



        //add colliders
        this.physics.add.collider(this.heart, this.eyes, this.heartCollide, null, this)
        this.physics.add.overlap(this.eyes, this.eyes, (eyeC1, eyeC2) => {
            eyeC2.reset()
        }, null, this)
        this.physics.add.overlap(this.heart, this.fleshGround, () => {
            this.gameOver = true
            console.log('game over')
        }, null, this)
        this.physics.add.collider(this.evils, this.eyes, (evil, eye) => {
            eye.reset()
        }, null, this)


        // keyboard inputs
        cursors = this.input.keyboard.createCursorKeys()

        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        // timers
        this.timer = this.time.addEvent({
            delay: 1000,                // ms
            callback: () => {
                this.gameTime += 1
                console.log(this.gameTime)
                this.rng = Phaser.Math.Between(0, 10)

                if (!this.launchFlag) {
                    this.launchFlag = true
                } 
            },
            callbackScope: this,
            loop: true
        });
    }

    update() {
        // scrolling 
        this.flesh.tilePositionY -= 1 * difficulty
        if (this.scrollFlag) {
            this.fleshGround.tilePositionX -= 1
        } else {
            this.fleshGround.tilePositionX += 1
        }

        // run heart
        this.heart.update()
        // run eyes e-e
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
        //run hearts e-e
        this.evil1.update()
        this.evil2.update()
        this.evil3.update()
        this.evil4.update()
        this.evil5.update()
        this.evil6.update()
        this.evil7.update()
        this.evil8.update()
        this.evil9.update()
        this.evil10.update()


        // timer checks
        if (this.gameTime % 3 == 0 && !(this.gameTime % 6 == 0) && !this.scrollFlag) {
            this.scrollFlag = true 
        } else if (this.gameTime % 6 == 0 && this.scrollFlag) {
            this.scrollFlag = false
        }

        if (this.gameTime % 15 == 0 && this.gameTime != 0 && !this.difficultyFlag) {
            this.difficultyFlag = true
            difficulty += 0.1
        } else if (!(this.gameTime % 3 == 0)) {
            this.difficultyFlag = false
        }

        if (this.launchFlag && this.rng == 1) {
            console.log('firing launch')
            let eyeNum = Phaser.Math.Between(1,10)
            let funcString = `this.evil${eyeNum}.launch()`

            eval(funcString)
            this.launchFlag = false
        }
    }

    heartCollide() {
        console.log('collisions with eye')
    }
}