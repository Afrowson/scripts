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
        
        
        Memory.stats.feeders = _.filter(Game.creeps, creep => creep.memory.role === 'feeding').length;
        Memory.stats.upgraders = _.filter(Game.creeps, creep => creep.memory.role === 'upgradeing').length;
        Memory.stats.constructers = _.filter(Game.creeps, creep => creep.memory.role === 'building').length;
        Memory.stats.repairers = _.filter(Game.creeps, creep => creep.memory.role === 'repairing').length;
    }
}

module.exports = mainHelper
