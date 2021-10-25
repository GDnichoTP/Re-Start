import Phaser from 'phaser'
import Player from '../modules/Player'
import DialoguePreload from '../modules/DialoguePreload'

export default class Level3 extends Phaser.Scene
{
	constructor()
	{
		super('level3')
	}

    init()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.barrier = this.physics.add.staticGroup()
        this.player = undefined
        this.playerx = 125
        this.playery = 160
        this.sceneStage = 0
        this.robotx = 306
        this.roboty = 125
    }
    
    preload()
    {
        this.load.image('bg1', 'images/bg1.png')
        this.load.image('lab_wall', 'images/lab_wall.png')
        this.load.image('barrier', 'images/barrier.png')
        this.load.spritesheet('robot', 'images/tv_assets.png', {
            frameWidth: 96, frameHeight: 54
        })
        this.load.spritesheet('transition', 'images/transition.png', {
            frameWidth: 600, frameHeight: 300
        })
        this.load.spritesheet('player', 'images/player_assets.png', {
            frameWidth: 48, frameHeight: 80
        })
        DialoguePreload(this.load)
    }

    create()
    {
        this.add.image(300, 150, 'bg1')
        this.barrier.create(300, 360, 'barrier').refreshBody().setVisible(false)

        this.trans = this.add.sprite(300, 150, 'transition').setDepth(1)
        this.trans.anims.play('trans_out', true)

        this.anims.create({
            key: 'robot_idle',
            frames: this.anims.generateFrameNumbers('robot', {
                start: 5, end: 9
            }),
            frameRate: 5,
            repeat: -1
        })
        this.bot = this.add.sprite(this.robotx, this.roboty, 'robot')
        this.bot.anims.play('robot_idle', true)

        this.player = Player(this.physics, this.anims, this.playerx, this.playery)
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.barrier)

        this.add.image(300, 150, 'lab_wall')

        this.one = this.add.image(300, 150, '1level3').setInteractive()
        this.respondno = this.add.image(300, 150, 'no').setInteractive().setVisible(false)
        this.twono = this.add.image(300, 150, '2level3_ifno').setInteractive().setVisible(false)
        this.threeno = this.add.image(300, 150, '3level3_ifno').setInteractive().setVisible(false)

        this.correct = this.add.image(300, 150, 'correct').setInteractive().setVisible(false)
        this.wrong = this.add.image(300, 150, 'wrong').setInteractive().setVisible(false)

        this.one.on('pointerdown', () => {
            this.one.setVisible(false)
            this.respondno.setVisible(true)
        })
        this.respondno.on('pointerdown', () => {
            this.respondno.setVisible(false)
            this.twono.setVisible(true)
        })
        this.twono.on('pointerdown', () => {
            this.twono.setVisible(false)
            this.threeno.setVisible(true)
        })
        this.threeno.on('pointerdown', () => {
            this.threeno.setVisible(false)
            this.changeScene()
        })

        this.anims.create({
            key: 'trans_out',
            frames: this.anims.generateFrameNumbers('transition', {
                start: 0, end: 4
            }),
            frameRate: 10
        })
        this.anims.create({
            key: 'trans_in',
            frames: this.anims.generateFrameNumbers('transition', {
                start: 5, end: 9
            }),
            frameRate: 10
        })
    }

    update(time)
    {
        //player controls
        this.controls(this.player, time)
    }

    controls(player, time)
    {
        var vy = this.player.body.velocity.y
        var vx = this.player.body.velocity.x

        if(this.cursors.space.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-300)
            if(vx >= 0 && vy <= 0){
                this.player.anims.play('player_jump1', true)
            }  
            if(vx <= -1){
                this.player.anims.play('player_jump2', true)
            }
        } else if(this.cursors.left.isDown){
            this.player.setVelocityX(-125)
            if(!this.player.body.touching.down){
                this.player.anims.play('player_jump2', true)
            } else {
                this.player.anims.play('player_left', true)
            }
        } else if(this.cursors.right.isDown){
            this.player.setVelocityX(125)
            if(!this.player.body.touching.down){
                this.player.anims.play('player_jump1', true)
            } else {
                this.player.anims.play('player_right', true)
            }
        } else {
            this.player.setVelocityX(0)
            if(vy == 0){
                this.player.anims.play('player_idle1', true)
            }
        } 
    }

    changeScene()
    {
        this.trans.setVisible(true)
        this.trans.anims.play('trans_in', true)
        this.time.addEvent({
            delay: 1000,
            callback: this.nextScene,
            callbackScope: this
        })
    }

    nextScene()
    {
        this.scene.start('continue_scene')
    }
}