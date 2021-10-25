module.exports = function(physics, anims, playerx, playery){
    const player = physics.add.sprite(playerx, playery, 'player');

    anims.create({
        key: 'player_idle1',
        frames: anims.generateFrameNumbers('player', {
            start: 0, end: 4
        }),
        frameRate: 5,
        repeat: -1
    })
    anims.create({
        key: 'player_teleport',
        frames: anims.generateFrameNumbers('player', {
            start: 5, end: 9
        }),
        frameRate: 10
    })
    anims.create({
        key: 'player_right',
        frames: anims.generateFrameNumbers('player', {
            start: 10, end: 13
        }),
        frameRate: 5,
        repeat: -1
    })
    anims.create({
        key: 'player_left',
        frames: anims.generateFrameNumbers('player', {
            start: 14, end: 17
        }),
        frameRate: 5,
        repeat: -1
    })
    anims.create({
        key:'player_jump1',
        frames: anims.generateFrameNumbers('player', {
            start: 20, end: 23
        }),
        frameRate: 5,
        repeat: -1
    })
    anims.create({
        key: 'player_jump2',
        frames: anims.generateFrameNumbers('player', {
            start: 24, end: 27
        }),
        frameRate: 5,
        repeat: -1
    })
    anims.create({
        key: 'player_fall',
        frames: [{key: 'player', frame: 18}]
    })
    anims.create({
        key: 'player_wake',
        frames: anims.generateFrameNumbers('player', {
            start: 28, end: 29
        }),
        frameRate: 1
    })
    return player
}