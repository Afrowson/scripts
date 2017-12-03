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
        
        
        Memory.stats.feeders = _.filter(Game.creeps, creep => creep.memory.role === 'feed').length;
        Memory.stats.upgraders = _.filter(Game.creeps, creep => creep.memory.role === 'upgrade').length;
        Memory.stats.builders = _.filter(Game.creeps, creep => creep.memory.role === 'build').length;
        Memory.stats.repairers = _.filter(Game.creeps, creep => creep.memory.role === 'repair').length;
    }
}

module.exports = mainHelper
