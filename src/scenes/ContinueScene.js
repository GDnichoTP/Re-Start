import Phaser from 'phaser'
import Player from '../modules/Player'
import DialoguePreload from '../modules/DialoguePreload'

export default class ContinueScene extends Phaser.Scene
{
	constructor()
	{
		super('continue_scene')
	}

    init()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.barrier = this.physics.add.staticGroup()
        this.player = undefined
        this.title = undefined
        this.switch = this.physics.add.staticGroup()
        this.sceneStage = 0
        this.playerx = 160
        this.playery = -200
        this.robotx = 306
        this.roboty = 125
        this.one = undefined
        this.two = undefined
    }

	preload()
    {
        this.load.image('title', 'images/title.png')
        this.load.image('bg1', 'images/bg1.png')
        this.load.image('lab_wall', 'images/lab_wall.png')
        this.load.image('barrier', 'images/barrier.png')
        this.load.image('switch', 'images/switch.png')
        this.load.spritesheet('robot', 'images/tv_assets.png', {
            frameWidth: 96, frameHeight: 54
        })
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
        this.time.addEvent({
            callback: this.spawnScene,
            callbackScope: this
        })

        this.add.image(300, 150, 'bg1')
        this.switch.create(570, 150, 'switch').refreshBody().setVisible(false)
        this.switch.create(30, 150, 'switch').refreshBody().setVisible(false)
        
        this.bot = this.add.sprite(this.robotx, this.roboty, 'robot')
        this.bot.anims.play('robot_idle', true)

        this.barrier.create(300, 360, 'barrier').refreshBody().setVisible(false)
        this.wall = this.add.image(300, 150, 'lab_wall')
        this.trans = this.add.sprite(300, 150, 'transition')

        this.one = this.add.image(300, 150, '1retry').setInteractive().setVisible(false)
        this.two = this.add.image(300, 150, '2retry').setInteractive().setVisible(false)

        //animation
        this.anims.create({
            key: 'robot_off',
            frames: [{key: 'robot', frame: 0}]
        })
        this.anims.create({
            key: 'robot_on',
            frames: this.anims.generateFrameNumbers('robot', {
                start: 0, end: 4
            }),
            frameRate: 10
        })
        this.anims.create({
            key: 'robot_idle',
            frames: this.anims.generateFrameNumbers('robot', {
                start: 5, end: 9
            }),
            frameRate: 5,
            repeat: -1
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
        if(this.sceneStage == 1){
            this.controls(this.player, time)
        }
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
        if(this.player.body.touching.left){
            this.changeScene()
        }
    }

    spawnScene()
    {
        this.trans.anims.play('trans_out', true)
        //create player
        this.player = Player(this.physics, this.anims, this.playerx, this.playery)
        this.player.setInteractive()
        this.player.anims.play('player_fall', true)
        this.physics.add.collider(this.player, this.barrier)
        this.physics.add.collider(this.player, this.switch)

        this.wall.setDepth(1)
        this.one.setDepth(2)
        this.two.setDepth(3)
        this.trans.setDepth(4)

        //dialogue
        this.player.on('pointerdown', () => {
            this.one.setVisible(true)
            this.player.anims.play('player_wake', true)
        })
        this.one.on('pointerdown', () => {
            this.one.setVisible(false)
            this.two.setVisible(true)
            this.sceneStage = 1
        })
        this.two.on('pointerdown', () => {
            this.two.setVisible(false)
        })
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
        this.scene.start('end')
    }
}
