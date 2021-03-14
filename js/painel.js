class Painel{
   //Reinicia o painel ao iniciar o Jogo
    reset() {
        this.grid = this.getPainelVazio();
    }
    
    //Retorna a matriz preenchida com zeros
    getPainelVazio(){
        return Array.from(
            {length: Linha}, () => Array(Coluna).fill(0)
        );
    }

    validar(p){
        return p.shape.every((row, dy) => {
            return row.every((value, dx) =>{
                let x = p.x + dx;
                let y = p.y + dy;   
                return (
                    this.grid[y] && this.grid[y] [x] === 0 || (x >= 0 && x < Coluna && y <= Linha)
                );
            });
        });
    }
}