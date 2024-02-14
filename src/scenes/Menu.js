class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")

        this.PADDING = 30
        this.CREDITS = 
        `
        Development: Blake Warkenton \n
        Music: \n
        SFX: zapsplat.com (links embedded)
        Font: Nathan Altice (unless he stole it without creditting)
        `
        //mus
        // sfx:
        // https://www.zapsplat.com/music/body-hit-impact-with-baseball-bat-or-other-similar-club-hard-whack-with-a-crack-and-squelch-of-blood-version-1/
        // 

    }

    create() {
        // vars
        this.startGame = false
        this.creditsFlag = false

        this.blackOut = this.add.rectangle(0, 0, w, h, 0x000000).setOrigin(0, 0).setAlpha(0.5)
        this.flesh = this.add.tileSprite(w/2, h/2, 1600, 800, 'scrolling-flesh').setOrigin(0.5).setScale(2).setDepth(-100)
        this.fleshGround1 = this.add.tileSprite(w, h - 25, 1600, 200, 'flesh').setOrigin(0.5).setRotation(1.5708).setScale(2)
        this.fleshGround2 = this.add.tileSprite(0, h - 25, 1600, 200, 'flesh').setOrigin(0.5).setRotation(1.5708).setScale(2)

        this.titleText = this.add.bitmapText(w/2, h/2, 'gem', `ROTTEN`, 160).setOrigin(0.5, 1).setTint(0x460000)
        this.playText = this.add.bitmapText(w/2, h/2 + this.PADDING*2, 'gem', `PLAY: Space`, 48).setOrigin(0.5).setTint(0x460000)
        this.creditsText = this.add.bitmapText(w/2, h/2 + this.PADDING*4, 'gem', `CREDITS: Esc`, 48).setOrigin(0.5).setTint(0x460000)
        this.creditsBody = this.add.bitmapText(w/2, h/2, 'gem', this.CREDITS, 32).setOrigin(0.5).setTint(0x460000).setAlpha(0)
        this.creditsTitle = this.add.bitmapText(w/2, this.creditsBody.y-this.creditsBody.height/2-this.PADDING, 'gem', `CREDITS`, 160).setOrigin(0.5, 1).setTint(0x460000).setAlpha(0)
        this.creditsNote = this.add.bitmapText(w/2, this.creditsBody.y+this.creditsBody.height/2+this.PADDING, 'gem', 'Anything unspecified was created by me (Blake Warkenton)', 16).setOrigin(0.5, 0).setTint(0x460000).setAlpha(0)
        this.controlText = this.add.bitmapText(w/2, h/2, 'gem', 'Move: Up Arrow, Down Arrow\n\nRotate: Left Arrow, Right Arrow', 48).setOrigin(0.5).setTint(0x460000).setAlpha(0)
        this.controlTitle = this.add.bitmapText(w/2, this.controlText.y - this.controlText.height - this.PADDING, 'gem', 'CONTROLS', 128).setOrigin(0.5, 1).setTint(0x460000).setAlpha(0)


        this.bgm = this.sound.add('music', { 
            mute: false,
            volume: 0.05,
            rate: 0.25,
            loop: true 
        });
        this.bgm.play();


        spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
        escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
    }

    update() {
        this.flesh.tilePositionY -= 1 * difficulty
        this.fleshGround1.tilePositionX += 1
        this.fleshGround2.tilePositionX += 1



        if (Phaser.Input.Keyboard.JustDown(spaceKey) && this.playText.alpha > 0) {
            this.startGame = true

            this.titleText.setAlpha(0)
            this.playText.setAlpha(0)
            this.creditsText.setAlpha(0)

            this.controlTitle.setAlpha(1)
            this.controlText.setAlpha(1)

            this.time.delayedCall(5000, () => {
                this.bgm.stop()
                this.scene.start('playScene')
            }, null, this);
        } else if (Phaser.Input.Keyboard.JustDown(escKey)) {
            if (this.creditsFlag) {
                this.creditsFlag = false
            } else {
                this.creditsFlag = true
            }
        }

        if (this.creditsFlag) {
            this.titleText.setAlpha(0)
            this.playText.setAlpha(0)
            this.creditsText.setAlpha(0)

            this.creditsTitle.setAlpha(1)
            this.creditsBody.setAlpha(1)
            this.creditsNote.setAlpha(1)
        } else if (!(this.startGame)) {
            this.titleText.setAlpha(1)
            this.playText.setAlpha(1)
            this.creditsText.setAlpha(1)

            this.creditsTitle.setAlpha(0)
            this.creditsBody.setAlpha(0)
            this.creditsNote.setAlpha(0)
        }
    }

}