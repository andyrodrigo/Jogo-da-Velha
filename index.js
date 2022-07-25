
//Variáveis------------------------------------------------------------------------------
//Caixas
const caixaX = document.getElementById('X')
const caixaO = document.getElementById('O')
const vsCPU = document.getElementById('vsCPU')
const vsP2 = document.getElementById('vsP2')
const telaInicial = document.getElementById('telaInicial')
const telaTabuleiro = document.getElementById('telaTabuleiro')
const telaVitoria = document.getElementById('telaVitoria')
const idP1 = document.getElementById('idP1')
const idP2 = document.getElementById('idP2')
const cont1p = document.getElementById('cont1p')
const contEmpate = document.getElementById('contEmpate')
const cont2p = document.getElementById('cont2p')
const quemVenceu = document.getElementById('quemVenceu')
const volta = document.getElementById("volta");
const sair = document.getElementById("sair");
const outra = document.getElementById("outra");
const turno = document.getElementById('turno')
const simbX = document.getElementById('simbX')
const simbO = document.createElement("IMG");
simbO.src = "imagens/Oo.png";



//Tabuleiro
const espaco = new Array(3)
espaco[0] = new Array(3)
espaco[1] = new Array(3)
espaco[2] = new Array(3)
//relação com os espaços do html
espaco[0][0] = document.getElementById('0x0');
espaco[0][1] = document.getElementById('0x1');
espaco[0][2] = document.getElementById('0x2');
espaco[1][0] = document.getElementById('1x0');
espaco[1][1] = document.getElementById('1x1');
espaco[1][2] = document.getElementById('1x2');
espaco[2][0] = document.getElementById('2x0');
espaco[2][1] = document.getElementById('2x1');
espaco[2][2] = document.getElementById('2x2');

//Array Auxiliar para estrategias da CPU
let auxiliar = [1,2,3, 4,5,6, 7,8,9]
/*
//Matriz Auxiliar
const matrizAux = new Array(3)
matrizAux[0] = new Array(3)
matrizAux[1] = new Array(3)
matrizAux[2] = new Array(3)*/


//de jogo
let jogo = false
let jogador = 1
let cpu = true;
let cpuTurno = false;
let simboloJogador = "X" //iniciamente considera-se que o jogador usa o X
let simbolos = 0;
let jogador1 = " p1 ";
let jogador2 = " p2 ";

let testeN = 0;




//Funções-------------------------------------------------------------------------------
function teste(){
    window.alert('teste')
}

function mudaSimbolo( simbolo ){
    if( simbolo == 'X' && simboloJogador != "X"){
        simboloJogador = "X"
        caixaX.style.backgroundColor = "rgb(128, 150, 161)";
        caixaO.style.backgroundColor = "rgb(25, 42, 50)";
    }else if ( simbolo == 'O' && simboloJogador != "O" ){
        simboloJogador = "O"
        caixaO.style.backgroundColor = "rgb(128, 150, 161)";
        caixaX.style.backgroundColor = "rgb(25, 42, 50)";
    }
}

function iniciar( modo ){

    auxiliar = [1,2,3, 4,5,6, 7,8,9]
    if( simboloJogador == "X" ){
        jogador1 = "VOCÊ";
        if( modo == "cpu"){
            cpu = true;
            cpuTurno = false;
            idP1.innerText = "X (você)";
            idP2.innerText = "O (CPU)";
            jogador2 = "CPU";
        }else{
            cpu = false;
            idP1.innerText = "X (Você)";
            idP2.innerText = "O (P2)";
            jogador2 = "Oponente";
        }     
    }else{
        jogador2 = "VOCÊ";
        if( modo == "cpu"){
            cpu = true;
            cpuTurno = true;
            idP1.innerText = "O (CPU)";
            idP2.innerText = "X (você)";
            jogador1 = "CPU";
        }else{
            cpu = false;
            idP1.innerText = "X (P2)";
            idP2.innerText = "O (Você)";
            jogador1 = "Oponente";
        }   
    }
    telaInicial.style.display = 'none';
    telaTabuleiro.style.display = 'block';
    jogo = true

    if(cpu){
        jogadaCPU();
    }

}

