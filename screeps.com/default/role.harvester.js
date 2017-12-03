let roleHarvester = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            let source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            let targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                let target=creep.pos.findClosestByPath(targets)
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] < structure.storeCapacity;
                    }
                });
                if (targets.length > 0) {
                    if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else {
                    creep.moveTo(Game.flags.wait.pos, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;