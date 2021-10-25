import Phaser from 'phaser'
import Player from '../modules/Player'
import DialoguePreload from '../modules/DialoguePreload'

export default class Level2Scene2 extends Phaser.Scene
{
	constructor()
	{
		super('2level3')
	}

    init()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.barrier = this.physics.add.staticGroup()
        this.player = undefined
        this.playerx = 125
        this.playery = 160
        this.sceneStage = 0
    }

    preload()
    {
        this.load.image('bg5', 'images/bg5.png')
        this.load.image('lab_wall2', 'images/lab_wall2.png')
        this.load.image('barrier', 'images/barrier.png')
        this.load.spritesheet('player', 'images/player_assets.png', {
            frameWidth: 48, frameHeight: 80
        })
        this.load.spritesheet('transition', 'images/transition.png', {
            frameWidth: 600, frameHeight: 300
        })
        DialoguePreload(this.load)
    }

    create()
    {

    }

    update()
    {
        
    }
}