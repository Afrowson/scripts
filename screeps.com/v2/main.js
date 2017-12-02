let spawner = require('main.spawner');
let helper = require('main.helper');
let control = require('main.control');

module.exports.loop = function () {

  if(Memory.swarmLevel== undefined){
    control.start()
  }

  
  helper.cleanCreeps()
  helper.updateStats()

  if(Memory.swarmLevel=== 1){
    control.one()
  }

  if(Memory.swarmLevel=== 2){
    control.two()
  }
  if(Memory.swarmLevel=== 3){
    control.three()
  }
  control.manageCreeps()
  
  console.log('Current Tick: '+Game.time)

}
