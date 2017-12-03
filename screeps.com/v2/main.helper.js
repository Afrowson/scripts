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
        
        
        Memory.stats.feeders = _.filter(Game.creeps, creep => creep.memory.role === 'feed');
        Memory.stats.upgraders = _.filter(Game.creeps, creep => creep.memory.role === 'upgrade');
        Memory.stats.builders = _.filter(Game.creeps, creep => creep.memory.role === 'build');
        Memory.stats.repairers = _.filter(Game.creeps, creep => creep.memory.role === 'repair');
    }
}

module.exports = mainHelper
