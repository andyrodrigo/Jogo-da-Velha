
//Variáveis------------------------------------------------------------------------------
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

//de jogo
let jogo = false




//Funções-------------------------------------------------------------------------------

function inserirXO(e){
    let linha = Number(e.currentTarget.parentNode.rowIndex)
    let coluna = Number(e.currentTarget.cellIndex)
    espaco[linha][coluna].innerText = 'O'
    testarVitoria('O')
    //alert(linha + ' ' + coluna)
}

function testarVitoria(simbolo){
    
    let contador = 0 //conta simbolos

    for(let i=0 ; i<3; i++){//testa linha
        for(let j=0 ; j<3; j++){
            if(espaco[i][j].innerText == simbolo){
                contador++
            }else{
                contador=0;
                break;
            }
        }
        if(contador >= 3){
            indicarVitoria();
            return;
        }else{
            contador=0; //zera e testa próxima linha
        }
    }
}

function indicarVitoria(){
    alert('VITORIA')
}

//Escutadores---------------------------------------------------------------------------

function escutadores(){
    espaco[0][0].addEventListener('click', inserirXO)
    espaco[0][1].addEventListener('click', inserirXO)
    espaco[0][2].addEventListener('click', inserirXO)
    espaco[1][0].addEventListener('click', inserirXO)
    espaco[1][1].addEventListener('click', inserirXO)
    espaco[1][2].addEventListener('click', inserirXO)
    espaco[2][0].addEventListener('click', inserirXO)
    espaco[2][1].addEventListener('click', inserirXO)
    espaco[2][2].addEventListener('click', inserirXO)

}

//--------------------------------------------------------------------------------------

//inicialização
window.addEventListener("load", escutadores) //Ativa os escutadores