console.log('[dev João] Flappy Bird');

let frames = 0;
const som_HIT = new Audio();
som_HIT.src = './efeitos/caiu.wav';

const som_jump = new Audio();
som_jump.src = './efeitos/pulo.wav';

const sprites = new Image();
sprites.src = './sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha() {
    contexto.fillStyle = '#70c5ce';
    contexto.fillRect(0,0, canvas.width, canvas.height);

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY,
      planoDeFundo.largura, planoDeFundo.altura,
      (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura,
    );
  },
};

function criaChao() {
  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza() {
      const movimentoDoChao = 1;
      const repeteEm = chao.largura / 2;
      const movimentacao = chao.x - movimentoDoChao;
      chao.x = movimentacao % repeteEm;
    },
    desenha() {
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        chao.x, chao.y,
        chao.largura, chao.altura,
      );
  
      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY,
        chao.largura, chao.altura,
        (chao.x + chao.largura), chao.y,
        chao.largura, chao.altura,
      );
    },
  };
  return chao;
}

function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura;
  const chaoY = chao.y;

  if(flappyBirdY >= chaoY) {
    return true;
  }

  return false;
}

function criarFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
      som_jump.play();
      flappyBird.velocidade = - flappyBird.pulo;
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
      if(fazColisao(flappyBird, globais.chao)) {
        som_HIT.play();
        mudaParaTela(Telas.GAME_OVER);
        return;
      }
  
      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
      flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    movimentos: [
      { spriteX: 0, spriteY: 0, },
      { spriteX: 0, spriteY: 26, },
      { spriteX: 0, spriteY: 52, },
      { spriteX: 0, spriteY: 26, },
    ],
    frameAtual: 0,
    atualizaOFrameAtual() {
      const intervaloDeFrames = 10;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if(passouOIntervalo) {
        const baseDoIncremento = 1;
        const incremento = baseDoIncremento + flappyBird.frameAtual;
        const baseRepeticao = flappyBird.movimentos.length;
        flappyBird.frameAtual = incremento % baseRepeticao;
      }
    },
    desenha() {
      flappyBird.atualizaOFrameAtual();
      const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual];
      contexto.drawImage(
        sprites,
        spriteX,spriteY,
        flappyBird.largura,flappyBird.altura,
        flappyBird.x,flappyBird.y,
        flappyBird.largura,flappyBird.altura,
      );
    }
  }
  return flappyBird;
}

const desenhaMedalhaUm = {
  sX: 0,
  sY: 78,
  w: 45,
  h: 46,
  x: 74,
  y: 136,
  desenha() {
    contexto.drawImage(
      sprites,
      desenhaMedalhaUm.sX,desenhaMedalhaUm.sY,
      desenhaMedalhaUm.w,desenhaMedalhaUm.h,
      desenhaMedalhaUm.x,desenhaMedalhaUm.y,
      desenhaMedalhaUm.w,desenhaMedalhaUm.h,
    );
  }
}

const desenhaMedalhaDois = {
  sX: 47,
  sY: 78,
  w: 45,
  h: 46,
  x: 74,
  y: 136,
  desenha() {
    contexto.drawImage(
      sprites,
      desenhaMedalhaDois.sX,desenhaMedalhaDois.sY,
      desenhaMedalhaDois.w,desenhaMedalhaDois.h,
      desenhaMedalhaDois.x,desenhaMedalhaDois.y,
      desenhaMedalhaDois.w,desenhaMedalhaDois.h,
    );
  }
}

const desenhaMedalhaTres = {
  sX: 0,
  sY: 123,
  w: 45,
  h: 46,
  x: 74,
  y: 136,
  desenha() {
    contexto.drawImage(
      sprites,
      desenhaMedalhaTres.sX,desenhaMedalhaTres.sY,
      desenhaMedalhaTres.w,desenhaMedalhaTres.h,
      desenhaMedalhaTres.x,desenhaMedalhaTres.y,
      desenhaMedalhaTres.w,desenhaMedalhaTres.h,
    );
  }
}

