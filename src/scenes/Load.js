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
        this.load.spritesheet('eye', 'sprites/eyeball.png', {
            frameWidth: 75,
            frameHeight: 55
        })
        this.load.spritesheet('evil-heart', 'sprites/evil-heart.png', {
            frameWidth: 32,
            frameHeight: 40
        })
        this.load.image('scrolling-flesh', 'sprites/scrolling-flesh.png')
        this.load.image('flesh', 'sprites/flesh-ground.png')
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
            frames: this.anims.generateFrameNumbers('heart', {start: 0, end: 1})
        })
        this.anims.create({
            key: 'eye-anim',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('eye', { frames: [
                                                            0 ,0, 0, 0, 0, 0, 
                                                            1, 2, 
                                                            3, 3, 3, 
                                                            4, 4, 4,
                                                            5, 6, 
                                                            7, 7, 7, 7 ,7 ,7 
            ]})
        })
        this.anims.create({
            key: 'evil-chomp',
            frameRate: 6,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('evil-heart', { frames: [
                                                                    0, 1, 2, 1, 0
            ]})
        })

        // go to Title scene
        this.scene.start('menuScene')
    }
}