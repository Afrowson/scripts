Creep.prototype.run = function() {
    
    if(this.carry.energy < this.carryCapacity && !this.memory.working) {
        this.recharge()
    } else {
        this.memory.working = true
        this[this.memory.role]()
    }
}

Creep.prototype.workParts = function() {
    let counter = 0
    for(let part in this.body) {
        if(this.body[part].type === WORK) {
            counter++
        }
    }
    return counter
}

Creep.prototype.recharge = function() {
    //@todo auch Speicher nutzen, wenn besser geeignet oder so.
    let source = this.pos.findClosestByPath(FIND_SOURCES);
    
    if(this.harvest(source) === ERR_NOT_IN_RANGE) {
        this.travelTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
    }
    if(this.memory.role === 'upgradeing')
        this.say('🔄⚡');
    
    if(this.memory.role === 'feeding')
        this.say('🔄🍽');
    
    if(this.memory.role === 'repairing')
        this.say('🔄🛠');
    
    if(this.memory.role === 'building')
        this.say('🔄🚧');
}

Creep.prototype.feeding = function() {
    let bool = this.memory.bool
    let target = Game.getObjectById(this.memory.roleTarget)
    if(!target || target.energy === target.energyCapacity) {
        target = this.findEnergyStorage()
    }
    
    if(target) {
        if(this.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            this.travelTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        } else {
            this.memory.working = false
        }
        this.say('🍽');
        
    } else {
        if(bool === true) {
            this.memory.role = 'upgradeing'
            this.memory.working = false
            this.memory.bool = false
            this.run()
            
        } else {
            this.memory.bool = true
        }
    }
}

Creep.prototype.upgradeing = function() {
    
    if(this.upgradeController(this.room.controller) === ERR_NOT_IN_RANGE) {
        this.travelTo(this.room.controller, {visualizePathStyle: {stroke: '#fff666'}});
    }
    this.say('⚡');
    
    if(this.carry.energy <= this.workParts()) {
        this.memory.working = false
        this.memory.roleTarget = undefined
        this.memory.role = 'waiting'
    }
}

Creep.prototype.building = function() {
    let target = Game.getObjectById(this.memory.roleTarget)
    if(target === null || target.progress <= target.progressTotal) {
        target = this.findConstructionSite()
    }
    
    if(this.carry.energy <= this.workParts() * 10) {
        this.memory.working = false
    }
    
    if(target) {
        if(this.build(target) === ERR_NOT_IN_RANGE) {
            this.travelTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
        }
        this.say('🚧');
        
    } else {
        this.memory.role = 'upgradeing'
        this.memory.roleTarget = undefined
        this.memory.working = false
        this.run()
    }
    
}

Creep.prototype.repairing = function() {
    let target = Game.getObjectById(this.memory.roleTarget)
    if(!target || target.hits === target.hitsMax) {
        target = this.findRepairables()
    }
    
    if(this.carry.energy === 0) {
        this.memory.working = false
    }
    
    if(target) {
        if(this.repair(target) === ERR_NOT_IN_RANGE) {
            this.travelTo(target, {visualizePathStyle: {stroke: '#efefef'}});
        }
        this.say('🛠');
        
    } else {
        this.memory.role = 'upgradeing'
        this.memory.roleTarget = undefined
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
    return undefined
}

Creep.prototype.findConstructionSite = function() {
    let target = this.pos.findClosestByPath(this.room.find(FIND_CONSTRUCTION_SITES))
    if(target) {
        this.memory.roleTarget = target.id
    }
    return target
    
}

Creep.prototype.findRepairables = function() {
    let target = this.pos.findClosestByPath(this.room.find(FIND_STRUCTURES,
        {
            filter: (s) => {
                return s.structureType !== STRUCTURE_WALL && s.hits < s.hitsMax;
            }
        }));
    if(target) {
        this.memory.roleTarget = target.id
    }
    return target
}
