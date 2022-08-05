//Funções Comuns da cpu

//Executa o turno da Cpu
function jogadaCPU(){
    if(jogo){
        if(cpuTurno){
            cpuTurno = false;
            let area = [0, 0];
            area = estrategia()
            inserirXO( area[0], area[1]);   
        }else{
            cpuTurno = true;
        } 
    }
    liberado = true;
}

//Verifica a estratégia usada pela inteligencia da Cpu e retorna a linha e coluna que ele vai preencher
function estrategia(){
    let area = [0,0]
    if( cpuInteligencia == "burra" ){
        area = estrategiaAleatoria();
    }else if ( cpuInteligencia == "atenta" ){
        //alert("atenta")
        area = trancar( simboloJogador );
    }else if ( cpuInteligencia == "desafiadora" ){
        area = estrategiaDesafiadora();
    } else{
        area = jogadaImbativel();
    }
    return area
}

function estrategiaAleatoria(){
    //Gera um valor aleatorio de 0 ao tamanho do vetor:
    let indice = Math.floor(Math.random() * auxiliar.length);
    //Recupera um elemento do vetor auxiliar
    let numero = auxiliar[indice]
    
    //Recupera a linha e coluna deste elemento:
    let n = numero - 1
    let linha = Math.floor( n/3 ) //divisão inteira
    let coluna = n%3 

    return [linha, coluna];
}