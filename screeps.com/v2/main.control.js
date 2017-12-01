let spawner = require('main.spawner')

let mainControl = {

    start: function () {

        Memory.stats = {
            harvesters: 0,
            upgraders: 0,
            builders: 0,
            repairers: 0,
        }
        Memory.swarmGoals = {
            harvesters: 3,
            upgrader: 0,
            builder: 0,
            repairer: 0
        }

        this.harvesterSpawn()

        Memory.swarmLevel = 1
    },

    one: function () {
        this.harvesterSpawn()

        if (Memory.stats.harvesters === 3) {
            Memory.swarmLevel = 2
            Memory.swarmGoals.upgrader = 3
        }

    },

    two: function () {

        this.harvesterSpawn()

        if ((Memory.stats.harvesters >= Memory.swarmGoals.harvesters && Memory.stats.upgraders) >= Memory.swarmGoals.upgraders) {
            Memory.swarmLevel = 3
            Memory.swarmGoals.upgraders = 5
            Memory.swarmGoals.builders = 5
        }
    },

    three: function () {
        this.harvesterSpawn()

        if ((Memory.stats.harvesters + Memory.stats.upgraders + Memory.stats.builders + Memory.stats.repairers) >= 15) {
            Console.log('jetzt ist das Skript am Ende...')

        }
    },

    harvesterSpawn: function () {

        if (Game.spawns.Main.room.energyCapacity < 550) {
            if (Game.spawns.Main.room.energyAvailable > 299) {
                if (spawner.spawnSpecific('Main', 'basic', {role: 'harvester'})) {
                    Memory.stats.harvesters++
                }
            }
        } else {
            if (Game.spawns.Main.room.energyAvailable > 449) {
                if (spawner.spawnSpecific('Main', 'worker550', {role: 'harvester'})) {
                    Memory.stats.harvesters++
                }
            }

        }
    },

    manageCreeps: function () {
        hdiv = Memory.swarmGoals.harvesters - Memory.stats.harvesters.length
        udiv = Memory.swarmGoals.upgraders - Memory.stats.upgraders.length
        bdiv = Memory.swarmGoals.builders - Memory.stats.builders.length

        //@todo  wenn positive ergebnisse, verschiebe creeps in rols mit negativen.
    }

}

module.exports = mainControl;