//Jogadas da cpu Imbativel

function jogadaImbativel(){
    let area = [0,0]
    //alert( indiceDeJogadas )
    switch( indiceDeJogadas ){
        case 1:
            area = jogadaX1();
            break;
        case 2:
            area = jogadaO1();
            break;
        case 3:
            area = jogadaX2();
            break;
        case 4:
            area = jogadaO2();
            break;
        case 5:
            area = jogadaX3();
            break;
        case 6:
            area = trancar(simboloJogador);
            break;
        case 7:
        case 8:
        case 9:
            area = Verificar_Fechar(simboloCpu);
            break;
        default:
            alert("Erro Jogada cpu Imbativel");
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
                //alert("trancar")
                area = trancar(simboloJogador);
            }
            break;
        case 2:
            if( jogadas[3] == 8){
                area = [0,0]
            }else{
                area = trancar(simboloJogador);
            }
            break;
        case 3:
            if( jogadas[3] == 7){
                area = [0,1]
            }else{
                area = trancar(simboloJogador);
            }
            break;
        case 4:
            if( jogadas[3] == 6){
                area = [0,0]
            }else{
                area = trancar(simboloJogador);
            }
            break;
        case 6:
            if( jogadas[3] == 4){
                area = [0,0]
            }else{
                area = trancar(simboloJogador);
            }
            break;
        case 7:
            if( jogadas[3] == 3){
                area = [0,1]
            }else{
                area = trancar(simboloJogador);
            }
            break;
        case 8:
            if( jogadas[3] == 2){
                area = [0,0]
            }else{
                area = trancar(simboloJogador);
            }
            break;
        case 9:
            if( jogadas[3] == 1){
                area = [0,1]
            }else{
                area = trancar(simboloJogador);
            }
            break;
        case 5:
            if( jogadas[3] == 9){
                area = [0,2]
            }else{
                area = trancar(simboloJogador);
            }
            break;
        default:
            alert("Erro Jogada2 cpu O");
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

/*

function estrategiaImbativel(){
    let area = [0,0]
    if( simboloCpu == "X" ){//Cpu é X
        //return estrategiaAleatoria();
        area = jogadaImbativelX();
    }else{//Cpu é O
        area = jogadaImbativelO();
        //return estrategiaAleatoria(); 
    }
    return area;
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
            area = trancar(simboloJogador);
            break;
        case 8:
        case 9:
            area = Verificar_Fechar(simboloCpu);
            break;
        default:
            alert("Erro Jogada cpu X");
    }
    return area;
}*/