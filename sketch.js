var jogador;
var soloInvisivelUp, soloInvisivelDown;
var END = 0;
var PLAYING = 1;
var estadoJogo = PLAYING;
var quadrado;
var pontuacao = 0;
var grupoQuadrados;
var gameOver, restart;

function preload(){

}

function setup() {
  createCanvas(600,200);

  soloInvisivelUp = createSprite(300,0,600,10);
  soloInvisivelUp.visible = false;
  soloInvisivelDown = createSprite(300,200,600,10);
  soloInvisivelDown.visible = false;

  gameOver = createSprite(300,50,90,50);
  text("GAME OVER");

  restart = createSprite(300,90,50,10);
  text("restart");

  jogador = createSprite(100,100,20,20);

  grupoQuadrados = new Group();
}

function draw() {
  background(210);

  text("pontuação: "+pontuacao,500,50);

  if(estadoJogo === PLAYING){
    gameOver.visible = false;
    restart.visible = false;

    pontuacao = pontuacao+Math.round(getFrameRate()/50);
    
    if(keyDown(DOWN_ARROW)){
      jogador.y = jogador.y+10;
    }

    if(keyDown(UP_ARROW)){
     jogador.y = jogador.y-10;
    }

    gerarQuadrados();

    if(grupoQuadrados.isTouching(jogador)){
      estadoJogo = END;
    }
  }

  else if(estadoJogo === END){
    gameOver.visible = true;
    restart.visible = true;
    quadrado.velocityX = 0;
  }

  jogador.collide(soloInvisivelUp);
  jogador.collide(soloInvisivelDown);

  drawSprites();
}

function gerarQuadrados(){
  if(frameCount%60 === 0){
    var quadrado = createSprite(600,random(180,20),40,40);
    quadrado.velocityX = -5;
    grupoQuadrados.add(quadrado);
  }
}