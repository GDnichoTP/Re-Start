import Phaser from 'phaser'

import SpawnScene from './scenes/SpawnScene'
import Level1Scene1 from './scenes/Level1Scene1'
import Level1Scene2 from './scenes/Level1Scene2'
import Level1Scene3 from './scenes/Level1Scene3'
import Level2Scene1 from './scenes/Level2Scene1'
import Level3 from './scenes/Level3'
import ContinueScene from './scenes/ContinueScene'
import EndScene from './scenes/EndScene'

const config = {
	type: Phaser.AUTO,
	width: 600,
	height: 300,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 700 }
		}
	},
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT,
		autoCenter: Phaser.Scale.Center.CENTER_BOTH
	},
	scene: [SpawnScene, Level2Scene1, Level1Scene1, Level1Scene2, Level1Scene3, Level3, ContinueScene, EndScene]
	
}

export default new Phaser.Game(config)
