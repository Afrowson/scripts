let helper = require('main.helper');
let creep = require('basic.creep');
let control = require('main.control');

module.exports.loop = function () {

    if (!Memory.init) {
        control.start()
    }

    helper.cleanCreeps()

    helper.updateStats()

    for (let name in Game.rooms) {
        let room = Game.rooms[name]
        if (room.memory.level === 1) {
            control.one(room)
        }
        control.manageCreeps(room)
    }

    console.log('Current Tick: ' + Game.time)
    for (let name in Game.creeps) {
        console.log(Game.creeps[name] + ' does ' + Game.creeps[name].memory.role)
        Game.creeps[name].run()
    }
}
