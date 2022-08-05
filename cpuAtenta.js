
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

function tentarHV(){
   //alert("chegou")
   let contH = 0 , contV = 0 ;
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
               if(contH > 0 || contV > 0 ){
                   //alert("aqui")
                   return [i,j];
               }else{
                   contH = 0;
                   contV = 0;              
               }
            }
        }
    } 
   return tentarD()
}

function tentarD(){
    //alert("chegou")
    contD1 = 0, contD2  = 0 ;
    //Procura casas vazias
    for(let i=0 ; i<3; i++){ // linha
        for(let j=0 ; j<3; j++){ //coluna
            if( espaco[i][j].innerText == "" ){
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
                if(contD1 > 0 || contD2 > 0 ){
                    //alert("aqui")
                    return [i,j];
                }else{
                    contD1 = 0;
                    contD2 = 0;
                }
            }
        }
    }
    return estrategiaAleatoria();
}

function xDuplo(){
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
        return tentarHV();
    }else{
        cont++;
        return seSafar( cont );
    }
}
//FIM de atenta------------------------------------------
