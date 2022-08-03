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
    let area = [0,0]
    if( cpuInteligencia == "burro" ){
        area = estrategiaAleatoria();
    }else if ( cpuInteligencia == "atenta" ){
        //alert("atenta")
        area = trancar( simboloJogador );
    }else{
        area = estrategiaImbativel();
    }
    return area
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

function trancar( simboloAtual ){
    //alert("chegou")
    let contH = 0 , contV = 0, contD1 = 0, contD2  = 0 ;
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
                   // alert("aqui")
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
        //alert("se safar")
        return seSafar(1);
    } else{
        return tentar();
    }
}

function tentar(){
    //alert("chegou")
    let contH = 0 , contV = 0, contD1 = 0, contD2  = 0 ;
    //Procura casas vazias
    for(let i=0 ; i<3; i++){ // linha
        for(let j=0 ; j<3; j++){ //coluna
            if( espaco[i][j].innerText == "" ){
                //alert( i +"," + j + " está vazio")
                //verifica linha dele
                for(let k=0; k<3 ; k++){
                    if( espaco[i][k].innerText == simboloCpu){
                        //alert("contH")
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
                    //alert( i +"," + j + " = " + (i + j))
                    if( i == j){                    
                        //alert( "igual a 2")
                        for(let k=0; k<3 ; k++){
                            let data = espaco[k][k].innerText
                            //alert(  data )
                            if( data  == simboloCpu){
                                //alert("d1")
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
                            //alert(z + "," +k)
                            z= z-1
                        }
                    }
                }
                if(contH > 0 || contV > 0 || contD1 > 0 || contD2 > 0 ){
                    //alert("aqui")
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

function verifica( i , j , cont){
    let contH = 0 , contV = 0, contD1 = 0, contD2  = 0 ;
    for(let k=0; k<3 ; k++){
        if( espaco[i][k].innerText == simboloCpu){
            //alert("contH")
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
        //alert( i +"," + j + " = " + (i + j))
        if( i == j){                    
            //alert( "igual a 2")
            for(let k=0; k<3 ; k++){
                let data = espaco[k][k].innerText
                //alert(  data )
                if( data  == simboloCpu){
                    //alert("d1")
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
                //alert(z + "," +k)
                z= z-1
            }
        }
    }
    if(contH > 0 || contV > 0 || contD1 > 0 || contD2 > 0 ){
        //alert("aqui")
        return [i,j];
    }else{
        //alert("zerou")
        contH = 0;
        contV = 0;
        contD1 = 0;
        contD2 = 0;
    }
    //alert(cont)
    return seSafar( cont )

}

function seSafar( cont ){

    let l=1, c=1, tentativa = 0;
    
    switch(cont){
        case 1:
            //alert("tentou 1")
            if(jogadas[1] == 1){
                l = 2 ; c = 1 ; tentativa = 1
            }else{
                l = 0 ; c = 1 ; tentativa = 1
            }     
            break;
        case 2:
            //alert("tentou 2")
            l = 1 ; c = 0 ; tentativa = 2
            break;
        case 3:
            //alert("tentou 3")
            l = 1 ; c = 2 ; tentativa = 3
            break;
        case 4:
            //alert("tentou 4")
            if(jogadas[1] == 1){
                l = 0 ; c = 1 ; tentativa = 4
            }else{
                l = 2 ; c = 1 ; tentativa = 4
            } 
            break;
    }

    let dado = espaco[l][c];
    //alert( dado.innerText == "" )
 
    if( dado.innerText == "" && cont == tentativa){
        cont++;
        //alert("entrou")
        return verifica( l, c ,cont)
    }

    if(tentativa == 0){
        return tentar();
    }else{
        cont++;
        return seSafar( cont );
    }
}

/*
    if(jogadas[1] == 1){
        data = espaco[2][1]
    }else{
         = espaco[0][1]
    } 
    let data = espaco[l][c]
    //alert("chegou aqui")
    if( data.innerText == "" && cont == 1){
        alert("tentou 2")
        cont++;
        if(jogadas[1] == 1){
            return verifica( 2, 1 ,cont)
        }else{
            return verifica( 0, 1 ,cont)
        }      
    }
    data = espaco[1][0]
    if( data.innerText == "" && cont == 2){
        alert("tentou 4")
        cont++;
        return verifica( 1, 0 ,cont)
    }
    data = espaco[1][2]
     if( data.innerText == "" && cont == 3){
        cont++;
        return verifica( 1, 2 ,cont)
    }
    if(jogadas[1] == 1){
        data = espaco[0][1]
    }else{
        data = espaco[2][1]
    }
    if( data.innerText == "" && cont == 4){
        cont++;
        if(jogadas[1] == 1){
            return verifica( 0, 1 ,cont)
        }else{
            return verifica( 2, 1 ,cont)
        }    
    }

    return tentar();
}*/
//FIM de atenta------------------------------------------

//CPU imbativel------------------------------------------
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
                area =trancar(simboloJogador);
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