function jogadaCPU(){
    if(jogo){
        if(cpuTurno){
            cpuTurno = false;
            let area = [ 0, 0];
            area = estrategia()
            inserirXO( area[0], area[1]);
            //inserirXO( testeN, testeN);
            //testeN++;      
        }else{
            cpuTurno = true;
        } 
    }
}

function inserirXO( linha, coluna){
    
    if(jogo){
        //Testa se já existe simbolo
        if(espaco[linha][coluna].innerText == ""){

            let simbolo
            let jogadorAtual = jogador;
    
            if(jogadorAtual == 1){
                espaco[linha][coluna].style.backgroundImage = 'url("imagens/Xx.png")';
                retirar(linha,coluna)
                simbolo = 'X'
                jogador = 2;
                turno.removeChild(simbX);
                turno.appendChild(simbO);
            }else{
                espaco[linha][coluna].style.backgroundImage = 'url("imagens/Oo.png")';
                retirar(linha,coluna)
                simbolo = 'O' 
                jogador = 1;
                turno.removeChild(simbO);
                turno.appendChild(simbX);
            }
            simbolos += 1;
            espaco[linha][coluna].innerText = simbolo

            testarVitoria(simbolo, jogadorAtual)

            //testaEmpate
            if(jogo){
                if(simbolos >= 9){
                    jogo = false;
                    indicarEmpate();
                }
            }


            //Se for contra a CPU
            if(cpu){
                jogadaCPU();
            }
        }
    }
}

function retirar( linha, coluna){
    let num;
    switch(linha){
        case 0:
            switch(coluna){
                case 0:
                    num = 1
                    break;
                case 1:
                    num = 2
                    break;
                case 2:
                    num = 3
                    break;
                default:
                    alert("erro")
            }
            break;
        case 1:
            switch(coluna){
                case 0:
                    num = 4
                    break;
                case 1:
                    num = 5
                    break;
                case 2:
                    num = 6
                    break;
                default:
                    alert("erro")                   
            }
            break;
        case 2:
            switch(coluna){
                case 0:
                    num = 7
                    break;
                case 1:
                    num = 8
                    break;
                case 2:
                    num = 9
                    break;
                default:
                    alert("erro")
            }
            break;
        default:
            alert("erro")
    }
    let indice = auxiliar.indexOf(num);
    auxiliar.splice( indice , 1);
    return;
}

function estrategia(){
    let numero = 0;
    let indice = Math.floor(Math.random() * auxiliar.length);
    numero = auxiliar[indice]
    switch(numero){
        case 1:
            return [0,0];
        case 2:
            return [0,1];
        case 3:
            return [0,2];     
        case 4:
            return [1,0];
        case 5:
            return [1,1];
        case 6:
            return [1,2];
        case 7:
            return [2,0];
        case 8:
            return [2,1];
        case 9:
            return [2,2];
        default:
            alert("Erro");
            return [0,0];
    }
}
 /*
 //Se fosse um tabela
function inserirXO(e){

    let linha = Number(e.currentTarget.parentNode.rowIndex)
    let coluna = Number(e.currentTarget.cellIndex)
    let simbolo
    
    if(jogador == 1){
        espaco[linha][coluna].style.backgroundImage = 'url("imagens/Xx.png")';
        simbolo = 'X'
        jogador = 2;
    }else{
        espaco[linha][coluna].style.backgroundImage = 'url("imagens/Oo.png")';
        simbolo = 'O' 
        jogador = 1;
    }
    espaco[linha][coluna].innerText = simbolo
    testarVitoria(simbolo)

}

function inserirSimbolo( ){

    espaco[0][0].appendChild(simboloX);
}*/

function testarVitoria(simbolo, jogadorAtual){
    
    let contadorL = 0 //conta linha 
    let contadorC = 0 //conta colunas
    let contadorDD = 0 //conta diagonal descendo
    let contadorDS = 0 //conta diagonal subindo

    for(let i=0 ; i<3; i++){
        for(let j=0 ; j<3; j++){
            if(espaco[i][j].innerText == simbolo){//testa linha
                contadorL++
            }
            if(espaco[j][i].innerText == simbolo){//testa coluna
                contadorC++
            }
            if( i == j){
                if(espaco[i][j].innerText == simbolo){//testa diagonal descendo
                    contadorDD++
                }
            }
            if( i+j == 2){
                if(espaco[i][j].innerText == simbolo){//testa diagonal subindo
                    contadorDS++
                }
            }
        }
        if(contadorL >= 3 || contadorC >= 3 || contadorDD >= 3 || contadorDS >= 3){
            jogo = false;
            indicarVitoria( jogadorAtual );
            return;
        }else{
            contadorL=0;
            contadorC=0;
        }
    }
}

