var mainSpawner = {
    
    creeps: {
        basic: {partCounts: [2, 1, 1, 0, 0, 0, 0, 0], name: 'Basic'},
        worker550: {partCounts: [2, 3, 4, 0, 0, 0, 0, 0], name: 'Small Worker'},
        worker800: {partCounts: [4, 3, 5, 0, 0, 0, 0, 0], name: 'Medium Worker'},
        howler800: {partCounts: [0, 11, 5, 0, 0, 0, 0, 0], name: 'Howler'},
        miner800: {partCounts: [5, 4, 2, 0, 0, 0, 0, 0], name: 'Miner'},
    },
    
    spawnSpecific: function(spawner, name, memory) {
        let creep = this.creeps[name]
        this.spawn(spawner, creep.partCounts, creep.name, memory)
    },
    
    spawn: function(spawner, partCounts, name, memory) {
        
        let parts = [WORK, MOVE, CARRY, ATTACK, RANGED_ATTACK, HEAL, TOUGH, CLAIM];
        let bodyParts = [];
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < partCounts[i]; j++) {
                bodyParts.push(parts[i])
            }
        }
        
        let aliveCreeps = Object.keys(Memory.creeps)
        let originalName = name
        let i = 1
        
        while(aliveCreeps.includes(name)) {
            name = originalName + i
            i++
        }
        
        Game.spawns[spawner].createCreep(bodyParts, name, memory)
        return name
    },
    spawnHarvester(spawn){
        
        if(Game.spawns[spawn].room.energyCapacityAvailable < 550) {
            if(Game.spawns[spawn].room.energyAvailable > 299) {
                if(this.spawnSpecific('Main', 'basic', {role: 'harvester'})) {
                    Memory.stats.harvesters++
                }
            }
        } else {
            if(Game.spawns[spawn].room.energyAvailable > 449) {
                if(this.spawnSpecific('Main', 'worker550', {role: 'harvester'})) {
                    Memory.stats.harvesters++
                }
            }
        }
    }
    
    
}

module.exports = mainSpawner;
