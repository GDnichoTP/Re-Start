import Phaser from 'phaser'
import Player from '../modules/Player'
import DialoguePreload from '../modules/DialoguePreload'
import FallingObject from '../modules/FallingObject'

export default class Level2 extends Phaser.Scene
{
	constructor()
	{
		super('level2')
	}

    init()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.barrier = this.physics.add.staticGroup()
        this.container1 = this.physics.add.staticGroup()
        this.container2 = this.physics.add.staticGroup()
        this.container3 = this.physics.add.staticGroup()
        this.player = undefined
        this.playerx = 125
        this.playery = 150
        this.sceneStage = 0
        this.boxes = undefined
    }

    preload()
    {
        this.load.image('bg', 'images/bg_level2.png')
        this.load.image('wall', 'images/wall_level2.png')
        this.load.image('barrier', 'images/barrier.png')
        this.load.spritesheet('player', 'images/player_assets.png', {
            frameWidth: 48, frameHeight: 80
        })
        this.load.image('box1', 'images/box1.png')
        this.load.image('box2', 'images/box2.png')
        this.load.image('box3', 'images/box3.png')
        this.load.image('container1', 'images/container1.png')
        this.load.image('container2', 'images/container2.png')
        this.load.image('container3', 'images/container3.png')
        DialoguePreload(this.load)
    }

    create()
    {
        this.add.image(300, 150, 'bg')
        this.barrier.create(300, 420, 'barrier').refreshBody().setVisible(false)

        this.container1.create(163, 266, 'container1').refreshBody()
        this.container2.create(300, 266, 'container2').refreshBody()
        this.container3.create(437, 266, 'container3').refreshBody()

        this.box11 = this.add.image(160, 100, 'box1').setInteractive().setVisible(false)
        this.box12 = this.add.image(160, 100, 'box2').setInteractive().setVisible(false)
        this.box13 = this.add.image(160, 100, 'box3').setInteractive().setVisible(false)
        this.box21 = this.add.image(300, 100, 'box1').setInteractive().setVisible(false)
        this.box22 = this.add.image(300, 100, 'box2').setInteractive().setVisible(false)
        this.box23 = this.add.image(300, 100, 'box3').setInteractive().setVisible(false)
        this.box31 = this.add.image(440, 100, 'box1').setInteractive().setVisible(false)
        this.box32 = this.add.image(440, 100, 'box2').setInteractive().setVisible(false)
        this.box33 = this.add.image(440, 100, 'box3').setInteractive().setVisible(false)

        this.boxes = [this.box11, this.box12, this.box13, this.box21, this.box22, this.box23, this.box31, this.box32, this.box33]

        this.time.addEvent({
            delay: 2000,
            callback: this.spawnBox,
            callbackScope: this,
            loop: true
        })
        // this.box1 = undefined
        // this.boxes = this.physics.add.group({
        //     classType: FallingObject,
        //     runChildUpdate: true
        // })
        // this.time.addEvent({
        //     delay: 2000,
        //     callback: this.spawnBox,
        //     callbackScope: this,
        //     loop: true
        // })

        this.input.setDraggable(this.boxes)
        this.input.on('drag', (pointer, gameObject, dragX ,dragY) => {
            gameObject.x = dragX
            gameObject.y = dragY
        })
        
        this.player = Player(this.physics, this.anims, this.playerx, this.playery)
        this.player.setCollideWorldBounds(true)
        this.physics.add.collider(this.player, this.barrier)
        this.physics.add.collider(this.boxes, this.barrier)

        //this.add.image(300, 150, 'wall')
    }

    update()
    {
        
    }

    // spawnBox()
    // {
    //     const config = {
    //         speed: 200
    //     }

    //     this.boxselect = Phaser.Math.Between(1, 3)
    //     if(this.boxselect == 1){
    //         this.boxes = this.box1.get(0, 0, 'box1', config)
    //     }

    //     this.positionX = 0

    //     this.coordinate = Phaser.Math.Between(1, 3)
    //     if(this.coordinate == 1){
    //         this.positionX == 160
    //     }
    //     if(this.coordinate == 2){
    //         this.positionX == 300
    //     }
    //     if(this.coordinate == 3){
    //         this.positionX == 440
    //     }

    //     if(this.boxes){
    //         this.boxes.spawn(this.positionX)
    //     }
    // }

    spawnBox()
    {
        this.posSelector = Phaser.Math.Between(1, 3)
        this.boxSelector = Phaser.Math.Between(1, 3)

        if(this.posSelector == 1){
            if(this.boxSelector == 1){
                this.box11.setVisible(true)
                
            }
            if(this.boxSelector == 2){
                this.box12.setVisible(true)
            }
            if(this.boxSelector == 3){
                this.box13.setVisible(true)
            }
        }
        if(this.posSelector == 2){
            if(this.boxSelector == 1){
                this.box21.setVisible(true)
            }
            if(this.boxSelector == 2){
                this.box22.setVisible(true)
            }
            if(this.boxSelector == 3){
                this.box23.setVisible(true)
            }
        }
        if(this.posSelector == 3){
            if(this.boxSelector == 1){
                this.box31.setVisible(true)
            }
            if(this.boxSelector == 2){
                this.box32.setVisible(true)
            }
            if(this.boxSelector == 3){
                this.box33.setVisible(true)
            }
        }
    }
}