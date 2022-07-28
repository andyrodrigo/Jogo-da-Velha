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

//Array Auxiliar para estrategias aleatoria da CPU (Cada numero corresponde a uma posição do tabuleiro)
let auxiliar = [1,2,3, 4,5,6, 7,8,9]
//Array Auxiliar para estrategia Imbativel da CPU (Registra jogadas)
let jogadas = [0, 0,0,0,0, 0,0,0,0, 0,0,0,0]
let indiceDeJogadas = 1;

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
let cpuInteligencia = "burro"

//Funções-------------------------------------------------------------------------------

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
        liberado = true;
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
            liberado = false;
            cpu = true;
            cpuTurno = true;
            idP1.innerText = "O (CPU)";
            idP2.innerText = "X (você)";
            jogador1 = "CPU";
        }else{
            liberado = true;
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
        setTimeout(function(){jogadaCPU()} , 1000);
    }

}

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

function cliqueEspaco(linha, coluna){
    if(liberado){
        inserirXO( linha, coluna)
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
            registraJogadas( linha, coluna, simbolo )
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
                liberado = false;
                setTimeout(function(){jogadaCPU()} , 1000);
            }
        }
    }
}

function registraJogadas(linha, coluna, simbolo){
    let num =  (linha * 3) + (coluna + 1);
    jogadas[indiceDeJogadas] = num
    //alert(jogadas[indiceDeJogadas])
    indiceDeJogadas++
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

//CPU boba-------------------------------
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
//FIM de boba----------------------------------------

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
    
    //setTimeout(function(){ exibeVitoria()} , 1000);
    setTimeout(function(){ telaVitoria.style.display = 'flex'} , 1000);
    //telaVitoria.style.display = 'flex';
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

    setTimeout(function(){ telaVitoria.style.display = 'flex'} , 1000);

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
            liberado = true;
            cpuTurno = false; 
        }else{
            liberado = false;
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
        indiceDeJogadas = 1
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
    return Verificar_Fechar( 'O' );
    //return [0,0]
}
//FIM de atenta------------------------------------------

//CPU imbativel---------------------------------------
function estrategiaImbativel(){
    if( jogador1 != "VOCÊ" ){//Cpu é X
        //return estrategiaAleatoria();
        return jogadaImbativelX();
    }else{//Cpu é O
        return estrategiaAleatoria(); 
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
        case 8:
        case 9:
            area = Verificar_Fechar('X');
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
//jogada 2 da CPU matadora para X
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

function jogadaX3(){
    //alert( jogadas[2] )
    let area = [0,0]
    switch( jogadas[2] ){
        case 1:
            if( jogadas[4] == 5){
                area = [2,2]
            }else{
                area = Verificar_Fechar('X');
            }
            break;
        case 2:
        case 4:
            if( jogadas[4] == 8){
                area = [1,1]
            }else{
                area = Verificar_Fechar('X');
            }
            break;
        case 6:
        case 8:
            if( jogadas[4] == 4){
                area = [1,1]
            }else{
                area = area = Verificar_Fechar('X');
            }
            break;
        case 3:
            if( jogadas[4] == 8){
                area = [0,0]
            }else{
                area = area = Verificar_Fechar('X');
            }
            break;
        case 9:
            if( jogadas[4] == 5){
                area = [0,0]
            }else{
                area = area = Verificar_Fechar('X');
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
                    area = area = Verificar_Fechar('X'); 
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


//Escutadores---------------------------------------------------------------------------

function escutadores(){
    vsCPU.addEventListener('click', function(){iniciar("cpu")})
    vsP2.addEventListener('click', function(){iniciar("p2")} )
    volta.addEventListener('click', voltar)
    sair.addEventListener('click', voltar)
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