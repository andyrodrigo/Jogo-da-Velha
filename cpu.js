//Funções da cpu

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
    if( cpuInteligencia == "burro" ){
        return estrategiaAleatoria();
    }else if ( cpuInteligencia == "atenta" ){
        return Trancar_Tentar( simboloJogador, 0);
    }else{
        return estrategiaImbativel();
    }
}


//CPU boba--------------------------------------------
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
//FIM de boba-----------------------------------------

//CPU atenta------------------------------------------
function Verificar_Fechar( simboloAtual ){
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
    if( simboloAtual != simboloJogador){
        return Verificar_Fechar( simboloJogador );
    }else{
        return estrategiaAleatoria();
    }
}

function Trancar_Tentar( simboloAtual , quantidade){
    //alert("chegou")
    let contH = quantidade , contV = quantidade, contD1 = quantidade, contD2  = quantidade ;
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
    if( simboloAtual != simboloCpu){
        return Trancar_Tentar( simboloCpu , 1 );
    }else{
        return estrategiaAleatoria();
    }
}
//FIM de atenta------------------------------------------

//CPU imbativel------------------------------------------
function estrategiaImbativel(){
    if( simboloCpu == "X" ){//Cpu é X
        //return estrategiaAleatoria();
        return jogadaImbativelX();
    }else{//Cpu é O
        return jogadaImbativelO();
        //return estrategiaAleatoria(); 
    }
}

function jogadaImbativelX(){
    let area = [0,0]
    //alert( indiceDeJogadas )
    switch( indiceDeJogadas ){
        case 1:
            area = jogadaX1();
            break;
        case 3:
            area = jogadaX2();
            break;
        case 5:
            area = jogadaX3();
            break;
        case 7:
        case 9:
            area = Verificar_Fechar(simboloCpu);
            break;
        default:
            alert("Erro Jogada cpu X");
    }
    return area;
}

function jogadaImbativelO(){
    let area = [0,0]
    //alert( indiceDeJogadas )
    switch( indiceDeJogadas ){
        case 2:
            area = jogadaO1();
            break;
        case 4:
            area = jogadaO2();
            break;
        case 6:
            area = Verificar_Fechar(simboloCpu);
            //area = jogadaO3();
            break;
        case 8:
        case 9:
            area = Verificar_Fechar(simboloCpu);
            break;
        default:
            alert("Erro Jogada cpu X");
    }
    return area;
}

//jogada 1 da CPU imbativel para X
function jogadaX1(){
    return [2,0];
}

//jogada 1 da CPU imbativel para O
function jogadaO1(){
    if( jogadas[1] == 5 ){
        return [0,0];
    }else{
        return [1,1];
    }
}

//jogada 2 da CPU imbativel para X
function jogadaX2(){
    //Verifica onde o jogador jogou
    //alert( jogadas[2] )
    let area = [0,0]
    switch( jogadas[2] ){
        case 1:
        case 5:
        case 9:
            area = [0,2];
            break;
        case 2:
        case 3:
        case 4:
            area = [2,2];
            break;
        case 6:
        case 8:
            area = [0,0];
            break;
        default:
            alert("Erro Jogada2 cpu X");
    }
    return area;
}

//jogada 2 da CPU imbativel para O
function jogadaO2(){
    //Verifica onde o jogador jogou
    //alert( jogadas[2] )
    let area = [0,0]

    switch( jogadas[1] ){
        case 1:
            if( jogadas[3] == 9){
                area = [0,1]
            }else{
                area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 2:
            if( jogadas[3] == 8){
                area = [0,0]
            }else{
                area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 3:
            if( jogadas[3] == 7){
                area = [0,1]
            }else{
                area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 4:
            if( jogadas[3] == 6){
                area = [0,0]
            }else{
                area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 6:
            if( jogadas[3] == 4){
                area = [0,0]
            }else{
                area = area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 7:
            if( jogadas[3] == 3){
                area = [0,1]
            }else{
                area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 8:
            if( jogadas[3] == 2){
                area = [0,0]
            }else{
                area = area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 9:
            if( jogadas[3] == 1){
                area = [0,1]
            }else{
                area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 5:
            switch( jogadas[3] ){
                case 1:
                    area = [2,2]
                    break;
                case 9:
                    area = [0,0]
                    break
                case 2:
                case 4:
                case 6:
                case 8:
                    area = area = Verificar_Fechar(simboloCpu); 
                    break;
            }
            break;
        default:
            alert("Erro Jogada2 cpu X");
    }
    return area;
}

function jogadaX3(){
    //alert( jogadas[2] )
    let area = [0,0]
    switch( jogadas[2] ){
        case 1:
            if( jogadas[4] == 5){
                area = [2,2]
            }else{
                area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 2:
        case 4:
            if( jogadas[4] == 8){
                area = [1,1]
            }else{
                area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 6:
        case 8:
            if( jogadas[4] == 4){
                area = [1,1]
            }else{
                area = area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 3:
            if( jogadas[4] == 8){
                area = [0,0]
            }else{
                area = area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 9:
            if( jogadas[4] == 5){
                area = [0,0]
            }else{
                area = area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 5:
            switch( jogadas[4] ){
                case 1:
                    area = [2,2]
                    break;
                case 9:
                    area = [0,0]
                    break
                case 2:
                case 4:
                case 6:
                case 8:
                    area = area = Verificar_Fechar(simboloCpu); 
                    break;
            }
            break;
        default:
            alert("Erro Jogada2 cpu X");
    }
    return area;
}

//jogada 3 da CPU imbativel para O
function jogadaO3(){
    //Verifica onde o jogador jogou
    //alert( jogadas[2] )
    let area = [0,0]

    switch( jogadas[1] ){
        case 1:
            if( jogadas[3] == 9){
                area = [0,1]
            }else{
                area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 2:
            if( jogadas[3] == 8){
                area = [0,0]
            }else{
                area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 3:
            if( jogadas[3] == 7){
                area = [0,1]
            }else{
                area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 4:
            if( jogadas[3] == 6){
                area = [0,0]
            }else{
                area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 6:
            if( jogadas[3] == 4){
                area = [0,0]
            }else{
                area = area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 7:
            if( jogadas[3] == 3){
                area = [0,1]
            }else{
                area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 8:
            if( jogadas[3] == 2){
                area = [0,0]
            }else{
                area = area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 9:
            if( jogadas[3] == 1){
                area = [0,1]
            }else{
                area = Verificar_Fechar(simboloCpu);
            }
            break;
        case 5:
            switch( jogadas[3] ){
                case 1:
                    area = [2,2]
                    break;
                case 9:
                    area = [0,0]
                    break
                case 2:
                case 4:
                case 6:
                case 8:
                    area = area = Verificar_Fechar(simboloCpu); 
                    break;
            }
            break;
        default:
            alert("Erro Jogada2 cpu X");
    }
    return area;
}

function jogadaX4(){
    return [2,0];
}

//FIM de imbativel----------------------------------