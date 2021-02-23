//Recupera o elemento
const canvas = document.getElementById('painel');
//Obtem o contexto 2d
const ctx = canvas.getContext('2d');

//Calcula o tamanho do elemento canvas
ctx.canvas.width = Coluna * Tam_Bloco;
ctx.canvas.height = Linha * Tam_Bloco;

//Escala o tamanho dos blocos 
ctx.scale(Tam_Bloco, Tam_Bloco);
