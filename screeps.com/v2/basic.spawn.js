Spawn.prototype.spawnSpecific = function (name, memory) {

    let creep = Memory.blueprints.creeps[name]
    console.log(creep)
    console.log(name)
    this.spawn(creep.partCounts, creep.name, memory)
}

Spawn.prototype.spawn = function (partCounts, name, memory) {

    let parts = [WORK, MOVE, CARRY, ATTACK, RANGED_ATTACK, HEAL, TOUGH, CLAIM];
    let bodyParts = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < partCounts[i]; j++) {
            bodyParts.push(parts[i])
        }
    }

    let aliveCreeps = Object.keys(Memory.creeps)
    let originalName = name
    let i = 1

    while (aliveCreeps.includes(name)) {
        name = originalName + i
        i++
    }

    this.createCreep(bodyParts, name, memory)
    console.log('Spawning a new 🐞 with the Name ',name)
    return name
}

Spawn.prototype.spawnUnspecific= function(room){
    if (room.energyCapacityAvailable <= 550 || room.memory.aliveCreeps.length === 0) {

        if (room.energyAvailable > 299) {
            if (this.spawnSpecific('basic', {room: room.name, role: 'waiting'})) {
                Memory.stats.feeders++
            }
        }
    } else {
        if (room.energyAvailable > 449) {
            if (this.spawnSpecific('worker550', {role: 'waiting', room: room.name})) {
                Memory.stats.feeders++
            }
        }
    }
}