Creep.prototype.run = function() {
    
    
    console.log('WORKING: ' + this.memory.working)
    if(this.carry.energy < this.carryCapacity && this.memory.working) {
        this.recharge()
    } else {
        this.memory.working = true
        this[this.memory.role]()
    }
}

Creep.prototype.workParts = function() {
    let counter = 0
    for(part in this.body) {
        if(part === WORK) {
            counter++
        }
    }
    return counter
}

Creep.prototype.recharge = function() {
    //@todo auch Speicher nutzen, wenn besser geeignet oder so.
    var source = this.pos.findClosestByPath(FIND_SOURCES);
    if(this.harvest(source) == ERR_NOT_IN_RANGE) {
        this.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
        this.say('🔄 recharge');
    }
}

Creep.prototype.feed = function() {
    
    let target = Game.getObjectById(this.memory.roleTarget)
    console.log(target)
    if(!target || target.energy == target.energyCapacity) {
        target = this.findEnergyStorage()
    }
    if(target) {
        if(this.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            this.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            this.say('🍽 feeding');
            
        }
    } else {
        this.memory.role = 'upgrade'
        this.memory.working = false
        this.run()
    }
}

Creep.prototype.upgrade = function() {
    if(this.upgradeController(this.room.controller) == ERR_NOT_IN_RANGE) {
        this.moveTo(this.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
        this.say('⚡ upgrade');
        
    }
    if(this.energy <= this.workParts()) {
        this.memory.working = false
    }
}

Creep.prototype.build = function() {
    let target = Game.getObjectById(this.memory.roleTarget)
    if(target === undefined || !target.progress <= target.progressTotal) {
        target = this.findConstructionSite()
    }
    if(this.energy <= this.workParts()) {
        this.memory.working = false
    }
    if(target) {
        if(this.build(target) === ERR_NOT_IN_RANGE) {
            this.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            this.say('🚧 build');
        }
    } else {
        this.memory.role = 'upgrade'
        this.memory.working = false
        this.run()
    }
    
}
Creep.prototype.repair = function() {
    let target = Game.getObjectById(this.memory.roleTarget)
    if(target === undefined || target.hits <= target.hitsMax - 200) {
        target = this.findRepairables()
    }
    if(this.energy <= this.workParts()) {
        this.memory.working = false
    }
    if(target) {
        if(this.repair(target) === ERR_NOT_IN_RANGE) {
            this.moveTo(target, {visualizePathStyle: {stroke: '#efefef'}});
            this.say('🛠️ repair');
            
        }
    } else {
        this.memory.role = 'upgrade'
        this.memory.working = false
        this.run()
    }
}

Creep.prototype.findEnergyStorage = function() {
    let targets = this.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_CONTAINER) &&
                structure.energy < structure.energyCapacity;
        }
    });
    if(targets.length > 0) {
        let target = this.pos.findClosestByPath(targets)
        this.memory.roleTarget = target.id
        return target
    }
}

Creep.prototype.findConstructionSite = function() {
    let target = this.pos.findClosestByPath(this.room.find(FIND_MY_CONSTRUCTION_SITES))
    this.memory.roleTarget = target.id
    return target
    
}

Creep.prototype.findRepairables = function() {
    let target = this.pos.findClosestByPath(this.room.find(FIND_STRUCTURES,
        {
            filter: (s) => {
                return s.structureType !== STRUCTURE_WALL && s.hits <= s.hitsMax - 200;
            }
        }));
    this.memory.roleTarget = target.id
    return target
}
