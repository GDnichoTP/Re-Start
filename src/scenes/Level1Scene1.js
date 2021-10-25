import Phaser from 'phaser'
import Player from '../modules/Player'
import DialoguePreload from '../modules/DialoguePreload'

export default class Level1Scene1 extends Phaser.Scene
{
	constructor()
	{
		super('1level1')
	}

    init()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.barrier = this.physics.add.staticGroup()
        this.player = undefined
        this.playerx = 125
        this.playery = 160
        this.quizvar = 0
        this.sceneStage = 0
    }
    
    preload()
    {
        this.load.image('bg2', 'images/bg2.png')
        this.load.image('lab_wall', 'images/lab_wall.png')
        this.load.image('barrier', 'images/barrier.png')
        this.load.spritesheet('player', 'images/player_assets.png', {
            frameWidth: 48, frameHeight: 80
        })
        this.load.spritesheet('transition', 'images/transition.png', {
            frameWidth: 600, frameHeight: 300
        })
        this.load.image('button', 'images/button.png')
        this.load.image('start_button', 'images/start.png')
        this.load.image('a', 'images/a.png')
        this.load.image('b', 'images/b.png')
        this.load.image('c', 'images/c.png')
        DialoguePreload(this.load)
    }

    create()
    {
        this.add.image(300, 150, 'bg2')
        this.barrier.create(300, 360, 'barrier').refreshBody().setVisible(false)

        this.trans = this.add.sprite(300, 150, 'transition').setDepth(1)
        this.trans.anims.play('trans_out', true)

        this.button1 = this.add.image(150, 197, 'button').setInteractive()
        this.button2 = this.add.image(300, 197, 'button').setInteractive()
        this.button3 = this.add.image(450, 197, 'button').setInteractive()

        this.choice1 = this.add.image(150, 150, 'a').setVisible(false)
        this.choice2 = this.add.image(300, 150, 'b').setVisible(false)
        this.choice3 = this.add.image(450, 150, 'c').setVisible(false)

        this.player = Player(this.physics, this.anims, this.playerx, this.playery)
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.barrier)

        this.add.image(300, 150, 'lab_wall')
        this.start = this.add.image(300, 250, 'start_button').setInteractive().setVisible(false)

        this.one = this.add.image(300, 150, '1level1').setInteractive()
        this.two = this.add.image(300, 150, '2level1').setInteractive().setVisible(false)
        this.three = this.add.image(300, 150, '3level1').setInteractive().setVisible(false)

        this.question1a = this.add.image(300, 150, '1question1').setVisible(false)
        this.question1b = this.add.image(300, 150, '1question2').setVisible(false)
        this.question1c = this.add.image(300, 150, '1question3').setVisible(false)
        this.question2a = this.add.image(300, 150, '2question1').setVisible(false)
        this.question2b = this.add.image(300, 150, '2question2').setVisible(false)
        this.question2c = this.add.image(300, 150, '2question3').setVisible(false)
        this.question3a = this.add.image(300, 150, '3question1').setVisible(false)
        this.question3b = this.add.image(300, 150, '3question2').setVisible(false)
        this.question3c = this.add.image(300, 150, '3question3').setVisible(false)

        this.correct = this.add.image(300, 150, 'correct').setInteractive().setVisible(false)
        this.wrong = this.add.image(300, 150, 'wrong').setInteractive().setVisible(false)

        this.one.on('pointerdown', () => {
            this.one.setVisible(false)
            this.two.setVisible(true)
        })
        this.two.on('pointerdown', () => {
            this.two.setVisible(false)
            this.three.setVisible(true)
        })
        this.three.on('pointerdown', () => {
            this.three.setVisible(false)
            this.start.setVisible(true)
        })
        this.start.on('pointerdown', () => {
            this.start.setVisible(false)
            this.sceneStage = 1
            this.quiz()
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

        //button animations
        if(this.sceneStage == 1){
            this.buttonAnimation(time)
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
    }

    buttonAnimation(time)
    {
        this.button1.on('pointerover', () => {
            this.choice1.setVisible(true)
            this.choice1.scale = 0
            this.choice1.alpha = 0

            this.tweens.add({
                targets: this.choice1,
                alpha: 1,
                scale: 1,
                duration: 100
            })
        })
        this.button1.on('pointerout', () => {
            this.tweens.add({
                targets: this.choice1,
                alpha: 0,
                scale: 0,
                duration: 100
            })
        })
        this.button2.on('pointerover', () => {
            this.choice2.setVisible(true)
            this.choice2.scale = 0
            this.choice2.alpha = 0

            this.tweens.add({
                targets: this.choice2,
                alpha: 1,
                scale: 1,
                duration: 100
            })
        })
        this.button2.on('pointerout', () => {
            this.tweens.add({
                targets: this.choice2,
                alpha: 0,
                scale: 0,
                duration: 100
            })
        })
        this.button3.on('pointerover', () => {
            this.choice3.setVisible(true)
            this.choice3.scale = 0
            this.choice3.alpha = 0

            this.tweens.add({
                targets: this.choice3,
                alpha: 1,
                scale: 1,
                duration: 100
            })
        })
        this.button3.on('pointerout', () => {
            this.tweens.add({
                targets: this.choice3,
                alpha: 0,
                scale: 0,
                duration: 100
            })
        })
    }

    quiz()
    {
        this.quizvar = Phaser.Math.Between(1, 3)

        if(this.quizvar == 1){
            this.question1a.setVisible(true)
        }
        if(this.quizvar == 2){
            this.question1b.setVisible(true)
        }
        if(this.quizvar == 3){
            this.question1c.setVisible(true)
        }

        this.button1.on('pointerdown', () => {
            this.question1a.setVisible(false)
            this.question1b.setVisible(false)
            this.question1c.setVisible(false)

            this.correct.setVisible(true)
        })
        this.button2.on('pointerdown', () => {
            this.question1a.setVisible(false)
            this.question1b.setVisible(false)
            this.question1c.setVisible(false)

            this.wrong.setVisible(true)
        })
        this.button3.on('pointerdown', () => {
            this.question1a.setVisible(false)
            this.question1b.setVisible(false)
            this.question1c.setVisible(false)

            this.wrong.setVisible(true)
        })

        this.wrong.on('pointerdown', () => {
            this.previousScene()
        })
        this.correct.on('pointerdown', () => {
            this.changeScene()
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

    previousScene()
    {
        this.scene.start('1level1')
    }

    nextScene()
    {
        this.scene.start('2level1')
    }
}