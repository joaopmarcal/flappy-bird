console.log('[dev João] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const flappyBird = {
  spriteX: 0,
  spriteY: 0,
  largura: 33,
  altura: 24,
  x: 10,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      flappyBird.spriteX,flappyBird.spriteY,
      flappyBird.largura,flappyBird.altura,
      flappyBird.x,flappyBird.y,
      flappyBird.largura,flappyBird.altura,
    );
  }
}

function loop() {

  flappyBird.desenha();
  requestAnimationFrame(loop);
}

loop();