// Game: ROTTEN
// Name: Blake Warkenton
// Time: 20-30 hours (I lost track, but definitely worked on it for 20+)
// Creative Tilt: 
// I started entirely from scratch and used no exact previous structure as a layout.
// I did use a lot of examples and documentation to my benefit, but for the most part
// I entirely built from the ground up with no reference or frame in mind. I've never EVER
// made my own custom assets, and I think for a first time I did really good and am incredibly proud
// how they came out. I think the game is relatively fun. I do think because of how I structured my game
// and the amount of documentation not provided by class I had too look up and my use shows a level of care
// and creativity. I tried my best to make the game feel good, and I also think I acheived that. The 
// mechanics are a little difficult to some, so I've found out, but can get picked up pretty fast. Hopefully
// you think the game is as enjoyably and 'cool' as I think it is.
//
// my exact credit links are in menu in the constructor, i wasnt sure how to credit royalty free

"use strict"

let config = {
    type: Phaser.AUTO,
    width: 1600,
    height: 800,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
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
let difficulty = 1
let highscore = 0
let newHighscore = false

let cursors
let spaceKey
let escKey