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

//Ativa tela de seleção de inteligencia
function exibirInteligencias( exibicao ){
    if(exibicao){
        telaCpu.style.display = "flex"
    }else{
        telaCpu.style.display = "none"
    }
}

//Recebe a opção de inteligencia do botão pressionado
function selecionarInteligencia( opcao ){
    switch(opcao){
        case 1:
            cpuInteligencia = "boba";
            break;
        case 2:
            cpuInteligencia = "atenta";
            break;
        case 3:
            cpuInteligencia = "imbativel";
            break;
        default:
            alert("erro na seleção de inteligencia")
    }
    telaCpu.style.display = "none"
    iniciar("cpu")
}

//Verifica o modo escolhido pelo jogador ( vs P2 ou vs Cpu)
function iniciar( modo ){

    limpaTabuleiro()
    ajustaSimbolos()
    //garante todos os espaços como existentes no vetor
    auxiliar = [1,2,3, 4,5,6, 7,8,9]

    if( simboloJogador == "X" ){
        liberado = true;
        jogador1 = "VOCÊ";
        if( modo == "cpu"){   
            simboloCpu = "O"       
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
            simboloCpu = "X"
            liberado = false;
            cpu = true;
            cpuTurno = true;
            idP1.innerText = "X (CPU)";
            idP2.innerText = "O (você)";
            jogador1 = "CPU";
        }else{
            liberado = true;
            cpu = false;
            idP1.innerText = "X (P2)";
            idP2.innerText = "O (Você)";
            jogador1 = "Oponente";
        }   
    }

    mudaTabuleiro()

    telaInicial.style.display = 'none';
    telaTabuleiro.style.display = 'block';

    jogo = true

    //Caso a Cpu faça o primeiro lance no inicio
    if(cpu){
        setTimeout(function(){jogadaCPU()} , 1000);
    }

}

//Espera liberação entre jogadas para o clique nos espaços
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
                retirar(linha,coluna)
                simbolo = 'X'
                jogador = 2;
                turno.removeChild(simbX);
                turno.appendChild(simbO); 
                espaco[linha][coluna].innerHTML = '<span>'+simbolo+ '</span>' + ' <svg width="100" height="100" viewBox="0 0 500 500" fill="none" class="rotateX" xmlns="http://www.w3.org/2000/svg"> <g id="Frame 2" clip-path="url(#clip0_7_23)"> <rect width="500" height="500" fill="transparent"/> <path class="X" d="M291 199V1H243.5H196V199H1V297H196V499H291V297H498V199H291Z" stroke="#00C5BF" stroke-width="5"/> <g id="Frame"> <path class="X1" d="M244 1V499" stroke="#00C5BF" stroke-width="100"/> <path class="X1" d="M2 250H497" stroke="#00C5BF" stroke-width="100"/> </g> </g> <defs> <clipPath id="clip0_7_23"> <rect width="500" height="500" fill="white"/> </clipPath> </defs> </svg>'
                console.log(espaco[linha][coluna].innerText)
            }else{
                retirar(linha,coluna)
                simbolo = 'O' 
                jogador = 1;
                turno.removeChild(simbO);
                turno.appendChild(simbX); 
                espaco[linha][coluna].innerHTML = `<span>${simbolo}</span> <svg width="100" height="100" viewBox="0 0 484 480" fill="none" class="rotateX" xmlns="http://www.w3.org/2000/svg"> <g id="Frame 2"> <path class="O1" d="M429.105 235.119C431.065 338.47 348.818 423.888 245.345 425.85C141.872 427.812 56.4469 345.572 54.4875 242.221C52.5281 138.87 134.774 53.4516 238.248 51.4899C341.721 49.5282 427.146 131.768 429.105 235.119Z" stroke="#F0B239" stroke-width="100"/> <circle class="O" cx="244" cy="239" r="233" stroke="#F0B239" stroke-width="4"/> <circle class="O" cx="242" cy="239" r="138" stroke="#F0B239" stroke-width="4"/> </g> </svg>`
            }
            simbolos += 1;
            registraJogadas( linha, coluna )
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

function registraJogadas(linha, coluna ){
    let num =  (linha * 3) + (coluna + 1);
    jogadas[indiceDeJogadas] = num
    indiceDeJogadas++
}

//Marca espaços já preenchidos, serve para informar apenas a Cpu
function retirar( linha , coluna ){

    let num =  (linha * 3) + (coluna + 1);
    //Relação desta expressão entrega a posição do elemento:
    //1,2,3 na linha 0, 4,5,6 na linha 1 e 7,8,9 na linha 2 

    let indice = auxiliar.indexOf(num); //captura o indice da posição do num dentro do vetor
    auxiliar.splice( indice , 1); //retira 1 item no indice capturado, ou seja, retira o elemento correspondente
    return;
}

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
    
    setTimeout(function(){ telaVitoria.style.display = 'flex'} , 1000);
}

//informa sobre empate e aumenta o placar
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
    mudaTabuleiro()
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
        setTimeout(function(){jogadaCPU()} , 1000);
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

//Rearranja a disposição do tabuleiro para trocar as posições de jogada da cpu
function mudaTabuleiro(){
    let disposicaoTabuleiro = Math.floor(Math.random() * 4)
    switch(disposicaoTabuleiro){
        case 0:
            tabuleiro.style.flexDirection = "column"
            linha[0].style.flexDirection = "row"
            linha[1].style.flexDirection = "row"
            linha[2].style.flexDirection = "row"
            break;
        case 1:
            tabuleiro.style.flexDirection = "column"
            linha[0].style.flexDirection = "row-reverse"
            linha[1].style.flexDirection = "row-reverse"
            linha[2].style.flexDirection = "row-reverse"
            break;
        case 2:
            tabuleiro.style.flexDirection = "column-reverse"
            linha[0].style.flexDirection = "row"
            linha[1].style.flexDirection = "row"
            linha[2].style.flexDirection = "row"
            break;
        case 3:
            tabuleiro.style.flexDirection = "column-reverse"
            linha[0].style.flexDirection = "row-reverse"
            linha[1].style.flexDirection = "row-reverse"
            linha[2].style.flexDirection = "row-reverse"
            break;
        default:
            alert("erro em geração aleatoria")
    }
}

//chama a função voltar e apaga a tela
function retorno(){
    jogo = false
    telaTabuleiro.style.display = 'none';
    telaVitoria.style.display = 'none';
    setTimeout(function(){voltar()} , 1000);
}

//Volta a tela inicial do menu (Usada pelos botões "Voltar" e "Sair")
function voltar(){
    //Zera Placar
    let num = Number(0);
    cont1p.innerText = String(num);
    contEmpate.innerText = String(num);
    cont2p.innerText = String(num);
    //Troca de Tela
    telaVitoria.style.display = 'none';
    telaInicial.style.display = 'block';
}