class Gameover extends Phaser.Scene {
    constructor() {
        super("gameoverScene")
    }

    create() {
        this.gameOverText = this.add.bitmapText(w/2, h/2, 'gem', `Would you like to restart?`, 64).setOrigin(0.5).setTint(0x460000).setAlpha(0).setDepth(150);

    }
    
}