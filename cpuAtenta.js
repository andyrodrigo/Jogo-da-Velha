//Jogadas da cpu Atenta

function jogadaAtenta(){
    let area = [0,0]
    switch( indiceDeJogadas ){
        case 1:
        case 2:
            area = estrategiaAleatoria();
            break;
        case 3:
        case 4:
        case 5:
            area = trancar(simboloJogador );
            break;
        case 6:
        case 7:
        case 8:
        case 9:
            area = verificarFechar(simboloCpu);
            break;
        default:
            alert("Erro Jogada cpu Atenta");
    }
    return area;
}

//Fecha possibilidade do adversario em jogadas iniciais
function trancar( simboloAtual ){

    let contH = 0 , contV = 0, contD1 = 0, contD2  = 0 ;
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
                if( (i+j)%2 == 0){ // se asoma de i e j for par, é um elemento que tem diagonal
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
    if(cpuInteligencia == "imbativel"){
        return seSafar(1);
    } else{
        return tentar();
    }
}

//Busca uma linha com 2 espaço vazios para tentar vencer em 2 lances
function tentar(){
    let contH = 0 , contV = 0, contD1 = 0, contD2  = 0 ;
    //Procura casas vazias
    for(let i=0 ; i<3; i++){ // linha
        for(let j=0 ; j<3; j++){ //coluna
            if( espaco[i][j].innerText == "" ){
                //verifica linha dele
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
            }
        }
    }
    return estrategiaAleatoria();
}
