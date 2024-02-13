class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    create() {

    }

    update() {
        // goto play scene
        this.scene.start('playScene')
    }

}