//Variáveis------------------------------------------------------------------------------
//Caixas, Botões e Textos do Html
const tabuleiro = document.getElementById('tabuleiro')
const linha = document.getElementsByClassName('linha')
const caixaX = document.getElementById('X')
const caixaO = document.getElementById('O')
const vsCPU = document.getElementById('vsCPU')
const vsP2 = document.getElementById('vsP2')
const telaInicial = document.getElementById('telaInicial')
const telaTabuleiro = document.getElementById('telaTabuleiro')
const telaVitoria = document.getElementById('telaVitoria')
const telaCpu = document.getElementById('telaCpu')
const boba = document.getElementById('boba')
const atenta = document.getElementById('atenta')
const imbativel = document.getElementById('imbativel')
const cancela = document.getElementById('cancela')
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

//Array Auxiliar para estrategias aleatoria da CPU (Cada numero corresponde a uma posição do tabuleiro)
let auxiliar = [1,2,3, 4,5,6, 7,8,9]
//Array Auxiliar para estrategia Imbativel da CPU (Registra jogadas)
let jogadas = [0, 0,0,0, 0,0,0, 0,0,0]
let indiceDeJogadas = 1;
let jogadasLC = new Array(10)
jogadasLC[0] = new Array(2)
jogadasLC[1] = new Array(2)
jogadasLC[2] = new Array(2)
jogadasLC[3] = new Array(2)
jogadasLC[4] = new Array(2)
jogadasLC[5] = new Array(2)
jogadasLC[6] = new Array(2)
jogadasLC[7] = new Array(2)
jogadasLC[8] = new Array(2)
jogadasLC[9] = new Array(2)

//Respectivas a dados em jogo
let jogo = false
let jogador = 1
let jogador1 = " p1 ";
let jogador2 = " p2 ";
let simboloJogador = "X" //iniciamente considera-se que o jogador usa o X
let simbolos = 0;
let liberado = true; //libera teclas de inserção
let cpu = true;
let cpuTurno = false;
let simboloCpu = "O" //iniciamente considera-se que a cpu usa o O
let cpuInteligencia = "outra"//"imbativel"//"atenta"//"boba"

//Escutadores---------------------------------------------------------------------------

function escutadores(){
    vsCPU.addEventListener('click', function(){exibirInteligencias(true)})
    cancela.addEventListener('click', function(){exibirInteligencias(false)})
    boba.addEventListener('click', function(){selecionarInteligencia(1)})
    atenta.addEventListener('click', function(){selecionarInteligencia(2)})
    imbativel.addEventListener('click', function(){selecionarInteligencia(3)})

    //vsCPU.addEventListener('click', function(){iniciar("cpu")})
    vsP2.addEventListener('click', function(){iniciar("p2")} )
    volta.addEventListener('click', retorno)
    sair.addEventListener('click', retorno)
    outra.addEventListener('click', reiniciar)
    caixaX.addEventListener('click', function(){mudaSimbolo("X")})
    caixaO.addEventListener('click', function(){mudaSimbolo("O")})
    espaco[0][0].addEventListener('click', function(){cliqueEspaco(0,0)} )
    espaco[0][1].addEventListener('click', function(){cliqueEspaco(0,1)})
    espaco[0][2].addEventListener('click', function(){cliqueEspaco(0,2)})
    espaco[1][0].addEventListener('click', function(){cliqueEspaco(1,0)})
    espaco[1][1].addEventListener('click', function(){cliqueEspaco(1,1)})
    espaco[1][2].addEventListener('click', function(){cliqueEspaco(1,2)})
    espaco[2][0].addEventListener('click', function(){cliqueEspaco(2,0)})
    espaco[2][1].addEventListener('click', function(){cliqueEspaco(2,1)})
    espaco[2][2].addEventListener('click', function(){cliqueEspaco(2,2)})

}

//--------------------------------------------------------------------------------------

//inicialização
window.addEventListener("load", escutadores) //Ativa os escutadores