function indicarVitoria( jogadorAtual ){
    //alert('VITORIA DO JOGADOR ' + jogadorAtual )
    let vitorioso;
    if( jogadorAtual == 1){
        vitorioso = jogador1
        let num = Number(cont1p.innerText);
        cont1p.innerText = String(++num);
    }else{
        vitorioso = jogador2
        let num = Number(cont2p.innerText);
        cont2p.innerText = String(++num);
    }
    quemVenceu.innerText = vitorioso + " VENCEU!"
    telaVitoria.style.display = 'flex';

}

function indicarEmpate(){

    let num = Number(contEmpate.innerText);
    contEmpate.innerText = String(++num);
 
    quemVenceu.innerText = "VOCÊ EMPATOU"
    telaVitoria.style.display = 'flex';

}

function reiniciar(){
    auxiliar = [1,2,3, 4,5,6, 7,8,9]
    //apaga textos e simbolo de todos os espaços
    for(let i=0 ; i<3; i++){
        for(let j=0 ; j<3; j++){
            espaco[i][j].style.backgroundImage = 'none';
            espaco[i][j].innerText = "";
        }
    }
    jogador = 1;
    simbolos = 0;
    turno.appendChild(simbO);
    turno.removeChild(simbO);
    turno.appendChild(simbX);
    jogo = true
    telaVitoria.style.display = 'none';

    testeN=0;
    if(cpu){
        if( simboloJogador == "X" ){
            cpuTurno = false; 
        }else{
            cpuTurno = true;
        }
        jogadaCPU();
    }
}

function voltar(){
    jogo = false
    //Limpa Tabuleiro
    reiniciar();
    //Zera Placar
    let num = Number(0);
    cont1p.innerText = String(num);
    contEmpate.innerText = String(num);
    cont2p.innerText = String(num);
    //Troca de Tela
    telaTabuleiro.style.display = 'none';
    telaVitoria.style.display = 'none';
    telaInicial.style.display = 'block';

}


//Escutadores---------------------------------------------------------------------------

function escutadores(){
    vsCPU.addEventListener('click', function(){iniciar("cpu")})
    vsP2.addEventListener('click', function(){iniciar("p2")} )
    volta.addEventListener('click', voltar)
    sair.addEventListener('click', voltar)
    outra.addEventListener('click', reiniciar)
    caixaX.addEventListener('click', function(){mudaSimbolo("X")})
    caixaO.addEventListener('click', function(){mudaSimbolo("O")})
    espaco[0][0].addEventListener('click', function(){inserirXO(0,0)} )
    espaco[0][1].addEventListener('click', function(){inserirXO(0,1)})
    espaco[0][2].addEventListener('click', function(){inserirXO(0,2)})
    espaco[1][0].addEventListener('click', function(){inserirXO(1,0)})
    espaco[1][1].addEventListener('click', function(){inserirXO(1,1)})
    espaco[1][2].addEventListener('click', function(){inserirXO(1,2)})
    espaco[2][0].addEventListener('click', function(){inserirXO(2,0)})
    espaco[2][1].addEventListener('click', function(){inserirXO(2,1)})
    espaco[2][2].addEventListener('click', function(){inserirXO(2,2)})
    /*espaco[0][0].addEventListener('click', inserirXO )
    espaco[0][1].addEventListener('click', inserirXO)
    espaco[0][2].addEventListener('click', inserirXO)
    espaco[1][0].addEventListener('click', inserirXO)
    espaco[1][1].addEventListener('click', inserirXO)
    espaco[1][2].addEventListener('click', inserirXO)
    espaco[2][0].addEventListener('click', inserirXO)
    espaco[2][1].addEventListener('click', inserirXO)
    espaco[2][2].addEventListener('click', inserirXO)*/
}

//--------------------------------------------------------------------------------------

//inicialização
window.addEventListener("load", escutadores) //Ativa os escutadores