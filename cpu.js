//Funções Comuns da cpu--------------------------------------------------

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
    if( cpuInteligencia == "boba" ){
        return estrategiaAleatoria();
    }else if ( cpuInteligencia == "atenta" ){
        return jogadaAtenta();
    } else{
        return jogadaImbativel();
    }
}

//apenas preenche um espaço que esteja vazio aleatoriamente
function estrategiaAleatoria(){
    //Gera um valor aleatorio de 0 até o tamanho do vetor:
    let indice = Math.floor(Math.random() * auxiliar.length);
    //Recupera um elemento do vetor auxiliar
    let numero = auxiliar[indice]
    
    //Recupera a linha e coluna deste elemento:
    let n = numero - 1
    let linha = Math.floor( n/3 ) //divisão inteira
    let coluna = n%3 

    return [linha, coluna];
}

//Analisa se tem 2 simbolos iguais que fecham uma linha
function verificarFechar( simboloAtual ){

    let contH =0 , contV = 0, contD1 = 0, contD2  = 0 ;

    //Procura casas vazias
    for(let i=0 ; i<3; i++){ // linha
        for(let j=0 ; j<3; j++){ //coluna
            if( espaco[i][j].innerText == "" ){

                //verifica linha dele
                for(let k=0; k<3 ; k++){
                    if( espaco[i][k].innerText == simboloAtual){
                        contH++
                    }
                }
                //verifica coluna dele
                for(let k=0; k<3 ; k++){
                    if( espaco[k][j].innerText == simboloAtual){
                        contV++
                    }
                }
                //Se ele for de diagonal, verifica também
                if( (i+j)%2 == 0){ // se a soma de i e j for par, é um elemento que tem diagonal
                    if( i == j){                    
                        for(let k=0; k<3 ; k++){
                            let data = espaco[k][k].innerText
                            if( data  == simboloAtual){
                                contD1++
                            }
                        }
                    }
                    if( (i + j) == 2 ){         
                        let z = 2
                        for(let k=0; k<3 ; k++){                    
                            let data = espaco[z][k].innerText
                            if( data == simboloAtual){                   
                                contD2++
                            }
                            z= z-1
                        }
                    }
                }
                if(contH == 2 || contV == 2 || contD1 == 2 || contD2 == 2 ){
                    return [i,j];
                }else{
                    contH = 0;
                    contV = 0;
                    contD1 = 0;
                    contD2 = 0;
                }
            }
        }
    }
    //Se não pode vencer nessa jogada, analisa se o oponente pode
    if( simboloAtual == simboloCpu ){
        return verificarFechar( simboloJogador );
    }else{
        if(simboloCpu == "O"){
            //verifica jogada capciosa se for o segundo a jogar
            return temDuploX();
        }else{
            return estrategiaAleatoria();
        }
    }
}

//Analisa se o adversario fez uma jogada de 2 X com uma casa vazia entre eles e fecha isso
function temDuploX(){
    let dado = espaco[0][0];
    let casa1 = espaco[0][1];
    let casa2 = espaco[1][0];
    if( dado.innerText == "" && casa1.innerText == "X" && casa2.innerText == "X" ){
        return[0,0]
    }
    dado = espaco[0][2];
    casa2 = espaco[1][2];
    if( dado.innerText == "" && casa1.innerText == "X" && casa2.innerText == "X" ){
        return[0,2]
    }
    dado = espaco[2][0];
    casa1 = espaco[2][1];
    casa2 = espaco[1][0];
    if( dado.innerText == "" && casa1.innerText == "X" && casa2.innerText == "X" ){
        return[2,0]
    }
    dado = espaco[2][2];
    casa2 = espaco[1][2];
    if( dado.innerText == "" && casa1.innerText == "X" && casa2.innerText == "X" ){
        return[2,2]
    }
    return trancar()
}

//Analiza jogadas de canto do adversario e procura melhor jogada
function seSafar( cont ){

    let l=1, c=1, tentativa = 0;
    
    switch(cont){
        case 1:
            if(jogadas[1] == 1){
                l = 2 ; c = 1 ; tentativa = 1
            }else{
                l = 0 ; c = 1 ; tentativa = 1
            }     
            break;
        case 2:
            l = 1 ; c = 0 ; tentativa = 2
            break;
        case 3:
            l = 1 ; c = 2 ; tentativa = 3
            break;
        case 4:
            if(jogadas[1] == 1){
                l = 0 ; c = 1 ; tentativa = 4
            }else{
                l = 2 ; c = 1 ; tentativa = 4
            } 
            break;
    }

    let dado = espaco[l][c];

    if( dado.innerText == "" && cont == tentativa){
        cont++;
        return verifica( l, c ,cont)
    }

    if(tentativa == 0){
        return tentar();
    }else{
        cont++;
        return seSafar( cont );
    }
}

//Verificação de cada entrada da função "seSafar"
function verifica( i , j , cont){
    let contH = 0 , contV = 0, contD1 = 0, contD2  = 0 ;
    for(let k=0; k<3 ; k++){
        if( espaco[i][k].innerText == simboloCpu){
            contH++
        } else if ( espaco[i][k].innerText == simboloJogador){
            contH--
        }
    }
    //verifica coluna dele
    for(let k=0; k<3 ; k++){
        if( espaco[k][j].innerText == simboloCpu){
            contV++
        } else if ( espaco[k][j].innerText == simboloJogador){
            contV--
        }
    }
    //Se ele for de diagonal, verifica também
    if( (i+j)%2 == 0){ // se asoma de i e j for par, é um elemento que tem diagonal
        if( i == j){                    
            for(let k=0; k<3 ; k++){
                let data = espaco[k][k].innerText
                if( data  == simboloCpu){
                    contD1++
                } else if ( data == simboloJogador){
                    contD1--
                }
            }
        }
        if( (i + j) == 2 ){         
            let z = 2
            for(let k=0; k<3 ; k++){                    
                let data = espaco[z][k].innerText
                if( data == simboloCpu){                   
                    contD2++
                } else if ( data == simboloJogador){
                    contD2--
                }
                z= z-1
            }
        }
    }
    if(contH > 0 || contV > 0 || contD1 > 0 || contD2 > 0 ){
        return [i,j];
    }else{
        contH = 0;
        contV = 0;
        contD1 = 0;
        contD2 = 0;
    }
    //testa a próxima situação
    return seSafar( cont )
}