const desenhaMedalhaQuatro = {
  sX: 47,
  sY: 123,
  w: 45,
  h: 46,
  x: 74,
  y: 136,
  desenha() {
    contexto.drawImage(
      sprites,
      desenhaMedalhaQuatro.sX,desenhaMedalhaQuatro.sY,
      desenhaMedalhaQuatro.w,desenhaMedalhaQuatro.h,
      desenhaMedalhaQuatro.x,desenhaMedalhaQuatro.y,
      desenhaMedalhaQuatro.w,desenhaMedalhaQuatro.h,
    );
  }
}

const mensagemGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: (canvas.width / 2) - 174 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.sX,mensagemGetReady.sY,
      mensagemGetReady.w,mensagemGetReady.h,
      mensagemGetReady.x,mensagemGetReady.y,
      mensagemGetReady.w,mensagemGetReady.h,
    );
  }
}

const mensagemGameOver = {
  sX: 134,
  sY: 153,
  w: 226,
  h: 200,
  x: (canvas.width / 2) - 226 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGameOver.sX,mensagemGameOver.sY,
      mensagemGameOver.w,mensagemGameOver.h,
      mensagemGameOver.x,mensagemGameOver.y,
      mensagemGameOver.w,mensagemGameOver.h,
    );
  }
}

const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
  telaAtiva = novaTela;

  if(telaAtiva.inicializa) {
    telaAtiva.inicializa();
  }
}

function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY: 169,
    },
    espaco: 100,

    desenha() {

      canos.pares.forEach(function(par) {
        const yRandom = par.y;
        let espacamentoEntreCanos = 150;
        if(globais.placar.pontuacao > 32 && globais.placar.pontuacao < 79){
          espacamentoEntreCanos = 125;
        }

        if(globais.placar.pontuacao > 80){
          espacamentoEntreCanos = 90;
        }
  
        const canoCeuX = par.x;
        const canoCeuY = yRandom;

        contexto.drawImage(
          sprites,
          canos.ceu.spriteX, canos.ceu.spriteY,
          canos.largura, canos.altura,
          canoCeuX, canoCeuY,
          canos.largura, canos.altura,
        )
  
        const canoChaoX = par.x;
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom;
        contexto.drawImage(
          sprites,
          canos.chao.spriteX, canos.chao.spriteY,
          canos.largura, canos.altura,
          canoChaoX, canoChaoY,
          canos.largura, canos.altura,
        )

        par.canoCeu = {
          x: canoCeuX,
          y: canos.altura + canoCeuY
        }

        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY
        }
      })
    },
    temColisaoComOFlappyBird(par) {
      const cabecaDoFlappy = globais.flappyBird.y;
      const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura;

      if(globais.flappyBird.x + globais.flappyBird.largura >= par.x) {
        if(cabecaDoFlappy <= par.canoCeu.y) {
          return true;
        }
        if(peDoFlappy >= par.canoChao.y) {
          return true;
        }
      }

      return false;

    },
    pares: [],
    atualiza() {
      const passou100Frames = frames % 100 === 0;

      if(globais.placar.pontuacao > 14) {
        console.log(passou100Frames);
      }
      if(passou100Frames) {
        if(
          !(globais.placar.pontuacao > 20) ||
          (globais.placar.pontuacao > 28 && globais.placar.pontuacao < 60) ||
          (globais.placar.pontuacao > 80)
          ) {
          canos.pares.push({
            x: canvas.width,
            y: -150 * (Math.random() + 1),
          });
        }
      }

      canos.pares.forEach(function(par) {
        par.x = par.x -2;

        if(canos.temColisaoComOFlappyBird(par)) {
          som_HIT.play();
          mudaParaTela(Telas.GAME_OVER);
        }

        if(par.x + canos.largura <= 0) {
          canos.pares.shift();
        }

      });
    }
  }
  return canos;
}

