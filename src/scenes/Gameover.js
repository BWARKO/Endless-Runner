class Gameover extends Phaser.Scene {
    constructor() {
        super("gameoverScene")

        this.PADDING = 30
    }

    create() {
        this.blackOut = this.add.rectangle(0, 0, w, h, 0x000000).setOrigin(0, 0).setAlpha(0.5)
        this.flesh = this.add.tileSprite(w/2, h/2, 1600, 800, 'scrolling-flesh').setOrigin(0.5).setScale(2).setDepth(-100)
        this.fleshGround1 = this.add.tileSprite(w, h - 25, 1600, 200, 'flesh').setOrigin(0.5).setRotation(1.5708).setScale(2)
        this.fleshGround2 = this.add.tileSprite(0, h - 25, 1600, 200, 'flesh').setOrigin(0.5).setRotation(1.5708).setScale(2)

        this.highscore = this.add.bitmapText(w/2, this.PADDING*3, 'gem', `CURRENT HIGHSCORE: ${highscore}`, 64).setOrigin(0.5).setTint(0x460000)
        this.newHighscoreText = this.add.bitmapText(w/2, h/2, 'gem', `NEW HIGHSCORE: ${highscore}`, 128).setOrigin(0.5).setTint(0x460000).setAlpha(0)
        this.restartText = this.add.bitmapText(w/2, h/2, 'gem', `Would you like to restart?`, 64).setOrigin(0.5).setTint(0x460000).setAlpha(0)
        this.yesText = this.add.bitmapText(w/3, h/2+this.PADDING*3, 'gem', `SPACE(Yes)`, 32).setOrigin(0.5).setTint(0x460000).setAlpha(0)
        this.noText = this.add.bitmapText(w/1.5, h/2+this.PADDING*3, 'gem', `ESC(No)`, 32).setOrigin(0.5).setTint(0x460000).setAlpha(0)

        spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        if (newHighscore) {
            this.sound.play('chime', { volume: 0.1 })


            this.newHighscoreText.setAlpha(1)
            this.time.delayedCall(3000, () => {
                this.newHighscoreText.setAlpha(0)
                this.restartText.setAlpha(1)
                this.time.delayedCall(1500, () => {
                    this.yesText.setAlpha(1)
                }, null, this);
                this.time.delayedCall(3000, () => {
                    this.noText.setAlpha(1)
                }, null, this);
                }, null, this);

            newHighscore = false
        } else {
            this.restartText.setAlpha(1)
            this.time.delayedCall(1500, () => {
                this.yesText.setAlpha(1)
            }, null, this);
            this.time.delayedCall(1750, () => {
                this.noText.setAlpha(1)
            }, null, this);
        }

        this.bgm = this.sound.add('music', { 
            mute: false,
            volume: 0.05,
            rate: 0.25,
            loop: true 
        });
        this.bgm.play()
    }
    
    update() {
        this.flesh.tilePositionY -= 1 * difficulty
        this.fleshGround1.tilePositionX += 1
        this.fleshGround2.tilePositionX += 1

        if (Phaser.Input.Keyboard.JustDown(spaceKey) && this.yesText.alpha > 0) {
            this.sound.play('click', { volume: 0.4 })
            this.bgm.stop()
            this.scene.start('playScene')
        }
        if (Phaser.Input.Keyboard.JustDown(escKey) && this.noText.alpha > 0) {
            this.sound.play('click', { volume: 0.4 })
            this.bgm.stop()
            this.scene.start('menuScene')
        }
    }
}