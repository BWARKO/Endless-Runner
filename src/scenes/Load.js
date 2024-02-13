class Load extends Phaser.Scene {
    constructor() {
        super("loadScene")
    }

    preload() {
        let loadingBar = this.add.graphics()
        this.load.on('progress', (value) => {
            loadingBar.clear()                              // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1)               // (color, alpha)
            loadingBar.fillRect(0, h/2, w * value, 5)   // (x, y, w, h)
        })
        this.load.on('complete', () => {
            loadingBar.destroy()
        })

        this.load.path = './assets/'
        // load graphics assets
        this.load.spritesheet('heart', 'sprites/heart.png', {
            frameWidth: 24,
            frameHeight: 24
        })
        this.load.image('4x4', 'sprites/4x4.png')

        // load audio assets
        // this.load.audio()

        // load font
        // this.load.bitmapFont('gem', 'font/gem.png', 'font/gem.xml')

    }

    create() {
        // create anims
        this.anims.create({
            key: 'heart-beat',
            frameRate: 3,
            repeat: -1,
            frames: this.anims.generateFrameNames('heart', {start: 0, end: 1})
        })

        // go to Title scene
        this.scene.start('menuScene')
    }
}