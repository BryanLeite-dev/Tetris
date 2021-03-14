//Recupera o elemento
const canvas = document.getElementById('painel');

//Obtem o contexto 2d
const ctx = canvas.getContext('2d');

//Calcula o tamanho do elemento canvas
ctx.canvas.width= Coluna * Tam_Bloco;
ctx.canvas.height= Linha * Tam_Bloco;

//Muda a escala
ctx.scale(Tam_Bloco, Tam_Bloco);

let painel = new Painel() ;

function play () {
    
    painel.reset();
    let peca = new Peca(ctx);
    peca.desenho();
    painel.peca = peca;
    console.table(painel.grid);
}

document.addEventListener('keydown', event =>{

    if (movimento[event.keyCode]) {
        event.preventDefault();
        let p=movimento[event.keyCode] (painel.peca);

        if(painel.validar(p)) {
            painel.peca.mover(p);
            ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
            painel.peca.desenho();
        }
    }

    if(event.keyCode === KEY.SPACE) {
        p = movimento[KEY.DOWN](painel.peca);
        while (painel.validar(p)) {
            painel.peca.mover(p);
            p = movimento[KEY.DOWN] (painel.peca);
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            painel.peca.desenho();
        }
    }
});