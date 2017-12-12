let creep = require('basic.creep');

let mainHelper = {
    cleanCreeps: function () {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                console.log('Deleating Memory of ' + name + ' he seems to be dead.')
                delete Memory.creeps[name]
            }
        }
    },

    updateStats: function () {

        for (let id in Memory.rooms) {
            Memory.rooms[id].stats.feeders = 0
            Memory.rooms[id].stats.upgraders = 0
            Memory.rooms[id].stats.builders = 0
            Memory.rooms[id].stats.repairers = 0
        }

        for (let name in Game.creeps) {
            creep = Game.creeps[name]
            if (creep.memory.role === 'feeding')
                Memory.rooms[creep.memory.room].stats.feeders += creep.workParts()
            if (creep.memory.role === 'upgradeing')
                Memory.rooms[creep.memory.room].stats.upgraders += creep.workParts()
            if (creep.memory.role === 'building')
                Memory.rooms[creep.memory.room].stats.builders += creep.workParts()
            if (creep.memory.role === 'repairing')
                Memory.rooms[creep.memory.room].stats.repairers += creep.workParts()
        }
    },
    start: function () {
        Memory.init = 1
        Memory.rooms = {
            [Game.spawns['Main'].room.name]: {
                name: Game.spawns['Main'].room.name,
                spawns: ['Main'],
                repairCounter: 0,
                buildCounter: 0,
                level: 1,
                stats: {
                    feeders: 0,
                    upgraders: 0,
                    repairers: 0,
                    builders: 0,
                },
                jobs: {
                    feeding: 0,
                    building: 0,
                    repairing: 0
                }
            }
        }
    },
}

module.exports = mainHelper