let maiorPontuacao = 0;

const pontuacaoDoPlacar = {
  desenhaPontuacao() {
    contexto.font = '20px "VT323"';
    contexto.textAlign = 'right';
    contexto.fillStyle = '#000';
    if(globais.placar.pontuacao < 10){
      contexto.fillText(`${globais.placar.pontuacao}`, canvas.width -115,123);
    } else if (globais.placar.pontuacao < 99) {
      contexto.fillText(`${globais.placar.pontuacao}`, canvas.width -120,123);
    } else {
      contexto.fillText(`${globais.placar.pontuacao}`, canvas.width -125,123);
    }
  },
  desenhaMaiorPontuacao() {
    if(maiorPontuacao < globais.placar.pontuacao) {
      maiorPontuacao = globais.placar.pontuacao;
    }
    contexto.font = '20px "VT323"';
    contexto.textAlign = 'right';
    contexto.fillStyle = '#000';
    if(maiorPontuacao > 10){
      contexto.fillText(`${maiorPontuacao}`, canvas.width -115,163);
    } else if (maiorPontuacao < 99) {
      contexto.fillText(`${maiorPontuacao}`, canvas.width -120,163);
    } else {
      contexto.fillText(`${maiorPontuacao}`, canvas.width -125,163);
    }
  }
}

function criarPlacar() {
  const placar = {
    pontuacao: 0,
    desenha() {
      contexto.font = '35px "VT323"';
      contexto.textAlign = 'right';
      contexto.fillStyle = 'white';
      contexto.fillText(`${placar.pontuacao}`, canvas.width -10,35);
    },
    atualiza() {
      const intervaloDeFrames = 20;
      const passouOIntervalo = frames % intervaloDeFrames === 0;

      if(passouOIntervalo) {
        placar.pontuacao = placar.pontuacao + 1;
      }
    }
  }
  return placar;
}

const Telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criarFlappyBird();
      globais.chao = criaChao();
      globais.canos = criaCanos();
    },
    desenha(){
      planoDeFundo.desenha();
      globais.flappyBird.desenha();
      globais.chao.desenha();
      mensagemGetReady.desenha();
    },
    click() {
      mudaParaTela(Telas.JOGO);
    },
    atualiza() {
      globais.chao.atualiza();
    }
  }
};

Telas.JOGO = {
  inicializa() {
    globais.placar = criarPlacar();
  },
  desenha() {
    planoDeFundo.desenha();
    globais.canos.desenha();
    globais.chao.desenha();
    globais.flappyBird.desenha();
    globais.placar.desenha();
  },
  click() {
    globais.flappyBird.pula();
  },
  atualiza() {
    globais.canos.atualiza();
    globais.chao.atualiza();
    globais.flappyBird.atualiza();
    globais.placar.atualiza();
  }
}

Telas.GAME_OVER = {
  desenha() {
    mensagemGameOver.desenha();
    pontuacaoDoPlacar.desenhaPontuacao();
    pontuacaoDoPlacar.desenhaMaiorPontuacao();
    if(globais.placar.pontuacao > 0 && globais.placar.pontuacao < 15) {
      desenhaMedalhaUm.desenha();
    } else if (globais.placar.pontuacao < 25) {
      desenhaMedalhaDois.desenha();
    } else if (globais.placar.pontuacao < 99) {
      desenhaMedalhaTres.desenha();
    } else {
      desenhaMedalhaQuatro.desenha();
    }
  },
  atualiza() {

  },
  click() {
    mudaParaTela(Telas.INICIO);
  }
}

function loop() {

  telaAtiva.desenha();
  telaAtiva.atualiza();

  frames = frames + 1;
  requestAnimationFrame(loop);
}

window.addEventListener('click', function() {
  if(telaAtiva.click) {
    telaAtiva.click();
  }
});

window.addEventListener('keydown', function() {
  if(telaAtiva.click) {
    telaAtiva.click();
  }
});

mudaParaTela(Telas.INICIO);
loop();