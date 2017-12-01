var creepsManager = {

    run: function () {
        var harvesters = _.filter(Game.creeps, creep => creep.memory.role === 'harvester');
        //console.log('Es gibt ' + harvesters.length + ' Sammler')
        if (harvesters.length < Memory.swarmGoals.harvesters) {
            this.manageHarvesters()
        }

        var upgraders = _.filter(Game.creeps, creep => creep.memory.role === 'upgrader');
        //console.log('Es gibt ' + upgraders.length + ' Verbesserer')
        if (upgraders.length < Memory.swarmGoals.upgraders) {
            this.manageUpgraders()
        }
        var builders = _.filter(Game.creeps, creep => creep.memory.role === 'builder');
        //console.log('Es gibt ' + builders.length + ' Bauarbeiter')
       if (builders.length < Memory.swarmGoals.builders) {
            this.manageBuilders()
        }
    },

    clearCach: function () {
        for (var name in Memory.creeps) {
            if (!Game.creeps[name]) {
                console.log('Deleating Memory of ' + name + ' he seems to be dead.')
                delete Memory.creeps[name]
            }
        }
    },
    manageHarvesters: function () {
        this.clearCach()
        var name = 'Harvester' + Game.time
        if ((Game.spawns['Main'].spawnCreep([WORK, CARRY, MOVE, MOVE], name, {memory: {role: 'harvester'}})) === 0) {
            console.log('Spwned a new Harvester, his Name is: ' + name)

        }
    },
    manageUpgraders: function () {
        this.clearCach()
        var name = 'Upgrader' + Game.time
        if ((Game.spawns['Main'].spawnCreep([WORK, WORK, CARRY,  MOVE], name, {memory: {role: 'upgrader'}})) === 0) {
            console.log('Spwned a new Upgrader, his Name is: ' + name)
        }
    },
    manageBuilders: function () {
        this.clearCach()
        var name = 'Builder' + Game.time
        if ((Game.spawns['Main'].spawnCreep([WORK,  WORK, CARRY, MOVE], name, {memory: {role: 'builder'}})) === 0) {
            console.log('Spwned a new Builder, his Name is: ' + name)
        }
    }

}

module.exports = creepsManager;
