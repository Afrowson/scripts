let spawner = require('main.spawner')

let mainControl = {

    start: function () {

        Memory.jobs = {
            feed: 0,
            building: 0,
            repair: 0
        }
        Memory.stats = {
            feeders: 0,
            upgraders: 0,
            builders: 0,
            repairers: 0,
        }
        Memory.repaircounter=0
        Memory.swarmLevel = 1
    },

    one: function () {

        if ((Memory.stats.feeders + Memory.stats.upgraders +
                Memory.stats.buildingers + Memory.stats.repairers >= 15)) {
            console.log('jetzt ist das Skript am Ende...')
        }else{
          spawner.spawnHarvester('Main')
        }

    },

    manageCreeps: function () {

        if (Game.spawns['Main'].room.energyAvailable < 300) {
            Memory.jobs.feeding = 3 - Memory.stats.feeders
        }


        let constructionSites = Game.spawns['Main'].room.find(FIND_MY_CONSTRUCTION_SITES).length;
        if (constructionSites === 0)
            Memory.jobs.building = 0
        if (constructionSites > 1)
            Memory.jobs.building = 3
        if (constructionSites > 10)
            Memory.jobs.building = 5
        if (constructionSites >= 20)
            Memory.jobs.building = 6
        if (constructionSites >= 50)
            Memory.jobs.building = 7
        if (constructionSites >= 100)
            Memory.jobs.building = 8

        Memory.repaircounter+=1
        if(Memory.repaircounter===50){
            Memory.repaircounter=0


            let repairables= this.pos.findClosestByPath(this.room.find(FIND_STRUCTURES,
                {
                    filter: (s) => {
                        return s.structureType !== STRUCTURE_WALL && s.hits <= s.hitsMax - 200;
                    }
                }));

            if(repairables>10)
                Memory.jobs.repairing++
            if(repairables<3)
                Memory.jobs.repairing--
        }



        for (let name in Game.creeps) {
            if (Game.creeps[name].memory.role === 'waiting') {
                let creep = Game.creeps[name]
                if (Memory.jobs.feeding >= 1) {
                    creep.memory.role = 'feeding'
                    Memory.jobs.feeding--
                } else if (Memory.jobs.building-Memory.stats.builders > 0) {
                    creep.memory.role = 'building'
                } else if (Memory.jobs.repairing-Memory.stats.repairers > 0) {
                    creep.memory.role = 'repairing'
                } else {
                    creep.memory.role = 'upgradeing'
                    //@todo erweitern um Verteilung auf Alle Räume die controlliert sind.
                    creep.memory.room = Game.spawns['Main'].room.id
                }
            }
        }
    }
}
module.exports = mainControl
