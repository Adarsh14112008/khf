class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
      car1=createSprite(100,displayHeight-10,20,20);
      car2=createSprite(200,displayHeight-10,20,20);
      car3=createSprite(300,displayHeight-10,20,20);
      car4=createSprite(400,displayHeight-10,20,20);
      // car3=createSprite(600,displayHeight-10,20,20);
      // car4=createSprite(900,displayHeight-10,20,20);
      cars=[car1,car2,car3,car4];
    }

  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();
    if(allPlayers!==undefined){
      var index=0;

      for(var plr in allPlayers){
        index=index+1;
        cars[index-1].y= displayHeight-allPlayers[plr].distance;
      
      
      if(player.index === index){
        
        cars[index-1].shapecolor="red";
        camera.position.y=cars[index-1].y;
        camera.position.x=displayWidth/2;
      }
      }
    }
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.position.x +=50;
    }
     drawSprites();
  }
}
