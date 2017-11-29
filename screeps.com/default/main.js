var manager = require('creeps.management');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
    //Informiert darüber das Gegner im Raum sind
    //@todo build defensive creeps and deff stuff
    for (var name in Game.spawns)
        if (Game.spawns[name].room.find(FIND_HOSTILE_CREEPS)!='') {
        let room= Game.spawns[name].room
            console.log('There are enemys in Room "' + room.name + '\"')
        }




    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
    manager.run();

}