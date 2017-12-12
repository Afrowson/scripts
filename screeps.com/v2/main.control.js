let spawner = require('main.spawner')

let mainControl = {

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

    one: function (room) {
        if (room.memory.feeders + room.memory.upgraders +
            room.memory.builders + room.memory.repairers >= 15) {
            console.log('jetzt ist das Skript am Ende...')
        } else {
            spawner.spawnHarvester(room)
        }

    },

    manageCreeps: function (room) {
        if (room.energyAvailable < room.energyCapacityAvailable) {
            room.memory.jobs.feeding = 5 - room.memory.stats.feeders
        }
        room.memory.buildCounter++
        if (room.memory.buildCounter === 5) {
            room.memory.buildCounter = 0
            this.updateJobBuilders(room)
        }
        room.memory.repairCounter++
        if (room.memory.repairCounter >= 20) {
            room.memory.repairCounter = 0
            this.updateJobRepairers(room)
        }

        for (let name in Game.creeps) {
            if (Game.creeps[name].memory.role === 'waiting') {
                let creep = Game.creeps[name]
                if (room.memory.jobs.feeding >= 1) {
                    creep.memory.role = 'feeding'
                    room.memory.jobs.feeding--
                } else if (room.memory.jobs.building - room.memory.stats.builders > 0) {
                    creep.memory.role = 'building'
                } else if (room.memory.jobs.repairing - room.memory.stats.repairers > 0) {
                    creep.memory.role = 'repairing'
                } else {
                    creep.memory.role = 'upgradeing'
                    //@todo erweitern um Verteilung auf Alle Räume die controlliert sind.
                    creep.memory.room = room.name
                }
            }
        }
    },
    updateJobRepairers: function (room) {
        let repairables = room.find(FIND_STRUCTURES,
            {
                filter: (s) => {
                    return s.structureType !== STRUCTURE_WALL && s.hits < s.hitsMax;
                }
            });

        let requiredStructurePoints = 0
        for (let i = 0; i < repairables.length; i++) {
            requiredStructurePoints += repairables[i].hitsMax - repairables[i].hits;
        }

        if (repairables.length >= 10 || requiredStructurePoints >= 3000)
            room.memory.jobs.repairing++
        if (repairables < 3 && requiredStructurePoints < 800 && room.memory.jobs.repairing >= 2)
            room.memory.jobs.repairing--

    },

    updateJobBuilders: function (room) {
        let constructionSites = room.find(FIND_MY_CONSTRUCTION_SITES);
        let neededWork = 0
        for (let i = 0; i < Object.keys(constructionSites).length; i++) {
            neededWork += constructionSites[i].progressTotal - constructionSites[i].progress
        }
        if (neededWork === 0)
            room.memory.jobs.building = 0
        if (neededWork > 1)
            room.memory.jobs.building = 4
        if (neededWork > 1000)
            room.memory.jobs.building = 6
        if (neededWork >= 2000)
            room.memory.jobs.building = 8
        if (neededWork >= 5000)
            room.memory.jobs.building = 10
        if (neededWork >= 10000)
            room.memory.jobs.building = 12
        if (neededWork >= 20000)
            room.memory.jobs.building = 14
        if (neededWork >= 50000)
            room.memory.jobs.building = 16
    }
}
module.exports = mainControl
