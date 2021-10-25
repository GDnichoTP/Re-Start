import Phaser from 'phaser'
import Player from '../modules/Player'
import DialoguePreload from '../modules/DialoguePreload'

export default class Level2Scene1 extends Phaser.Scene
{
	constructor()
	{
		super('1level2')
	}

    init()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.barrier = this.physics.add.staticGroup()
        this.player = undefined
        this.playerx = 125
        this.playery = 180
        this.sceneStage = 0
        this.out = this.physics.add.staticGroup()
    }

    preload()
    {
        this.load.image('bg4', 'images/bg4.png')
        this.load.image('lab_wall2', 'images/lab_wall2.png')
        this.load.image('barrier', 'images/barrier.png')
        this.load.image('box', 'images/box.png')
        this.load.image('plunger', 'images/plunger.png')
        this.load.image('key', 'images/key.png')
        this.load.image('door_locked', 'images/door_locked.png')
        this.load.image('door_open', 'images/door_open.png')
        this.load.image('pipe', 'images/pipe.png')
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
        this.add.image(300, 150, 'bg4')
        this.barrier.create(300, 420, 'barrier').refreshBody().setVisible(false)
        this.out.create(302, 237, 'door_open').refreshBody()
        this.door = this.add.image(302, 237, 'door_locked')
        this.pipe = this.add.image(488, 162, 'pipe').setInteractive()

        this.player = Player(this.physics, this.anims, this.playerx, this.playery)
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.barrier)

        this.add.image(300, 150, 'lab_wall2')

        this.one = this.add.image(300, 150, '1level2').setInteractive()
        this.two = this.add.image(300, 150, 'objective1').setInteractive().setVisible(false)

        this.hint = this.add.image(300, 150, 'hint1').setInteractive().setVisible(false)
        this.plunger = this.add.sprite(160, 80, 'plunger').setInteractive()
        this.key = this.add.image(450, 162, 'key').setInteractive().setVisible(false)
        this.box1 = this.add.image(150, 89, 'box').setInteractive()
        this.box2 = this.add.image(175, 89, 'box').setInteractive()
        this.box3 = this.add.image(160, 62, 'box').setInteractive()

        this.physics.add.collider(this.plunger, this.pipe)
        this.physics.add.collider(this.key, this.door)

        this.item = [this.box1, this.box2, this.box3]
        this.input.setDraggable(this.item)
        this.input.on('drag', (pointer, gameObject, dragX ,dragY) => {
            gameObject.x = dragX
            gameObject.y = dragY
        })

        this.one.on('pointerdown', () => {
            this.two.setVisible(true)
            this.one.setVisible(false)
        })
        this.two.on('pointerdown', () => {
            this.two.setVisible(false)
        })
        this.pipe.on('pointerdown', () => {
            this.hint.setVisible(true)
        })
        this.hint.on('pointerdown', () => {
            this.hint.setVisible(false)
        })
        this.plunger.on('pointerdown', () => {
            this.key.setVisible(true)
            this.plunger.setVisible(false)
        })
        this.key.on('pointerdown', () => {
            this.door.setVisible(false)
            this.key.setVisible(false)
            this.physics.add.collider(this.player, this.out)
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

        this.trans = this.add.sprite(300, 150, 'transition')
        this.trans.anims.play('trans_out', true)
    }

    update(time)
    {
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
        
        if(this.player.body.touching.right){
            this.changeScene()
        }
        if(this.player.body.touching.left){
            this.changeScene()
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
        this.scene.start('level3')
    }
}