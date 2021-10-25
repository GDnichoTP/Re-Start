import Phaser from 'phaser'
import Player from '../modules/Player'
import DialoguePreload from '../modules/DialoguePreload'

export default class EndScene extends Phaser.Scene
{
	constructor()
	{
		super('end')
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
        this.load.image('bg3', 'images/bg3.png')
        this.load.image('lab_wall', 'images/lab_wall.png')
        this.load.image('barrier', 'images/barrier.png')
        this.load.image('button', 'images/button.png')
        this.load.image('heart', 'images/heart.png')
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
        this.add.image(300, 150, 'bg3')
        this.barrier.create(300, 360, 'barrier').refreshBody().setVisible(false)
        this.add.image(300, 197, 'button')
        this.heart = this.add.image(300, 173, 'heart').setInteractive()

        this.trans = this.add.sprite(300, 150, 'transition').setDepth(1)
        

        this.player = Player(this.physics, this.anims, this.playerx, this.playery)
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.barrier)

        this.add.image(300, 150, 'lab_wall')

        this.one = this.add.image(300, 150, '1st_onheart').setInteractive().setVisible(false)
        this.two = this.add.image(300, 150, '2nd_onheart').setInteractive().setVisible(false)
        this.three = this.add.image(300, 150, '3rd_onheart').setInteractive().setVisible(false)

        this.heart.on('pointerdown', () => {
            this.one.setVisible(true)
            this.heart.setVisible(false)
        })
        this.one.on('pointerdown', () => {
            this.two.setVisible(true)
            this.one.setVisible(false)
        })
        this.two.on('pointerdown', () => {
            this.three.setVisible(true)
            this.two.setVisible(false)
        })
        this.three.on('pointerdown', () => {
            this.three.setVisible(false)
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
        this.trans.anims.play('trans_out', true)
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
    }
}