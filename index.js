
//Variáveis------------------------------------------------------------------------------
//Caixas
const caixaX = document.getElementById('X')
const caixaO = document.getElementById('O')
const vsCPU = document.getElementById('vsCPU')
const vsP2 = document.getElementById('vsP2')
const telaInicial = document.getElementById('telaInicial')
const telaTabuleiro = document.getElementById('telaTabuleiro')
const idP1 = document.getElementById('idP1')
const idP2 = document.getElementById('idP2')
const cont1p = document.getElementById('cont1p')
const contEmpate = document.getElementById('contEmpate')
const cont2p = document.getElementById('cont2p')
const volta = document.getElementById("volta");
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
    if( simboloJogador == "X" ){
        if( modo == "cpu"){
            cpu = true;
            cpuTurno = false;
            idP1.innerText = "X (você)";
            idP2.innerText = "O (CPU)";
        }else{
            cpu = false;
            idP1.innerText = "X (Você)";
            idP2.innerText = "O (P2)";
        }     
    }else{
        if( modo == "cpu"){
            cpu = true;
            cpuTurno = true;
            idP1.innerText = "O (CPU)";
            idP2.innerText = "X (você)";
        }else{
            cpu = false;
            idP1.innerText = "X (P2)";
            idP2.innerText = "O (Você)";
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
    if(cpuTurno){
        cpuTurno = false;
        inserirXO( testeN, testeN);
        testeN++;      
    }else{
        cpuTurno = true;
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
                simbolo = 'X'
                jogador = 2;
                turno.removeChild(simbX);
                turno.appendChild(simbO);
            }else{
                espaco[linha][coluna].style.backgroundImage = 'url("imagens/Oo.png")';
                simbolo = 'O' 
                jogador = 1;
                turno.removeChild(simbO);
                turno.appendChild(simbX);
            }
            simbolos += 1;
            espaco[linha][coluna].innerText = simbolo

            testarVitoria(simbolo, jogadorAtual)

            //Se for contra a CPU
            if(cpu){
                jogadaCPU();
            }
        }
    }
}

function estrategia(){

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
            indicarVitoria( jogadorAtual );
            return;
        }else{
            contadorL=0;
            contadorC=0;
            if(simbolos == 9){
                indicarEmpate();
            }
        }
    }
}

function indicarVitoria( jogadorAtual ){
    alert('VITORIA DO JOGADOR ' + jogadorAtual )
    if( jogadorAtual == 1){
        let num = Number(cont1p.innerText);
        cont1p.innerText = String(++num);
    }else{
        let num = Number(cont2p.innerText);
        cont2p.innerText = String(++num);
    }   
    reiniciar();
}

function indicarEmpate(){
    alert('EMPATE')
    let num = Number(contEmpate.innerText);
    contEmpate.innerText = String(++num);
    reiniciar();
}

function reiniciar(){
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
    if(jogo){
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
        telaInicial.style.display = 'block';
    }
}


//Escutadores---------------------------------------------------------------------------

function escutadores(){
    vsCPU.addEventListener('click', function(){iniciar("cpu")})
    vsP2.addEventListener('click', function(){iniciar("p2")} )
    volta.addEventListener('click', voltar)
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