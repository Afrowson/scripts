let spawner = require('main.spawner')

let mainControl = {
    
    start: function() {
        
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
        Memory.swarmGoals = {
            feeders: 3,
            upgrader: 0,
            builder: 0,
            repairer: 0
        }
        
        spawner.spawnHarvester('Main')
        
        Memory.swarmLevel = 1
    },
    
    one: function() {
        
        spawner.spawnHarvester('Main')
        
        if(Memory.stats.feeders === 3) {
            Memory.swarmLevel = 2
            Memory.swarmGoals.upgrader = 3
        }
        
    },
    
    two: function() {
        
        spawner.spawnHarvester('Main')
        
        if((Memory.stats.feeders >= Memory.swarmGoals.feeders &&
            Memory.stats.upgraders >= Memory.swarmGoals.upgraders )) {
            Memory.swarmLevel = 3
            Memory.swarmGoals.upgraders = 5
            Memory.swarmGoals.builders = 5
        }
    },
    
    three: function() {
        spawner.spawnHarvester('Main')
        
        if((Memory.stats.feeders + Memory.stats.upgraders +
            Memory.stats.builders + Memory.stats.repairers >= 15)) {
            Console.log('jetzt ist das Skript am Ende...')
        }
    },
    
    
    manageCreeps: function() {
        
        if(Game.spawns['Main'].room.energyAvailable < 300) {
            console.log(Memory.jobs)
            Memory.jobs.feed = 3 - Memory.stats.feeders.length
        }
        
        
        let constructionSites = Game.spawns['Main'].room.find(FIND_MY_CONSTRUCTION_SITES).length;
        if(constructionSites < 2)
            Memory.jobs.build = 1
        if(constructionSites >= 2)
            Memory.jobs.build = 3
        if(constructionSites >= 10)
            Memory.jobs.build = 4
        if(constructionSites >= 20)
            Memory.jobs.build = 5
        if(constructionSites >= 50)
            Memory.jobs.build = 6
        
        
        for(let name in Game.creeps
            ) {
            if(Game.creeps[name].memory.role = 'waiting') {
                let creep = Game.creeps[name]
                if(Memory.jobs.feed) {
                    creep.memory.role = 'feed'
                    Memory.jobs.feed--
                } else if(Memory.jobs.build) {
                    creep.memory.role = 'build'
                    Memory.jobs.build--
                } else if(Memory.jobs.repair) {
                    creep.memory.role = 'repair'
                    Memory.jobs.repair--
                    
                } else {
                    creep.memory.role = 'upgrade'
                    //@todo erweitern um Verteilung auf Alle Räume die controlliert sind.
                    creep.memory.room = Game.spawner['Main'].room
                }
            }
        }
    }
}
module.exports = mainControl
