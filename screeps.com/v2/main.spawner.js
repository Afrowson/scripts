var mainSpawner = {

    run: function () {
    this.spawn([2,1,1,0,0,0,0,0], 'Basic',{role: 'harvester'})
    },

    spawn: function (partCounts, name, memory) {

        let parts = [WORK, MOVE, CARRY, ATTACK, RANGED_ATTACK, HEAL, TOUGH, CLAIM];
        let bodyParts = [];
        for (let i = 0; i < 8; i++) {
            for(let j= 0;j<partCounts[i];j++){
                bodyParts.push(parts[i])
            }
        }
        name+=Game.time%1000
        Game.spawns['Main'].createCreep(bodyParts, name, memory)
        return name
    }


}

module.exports = mainSpawner;