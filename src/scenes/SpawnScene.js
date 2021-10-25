import Phaser from 'phaser'
import Player from '../modules/Player'
import DialoguePreload from '../modules/DialoguePreload'

export default class SpawnScene extends Phaser.Scene
{
	constructor()
	{
		super('spawn_scene')
	}

    init()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.barrier = this.physics.add.staticGroup()
        this.player = undefined
        this.title = undefined
        this.switch = this.physics.add.staticGroup()
        this.speed = 0
        this.cam = this.cameras.main
        this.sceneStage = 0
        this.playerx = 160
        this.playery = -200
        this.robotx = 306
        this.roboty = 425
        this.one = undefined
        this.two = undefined
        this.three = undefined
        this.four = undefined
        this.five = undefined
        this.six = undefined
        this.seven = undefined
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
        this.title = this.add.image(300, 150, 'title').setInteractive()
        this.add.image(300, 450, 'bg1')
        this.switch.create(570, 450, 'switch').refreshBody().setVisible(false)
        this.switch.create(30, 450, 'switch').refreshBody().setVisible(false)
        
        this.bot = this.add.sprite(this.robotx, this.roboty, 'robot')
        this.bot.anims.play('robot_off', true)

        this.barrier.create(300, 660, 'barrier').refreshBody().setVisible(false)
        this.wall = this.add.image(300, 450, 'lab_wall')
        this.op = this.add.sprite(300, 150, 'transition').setVisible(false)
        this.trans = this.add.sprite(300, 450, 'transition')

        this.one = this.add.image(300, 450, '1spawn').setInteractive().setVisible(false)
        this.two = this.add.image(300, 450, '2spawn').setInteractive().setVisible(false)
        this.three = this.add.image(300, 450, '3spawn').setInteractive().setVisible(false)
        this.four = this.add.image(300, 450, '4spawn').setInteractive().setVisible(false)
        this.five = this.add.image(300, 450, '5spawn').setInteractive().setVisible(false)
        this.six = this.add.image(300, 450, '6spawn').setInteractive().setVisible(false)
        this.seven = this.add.image(300, 450, '7spawn').setInteractive().setVisible(false)

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
        this.anims.create({
            key: 'op_out',
            frames: this.anims.generateFrameNumbers('transition', {
                start: 0, end: 4
            }),
            frameRate: 10
        })
        this.anims.create({
            key: 'op_in',
            frames: this.anims.generateFrameNumbers('transition', {
                start: 5, end: 9
            }),
            frameRate: 10
        })

        //scene transition
        this.title.on('pointerdown', () => {
            this.op.setVisible(true)
            this.op.anims.play('op_in')
            this.time.addEvent({
                delay: 1000,
                callback: this.opening,
                callbackScope: this
            })
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
        if(this.player.body.touching.right){
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
        this.three.setDepth(4)
        this.four.setDepth(5)
        this.five.setDepth(6)
        this.six.setDepth(7)
        this.seven.setDepth(8)
        this.trans.setDepth(9)

        //dialogue
        this.player.on('pointerdown', () => {
            this.one.setVisible(true)
            this.player.anims.play('player_wake', true)
        })
        this.one.on('pointerdown', () => {
            this.one.setVisible(false)
            this.two.setVisible(true)
            this.bot.anims.play('robot_on', true)
            this.sceneStage = 1
        })
        this.two.on('pointerdown', () => {
            this.two.setVisible(false)
            this.three.setVisible(true)
            this.bot.anims.play('robot_idle', true)
        })
        this.three.on('pointerdown', () => {
            this.three.setVisible(false)
            this.four.setVisible(true)
        })
        this.four.on('pointerdown', () => {
            this.four.setVisible(false)
            this.five.setVisible(true)
        })
        this.five.on('pointerdown', () => {
            this.five.setVisible(false)
            this.six.setVisible(true)
        })
        this.six.on('pointerdown', () => {
            this.six.setVisible(false)
            this.seven.setVisible(true)
        })
        this.seven.on('pointerdown', () => {
            this.seven.setVisible(false)
        })
    }

    opening()
    {
        this.cam.scrollY += 300
        this.spawnScene()
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
        this.scene.start('1level1')
    }
}
