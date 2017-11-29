var spawner = require('main.spawner');

module.exports.loop = function () {
    console.log('Current Tick: '+Game.time)

    spawner.run()


}