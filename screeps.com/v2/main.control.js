let spawner = require('main.spawner')

let mainControl = {

    start: function () {

        Memory.jobs = {
            feed: 3,
            build: 0,
            repair: 0
        }
        Memory.stats = {
            feeders: 0,
            upgraders: 0,
            builders: 0,
            repairers: 0,
        }


        Memory.swarmLevel = 1
    },

    one: function () {

        if ((Memory.stats.feeders + Memory.stats.upgraders +
                Memory.stats.builders + Memory.stats.repairers >= 15)) {
            console.log('jetzt ist das Skript am Ende...')
        }else{
          spawner.spawnHarvester('Main')
        }

    },

    manageCreeps: function () {

        if (Game.spawns['Main'].room.energyAvailable < 300) {
            Memory.jobs.feed = 3 - Memory.stats.feeders
        }


        let constructionSites = Game.spawns['Main'].room.find(FIND_MY_CONSTRUCTION_SITES).length;
        if (constructionSites === 0)
            Memory.jobs.build = 0
        if (constructionSites > 1)
            Memory.jobs.build = 3
        if (constructionSites > 10)
            Memory.jobs.build = 5
        if (constructionSites >= 20)
            Memory.jobs.build = 6
        if (constructionSites >= 50)
            Memory.jobs.build = 7
        if (constructionSites >= 100)
            Memory.jobs.build = 8


        for (let name in Game.creeps
            ) {
            if (Game.creeps[name].memory.role == 'waiting') {
                let creep = Game.creeps[name]
                if (Memory.jobs.feed > 0) {
                    creep.memory.role = 'feed'
                    Memory.jobs.feed--
                } else if (Memory.jobs.build > 0) {
                    creep.memory.role = 'build'
                    Memory.jobs.build--
                } else if (Memory.jobs.repair > 0) {
                    creep.memory.role = 'repair'
                    Memory.jobs.repair--

                } else {
                    creep.memory.role = 'upgrade'
                    //@todo erweitern um Verteilung auf Alle Räume die controlliert sind.
                    creep.memory.room = Game.spawns['Main'].room.id
                }
            }
        }
    }
}
module.exports = mainControl
