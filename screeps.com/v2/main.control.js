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
        Memory.repaircounter = 0
        Memory.swarmLevel = 1
    },

    one: function () {

        if ((Memory.stats.feeders + Memory.stats.upgraders +
                Memory.stats.constructers + Memory.stats.repairers >= 15)) {
            console.log('jetzt ist das Skript am Ende...')
        } else {
            spawner.spawnHarvester('Main')
        }

    },

    manageCreeps: function () {
        if (Game.spawns['Main'].room.energyAvailable < Game.spawns['Main'].room.energyCapacityAvailable) {
            Memory.jobs.feeding = 5 * Game.spawns['Main'].room - Memory.stats.feeders
        } else if (Game.spawns['Main'].room.energyAvailable < 550 && Game.spawns['Main'].room.energyCapacityAvailable === 550) {
            Memory.jobs.feeding = 4 - Memory.stats.feeders
        }






        Memory.buildcounter+= 1
        if(Memory.buildcounter === 5){
          Memory.buildcounter=0
          this.updateJobBuilders()
        }
        Memory.repaircounter += 1
        if (Memory.repaircounter === 50) {
            Memory.repaircounter = 0
            this.updateJobRepairers()
          }


        for (let name in Game.creeps) {
            if (Game.creeps[name].memory.role === 'waiting') {
                let creep = Game.creeps[name]
                if (Memory.jobs.feeding >= 1) {
                    creep.memory.role = 'feeding'
                    Memory.jobs.feeding--
                } else if (Memory.jobs.building - Memory.stats.builders > 0) {
                    creep.memory.role = 'building'
                } else if (Memory.jobs.repairing - Memory.stats.repairers > 0) {
                    creep.memory.role = 'repairing'
                } else {
                    creep.memory.role = 'upgradeing'
                    //@todo erweitern um Verteilung auf Alle Räume die controlliert sind.
                    creep.memory.room = Game.spawns['Main'].room.id
                }
            }
        }
    },
    updateJobRepairers: function(){
      let repairables = Game.spawns['Main'].room.find(FIND_STRUCTURES,
          {
              filter: (s) => {
                  return s.structureType !== STRUCTURE_WALL && s.hits <= s.hitsMax - 200;
              }
          }).length;

      for(let i =0; i<repairables.length();i++){
        requiredStructurePoints += repairables[i].hitsMax- repairables[i].hits;
      }

      console.log('Repairables: ' + repairables +' with '+ requiredStructurePoints + ' missing StructurePaints')
      if (repairables > 10)
          Memory.jobs.repairing++
      if (repairables < 3 && Memoy.jobs.repairing>=2)
          Memory.jobs.repairing--

    },

    updateJobBuilders: function(){
      let constructionSites = Game.spawns['Main'].room.find(FIND_MY_CONSTRUCTION_SITES);
      let neededWork =0
      for(let i = 0; i<constructionSites.lenght();i++){
        neededWork += constructionSites[i].progressTotal -constructionSites[i].progress
      }

      if (neededWork === 0)
          Memory.jobs.building = 0
      if (neededWork > 1)
          Memory.jobs.building = 4
      if (neededWork > 1000)
          Memory.jobs.building = 6
      if (neededWork >= 2000)
          Memory.jobs.building = 8
      if (neededWork >= 5000)
          Memory.jobs.building = 10
      if (neededWork >= 10000)
          Memory.jobs.building = 12
      if (neededWork >= 20000)
          Memory.jobs.building = 14
      if(neededWork>= 50000)
          Memory.jobs.building = 16
    }
}
module.exports = mainControl
