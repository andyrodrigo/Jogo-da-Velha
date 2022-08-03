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
    jogadasLC[indiceDeJogadas][0] = linha
    jogadasLC[indiceDeJogadas][1] = coluna
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