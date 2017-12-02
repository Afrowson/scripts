let spawner = require('main.spawner')

let mainControl = {
    
    start: function() {
        
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
        
        spawner.spawnHarvester('Main')
        
        Memory.swarmLevel = 1
    },
    
    one: function() {
        
        spawner.spawnHarvester('Main')
        
        if(Memory.stats.harvesters === 3) {
            Memory.swarmLevel = 2
            Memory.swarmGoals.upgrader = 3
        }
        
    },
    
    two: function() {
        
        spawner.spawnHarvester('Main')
        
        if((Memory.stats.harvesters >= Memory.swarmGoals.harvesters &&
            Memory.stats.upgraders >= Memory.swarmGoals.upgraders )) {
            Memory.swarmLevel = 3
            Memory.swarmGoals.upgraders = 5
            Memory.swarmGoals.builders = 5
        }
    },
    
    three: function() {
        spawner.spawnHarvester('Main')
        
        if((Memory.stats.harvesters + Memory.stats.upgraders +
            Memory.stats.builders + Memory.stats.repairers >= 15)) {
            Console.log('jetzt ist das Skript am Ende...')
        }
    },
    
    
    manageCreeps: function() {
        
        for(name in Game.creeps) {
            if(Game.creeps[name].memory.role = waiting) {
                let creep = Game.creeps[name]
                if(Memory.jobs.harvester) {
                    creep.memory.role = 'harvester'
                    Memory.jobs.harvester--
                } else if(Memory.jobs.builder) {
                    creep.memory.role = 'builder'
                    Memory.jobs.role--
                } else if(Memory.jobs.repairer) {
                    creep.memory.role = 'repairer'
                    Memory.jobs.harvester--
                    
                } else {
                    creep.memory.role = 'upgrader'
                    //@todo erweitern um Verteilung auf Alle Räume die controlliert sind.
                    creep.memory.room = Game.spawner[Main].room
                }
            }
        }
    }
}
module.exports = mainControl
