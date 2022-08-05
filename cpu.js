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

function possoVencer( simboloAtual ){
        //alert("chegou")
        let contH =0 , contV = 0, contD1 = 0, contD2  = 0 ;
        //Procura casas vazias
        for(let i=0 ; i<3; i++){ // linha
            for(let j=0 ; j<3; j++){ //coluna
                if( espaco[i][j].innerText == "" ){
                    //alert( i +"," + j + " está vazio")
                    //verifica linha dele
                    for(let k=0; k<3 ; k++){
                        if( espaco[i][k].innerText == simboloAtual){
                            //alert("contH")
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
                        //alert( i +"," + j + " = " + (i + j))
                        if( i == j){                    
                            //alert( "igual a 2")
                            for(let k=0; k<3 ; k++){
                                let data = espaco[k][k].innerText
                                //alert(  data )
                                if( data  == simboloAtual){
                                    //alert("d1")
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
                                //alert(z + "," +k)
                                z= z-1
                            }
                        }
                    }
                    if(contH == 2 || contV == 2 || contD1 == 2 || contD2 == 2 ){
                        //alert("enviou")
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
        if( simboloAtual == simboloCpu ){
            return possoVencer( simboloJogador );
        }else{
            return temDuploX();
        }
}

function temDuploX(){
    //caso1
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