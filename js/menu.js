//recupera o elemento
const canvas = document.getElementById('painel');
//obtem o contexto 2d
const ctx = canvas.getContext('2d');

//elemento e contexto proxima peça

const canvasNext = document.getElementById('proximo');
const ctxNext = canvasNext.getContext('2d');



// dados usuário

let contaValues = {
  pontos: 0,
  nivel: 0,
  linhas: 0
}

function atualizaConta(key, value) {
  let element = document.getElementById(key);
  if (element) {
    element.textContent = value;
  }
}

let conta = new Proxy(contaValues, {
  set: (target, key, value) => {
    target[key] = value;
    atualizaConta(key, value);
    return true;
  }
});

let idRequest; 
let painel = new Painel(ctx, ctxNext);
addEventListener();
inicializaProximo();

//inicializa a próxima peça
function inicializaProximo() {
  // Calcula o tamanho do elemento canvas
ctxNext.canvas.width = 4 * Tam_Bloco;
ctxNext.canvas.height = 4 * Tam_Bloco;

// escala o tamanho dos blocos
// utilizando o scale não é necessário recalcular 
//o tamanho dos blocos manualmente
ctxNext.scale(Tam_Bloco, Tam_Bloco);
}

//REMOVE DO arquivo de constantes e migar para main, sem ser contante
movimento = {
  [Key.LEFT]: p => ({ ...p, x: p.x - 1 }),
  [Key.RIGHT]: p => ({ ...p, x: p.x + 1 }),
  [Key.DOWN]: p => ({ ...p, y: p.y + 1 }),
  [Key.SPACE]: p => ({ ...p, y: p.y + 1 }),
  [Key.UP]: p => painel.rotate(p)
};

function addEventListener(){

	document.addEventListener('keydown', event => {
    if (event.keyCode === Key.P) {
      pausa();
    }
    if (event.keyCode === Key.ESC) {
      gameOver();
    } else if (movimento[event.keyCode]) {
      event.preventDefault();
      // Get new state
      let p = movimento[event.keyCode](painel.peca);
      if (event.keyCode === Key.SPACE) {
        
        while (painel.valida(p)) {
          conta.pontos += Pontos.DESPENCA;
          painel.peca.mover(p);
          p = movimento[Key.DOWN](painel.peca);
        }       
      } else if (painel.valida(p)) {
        painel.peca.mover(p);
        if (event.keyCode === Key.DOWN) {
          conta.pontos += Pontos.SOFT;         
        }
      }
    }
  });
}




function play() {  
   resetGame();
  tempo.inicio = performance.now();
  // verifica se há um jogo antigo em andamento
  if (idRequest) {
    cancelAnimationFrame(idRequest);
  }

  animar();

}

function resetGame() {
  conta.pontos = 0;
  conta.linhas = 0;
  conta.nivel = 0;
  painel.reset();
  tempo = { inicio: 0, passado: 0, nivel: Nivel[conta.nivel] };
}

function pausa() {
  if (!idRequest) {
    animar();
    return;
  }

  cancelAnimationFrame(idRequest);
  idRequest = null;
  
  ctx.fillStyle = 'black';
  ctx.fillRect(1, 3, 8, 1.2);
  ctx.font = '1px Arial';
  ctx.fillStyle = 'yellow';
  ctx.fillText('PAUSA', 3, 4);
}

  
  function gameOver() {
  cancelAnimationFrame(idRequest);
  ctx.fillStyle = 'black';
  ctx.fillRect(1, 3, 8, 1.2);
  ctx.font = '1px Arial';
  ctx.fillStyle = 'red';
  ctx.fillText('GAME OVER', 1.8, 4);
}

function animar(now = 0) {
  tempo.passado = now - tempo.inicio;
  if (tempo.passado > tempo.nivel) {
    tempo.inicio = now;
    if (!painel.derruba()) {
      gameOver();
      return;
    }
  }

  // Clear board before drawing new state.
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

 painel.desenho();
  idRequest = requestAnimationFrame(animar);
}

