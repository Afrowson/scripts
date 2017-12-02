let mainHelper = {
    cleanCreeps: function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                console.log('Deleating Memory of ' + name + ' he seems to be dead.')
                delete Memory.creeps[name]
            }
        }
    },
    
    updateStats: function() {
        
        
        Memory.stats.harvesters = _.filter(Game.creeps, creep => creep.memory.role === 'harvester');
        Memory.stats.upgraders = _.filter(Game.creeps, creep => creep.memory.role === 'upgrader');
        Memory.stats.builders = _.filter(Game.creeps, creep => creep.memory.role === 'builder');
        Memory.stats.repairers = _.filter(Game.creeps, creep => creep.memory.role === 'repairer');
    }
}

module.exports = mainHelper
