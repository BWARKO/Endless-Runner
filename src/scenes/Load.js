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
        this.load.image('heart', 'sprites/heart.png')

        // load audio assets
        // this.load.audio()

        // load font
        // this.load.bitmapFont('gem', 'font/gem.png', 'font/gem.xml')

    }

    create() {
        // check for local storage browser support
        window.localStorage ? console.log('Local storage supported') : console.log('Local storage not supported')

        // go to Title scene
        this.scene.start('menuScene')
    }
}