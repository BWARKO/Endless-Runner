// Game: ROT
// Name: Blake Warkenton

"use strict"

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Load, Menu, Play, Gameover ],
}

let game = new Phaser.Game(config)

// define globals
let w = game.config.width
let h = game.config.height

let cursors
