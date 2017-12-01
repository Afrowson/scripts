let mainHelper={
  cleanCreeps: function(){
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            console.log('Deleating Memory of ' + name + ' he seems to be dead.')
            delete Memory.creeps[name]
        }
      }
    },

    updateStats: function(){

      for(var name in Game.rooms){
        console.log(name)
      }
    }
  }

module.exports= mainHelper
