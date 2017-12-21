let spawn = require('basic.spawn')

Room.prototype.one = function() {
    if(Object.keys(Game.creeps).length >= 20) {
        console.log('jetzt ist das Skript am Ende...')
    } else {
        console.log(Game.spawns[this.memory.spawns[0]])
        Game.spawns[this.memory.spawns[0]].spawnUnspecific(this)
    }
    
}

Room.prototype.manageCreeps = function() {
    if(!this.memory.level) {
        return
    }
    if(this.energyAvailable < this.energyCapacityAvailable) {
        this.memory.jobs.feeding = 5 - this.memory.stats.feeders
    }
    this.memory.buildCounter++
    if(this.memory.buildCounter === 5) {
        this.memory.buildCounter = 0
        this.updateJobBuilders()
    }
    this.memory.repairCounter++
    if(this.memory.repairCounter >= 50) {
        this.memory.repairCounter = 0
        this.updateJobRepairers()
    }
    
    for(let name in Game.creeps) {
        if(Game.creeps[name].memory.role === 'waiting') {
            let creep = Game.creeps[name]
            if(this.memory.jobs.feeding >= 1) {
                creep.memory.role = 'feeding'
                this.memory.jobs.feeding--
            } else if(this.memory.jobs.building - this.memory.stats.builders > 0) {
                creep.memory.role = 'building'
                this.memory.stats.builders += creep.workParts()
            } else if(this.memory.jobs.repairing - this.memory.stats.repairers > 0) {
                creep.memory.role = 'repairing'
                this.memory.stats.repairers += creep.workParts()
            } else {
                creep.memory.role = 'upgradeing'
                this.memory.stats.upgraders += creep.workParts()
            }
        }
    }
}
Room.prototype.updateJobRepairers = function() {
    let repairables = this.find(FIND_STRUCTURES,
        {
            filter: (s) => {
                return s.structureType !== STRUCTURE_WALL && s.hits < s.hitsMax;
            }
        });
    
    let requiredStructurePoints = 0
    for(let i = 0; i < repairables.length; i++) {
        requiredStructurePoints += repairables[i].hitsMax - repairables[i].hits;
    }
    
    if(repairables.length >= 10 || requiredStructurePoints >= 3000)
        this.memory.jobs.repairing++
    if(repairables < 3 && requiredStructurePoints < 800 && this.memory.jobs.repairing >= 2)
        this.memory.jobs.repairing--
    
}

Room.prototype.updateJobBuilders = function() {
    let constructionSites = this.find(FIND_MY_CONSTRUCTION_SITES);
    let neededWork = 0
    for(let i = 0; i < Object.keys(constructionSites).length; i++) {
        neededWork += constructionSites[i].progressTotal - constructionSites[i].progress
    }
    if(neededWork === 0)
        this.memory.jobs.building = 0
    if(neededWork > 1)
        this.memory.jobs.building = 4
    if(neededWork > 1000)
        this.memory.jobs.building = 6
    if(neededWork >= 2000)
        this.memory.jobs.building = 8
    if(neededWork >= 5000)
        this.memory.jobs.building = 10
    if(neededWork >= 10000)
        this.memory.jobs.building = 12
    if(neededWork >= 20000)
        this.memory.jobs.building = 14
    if(neededWork >= 50000)
        this.memory.jobs.building = 16
}

