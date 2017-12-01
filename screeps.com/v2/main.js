let spawner = require('main.spawner');
let helper = require('main.helper');

module.exports.loop = function () {

  helper.updateStats()

  helper.cleanCreeps()

  console.log('Current Tick: '+Game.time)

  if(Game.spawns.Main.room.energyAvailable >299){
    spawner.spawnSpecific('basic',{role:'harvester'})
  }

}
