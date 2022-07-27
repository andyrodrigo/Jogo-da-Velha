//Variáveis------------------------------------------------------------------------------
//Caixas, Botões e Textos do Html
const caixaX = document.getElementById('X')
const caixaO = document.getElementById('O')
const vsCPU = document.getElementById('vsCPU')
const vsP2 = document.getElementById('vsP2')
const telaInicial = document.getElementById('telaInicial')
const telaTabuleiro = document.getElementById('telaTabuleiro')
const telaVitoria = document.getElementById('telaVitoria')
const vitoriaX = document.getElementById('vitoriaX')
const vitoriaO = document.getElementById('vitoriaO')
const ganhouMsg = document.getElementById('ganhouMsg')
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

//Array Auxiliar para estrategias da CPU (Cada numero corresponde a uma posição do tabuleiro)
let auxiliar = [1,2,3, 4,5,6, 7,8,9]

//Respectivas a dados em jogo
let jogo = false
let jogador = 1
let jogador1 = " p1 ";
let jogador2 = " p2 ";
let simboloJogador = "X" //iniciamente considera-se que o jogador usa o X
let simbolos = 0;
let cpu = true;
let cpuTurno = false;
let cpuInteligencia = "burro"//"burro"

//Funções-------------------------------------------------------------------------------
function teste(){
    window.alert('teste')
}

//Usada para verificar o simbolo escolhido pelo jogador
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

//Verifica o modo escolhido pelo jogador ( vs P2 ou vs Cpu)
function iniciar( modo ){
    limpaTabuleiro()
    ajustaSimbolos()
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

    //Caso a Cpu faça o primeiro lance no inicio
    if(cpu){
        jogadaCPU();
    }

}

//Executa o turno da Cpu
function jogadaCPU(){
    if(jogo){
        if(cpuTurno){
            cpuTurno = false;
            let area = [ 0, 0];
            area = estrategia()
            inserirXO( area[0], area[1]);   
        }else{
            cpuTurno = true;
        } 
    }
}

//Insere X ou O nos espaços
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

//Marca espaços já preenchidos, serve para informar apenas a Cpu
function retirar( linha , coluna ){

    let num =  (linha * 3) + (coluna + 1);
    //Relação desta expressão entrega a posição do elemento:
    //1,2,3 na linha 0, 4,5,6 na linha 1 e 7,8,9 na linha 2 

    let indice = auxiliar.indexOf(num); //captura o indece da posição do num dentro do vetor
    auxiliar.splice( indice , 1); //retira 1 item no indice capturado, ou seja, retira o elemento correspondente
    return;
}

//Verifica a estratégia usada pela inteligencia da Cpu e retorna a linha e coluna que ele vai preencher
function estrategia(){
    if(cpuInteligencia == "burro"){
        return estrategiaAleatoria();
    }else{
        return estrategiaImbativel();
    }
}

//CPU burro-------------------------------
function estrategiaAleatoria(){
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
//fim de burro----------------------------------------

//Inteligencia imbativel----------
function estrategiaImbativel(){
    if( jogador1 != "VOCÊ" ){//Cpu é X
        switch(simbolos){
            case 0:
                return jogada1X()
            case 2:
                return jogada2X()
            default:
                alert("erro na jogada CPU")
        }
    }else{//Cpu é O
        alert("chegou O") 
    }
}

//jogada 1 da CPU imbativel para X
function jogada1X(){
    return [2,0]
}
//jogada 2 da CPU matadora para X
function jogada2X(){
    //Verifica se o jogodor prencheu um dos cantos ao centro
    return [2,0]
}

//fim de matadora----------------------------------

//Verifica se alguém venceu a cada jogada
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

//Verifica quem venceu para informar e somar no placar
function indicarVitoria( jogadorAtual ){
    //alert('VITORIA DO JOGADOR ' + jogadorAtual )
    let vitorioso;
    if( jogadorAtual == 1){
        vitorioso = jogador1
        let num = Number(cont1p.innerText);
        cont1p.innerText = String(++num);
        vitoriaO.style.display = 'none'
        vitoriaX.style.display = 'block'
        ganhouMsg.style.color = "rgb(49, 196, 190)"
    }else{
        vitorioso = jogador2
        let num = Number(cont2p.innerText);
        cont2p.innerText = String(++num);
        vitoriaO.style.display = 'block'
        vitoriaX.style.display = 'none'
        ganhouMsg.style.color = "rgb(242, 178, 55)"
    }
    
    quemVenceu.innerText = vitorioso + " VENCEU!"
    ganhouMsg.innerText = "GANHOU A PARTIDA"
    
    telaVitoria.style.display = 'flex';
}

//informa sobre empara e aumenta o placar
function indicarEmpate(){

    let num = Number(contEmpate.innerText);
    contEmpate.innerText = String(++num);
 
    vitoriaO.style.display = 'none'
    vitoriaX.style.display = 'none'
    quemVenceu.innerText = "VOCÊ EMPATOU"
    ganhouMsg.innerText = "NINGUEM GANHOU A PARTIDA"
    ganhouMsg.style.color = "rgb(168, 190, 201)"
    telaVitoria.style.display = 'flex';

}

//limpa os dados para reiniciar a partida
function reiniciar(){
    auxiliar = [1,2,3, 4,5,6, 7,8,9]
    limpaTabuleiro()
    ajustaSimbolos()
    jogo = true
    telaVitoria.style.display = 'none';

    if(cpu){
        if( simboloJogador == "X" ){
            cpuTurno = false; 
        }else{
            cpuTurno = true;
        }
        jogadaCPU();
    }
}

function limpaTabuleiro(){
        //apaga textos e simbolo de todos os espaços
        for(let i=0 ; i<3; i++){
            for(let j=0 ; j<3; j++){
                espaco[i][j].style.backgroundImage = 'none';
                espaco[i][j].innerText = "";
            }
        }
}

//garante que o X começa e inica nos simbolos de turno no topo da tela
function ajustaSimbolos(){
    jogador = 1;
    simbolos = 0;
    turno.appendChild(simbO);
    turno.removeChild(simbO);
    turno.appendChild(simbX);
}

//Volta a tela inicial do menu (Usada pelos botões "Voltar" e "Sair")
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

}

//--------------------------------------------------------------------------------------

//inicialização
window.addEventListener("load", escutadores) //Ativa os escutadores