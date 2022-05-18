var campo = [];
var dificuldade = 0;
var primeiroClick = 0;
var contador = 0;

function gerar(tamanho1, tamanho2) {
    for (var i=0;i<tamanho1;i++) {
        campo.push([]);
        for (var j=0;j<tamanho2;j++) {
            let lc = [i,j];
            document.getElementById('tabela').innerHTML += `<input type="button"  onclick="jogar(this.id)" id="${lc}" value="" class=" botao-green">`
            campo[i].push("f+0");
            // f == Botão Fechado
            // + == Não é bomba
            // 0 == Vizinhança == 0 bombas vizinhas
        }
        document.getElementById('tabela'). innerHTML+= `<br>`
    }
    switch (tamanho1) {
        case 8:
            dificuldade = "Facil";
            break;
        case 14:
            dificuldade = "Medio";
            break;
        case 20:
            dificuldade = "Dificil";
            break;
    }
    //Evitar que o jogador adicione mais teclas ou reinicie o jogo
    document.getElementById("BF").disabled=true
    document.getElementById("BM").disabled=true
    document.getElementById("BD").disabled=true

    document.getElementById("BF").hidden=true
    document.getElementById("BM").hidden=true
    document.getElementById("BD").hidden=true
}

function jogar(clickId) {
    var botao = document.getElementById(clickId);
    if(primeiroClick == 0){
      gerarBombas()
      contarBombasVizinhas()
      verificarTile(botao,clickId)
      primeiroClick++;
      start()
      contador++;
    }
    verificarTile(botao,clickId)
    contador++;
    if(contador == 71){
      alert("PARAÉNS VOCE VENCEU")  
    }else if(contador == 213){
        alert("PARAÉNS VOCE VENCEU")  
    }else if(contador == 382){
        alert("PARAÉNS VOCE VENCEU")  
    }
    
    

}

function verificarTile(botao,click) {
    if (botao.value == "") {
        var tile = campo[click[0]][click[2]]
        //Pegar Coordenada do botão para buscar no array Campo , click[1] == ","
        if(primeiroClick == 0 && tile[1] == "*"){
            jogar();
        }
        if(tile[1] == "*" ){
            botao.setAttribute("value","💣");
            botao.setAttribute("class", "botao-black")
            botao.setAttribute("disabled","true")
            stop()
            //alert("VocÊ perdeu");
            var result
            var tempo = document.getElementById("cron")
            result= document.getElementById("resp").innerHTML=`<h1 class="perda">você perdeu</h1>`
            var perder
            perder = setInterval(() => {
                location.reload()
            }, 5000); 
            
           // location.reload();
        }else{
            let teste = campo[click[0]][click[2]].replace("f","a")
            campo[click[0]][click[2]]= teste;
            let num = tile[2];
            botao.setAttribute("value",num);
            botao.setAttribute("class", "botao-black")
            botao.setAttribute("disabled","true")
        }      
    }


}



function verificarAbertura(params) {
    quantidade= 0;
    for(var i=0;i<campo.length;i++){
        for(var j=0;j<campo[i].length;j++){
            quantidade += vBomba((i-1),(j-1))
            quantidade += vBomba((i-1),j)
            quantidade += vBomba((i-1),(j+1))
            quantidade += vBomba(i,(j-1))
            quantidade += vBomba(i,(j+1))
            quantidade += vBomba((i+1),(j-1))
            quantidade += vBomba((i+1),j)
            quantidade += vBomba((i+1),(j+1))
            let teste = campo[i][j].replace("0",quantidade);
            campo[i][j] = teste
        }
    }
}

function contarBombasVizinhas() {
    var quantidade = 0;
    for(var i=0;i<campo.length;i++){
        for(var j=0;j<campo[i].length;j++){
            quantidade += vBomba((i-1),(j-1))  //Verificação Botão Diagonal Superior Esquerda
            quantidade += vBomba((i-1),j) //Verificação Botão Cima
            quantidade += vBomba((i-1),(j+1)) //Verificação Botão Diagonal Superior Direita
            quantidade += vBomba(i,(j-1)) //Verificação Botão Esquerdo
            quantidade += vBomba(i,(j+1)) //Verificação Botão Direito
            quantidade += vBomba((i+1),(j-1)) //Verificação Botão Diagonal Enferior Esquerdo
            quantidade += vBomba((i+1),j) //Verificação Botão Baixo
            quantidade += vBomba((i+1),(j+1)) //Verificação Botão Diagonal Enferior Direito
            let teste = campo[i][j].replace("0",quantidade);
            campo[i][j] = teste

            quantidade = 0;
        }
    }
}

// verificação se é uma bomba
function vBomba(l,c) {
    
    if (vCord(l,c) == 1) {
        if ((campo[l][c].indexOf("*")) !== -1) {
            //É uma bomba
            return 1;
        }
        // Não é uma bomba
        return 0;
    }else{
        //Não é valido a Posição ou não tem bomba
        return 0; 
    }
}

//Verificação se a coordenada é valida
function vCord(l,c) {
    // Verifica se a coordenada é valida
    if(l >= 0 && l < campo.length && c >= 0 && c < campo[0].length){
        //Coordenada é verdadeira
        return 1;
    }else{
        //Coordenada é invalida
        return 0;
    }
}

function gerarBombas() {
    switch (dificuldade) {
        case "Facil":
            for(var i=0; i<10;i++) {
                //Index de um array aleatorio da var Campo
               var  l = Math.floor(Math.random()*8);
               var  c = Math.floor(Math.random()*10);
               var campoAle = campo[l][c];

                if(campoAle == "f+0"){
                   campo[l][c] = "f*0"
                   // F de botão fechado
                   // * == É bomba
                   // 0 == Vizinhança == 0 Bombas vizinhas
                }else if (campo[l][c] == "f*0") {
                    i--
                }
            }
            break;
        case "Medio":
            for(var i=0; i<40;i++) {
                var  l = Math.floor(Math.random()*14);
                var  c = Math.floor(Math.random()*18);
                var bomb = campo[l][c];
                 if(bomb == "f+0"){
                    campo[l][c] = "f*0"
                    // F de botão fechado
                   // * == É bomba
                   // 0 == Vizinhança == 0 Bombas vizinhas
                 }else if (campo[l][c] == "f*0") {
                     i--
                 }
                 
             }
            break;
        case "Dificil":
            for(var i=0; i<99;i++) {
                var  l = Math.floor(Math.random()*20);
                var  c = Math.floor(Math.random()*24);
                var bomb = campo[l][c];
                 if(bomb == "f+0"){
                    campo[l][c] = "f*0"
                    // F de botão fechado
                   // * == É bomba
                   // 0 == Vizinhança == 0 Bombas vizinhas
                 }else if (campo[l][c] == "f*0") {
                     i--
                 }
             }
            break;
    }
} 

var mm = 0
var ss = 0

var cron

function start() {
    cron = setInterval(() => {
        time()
    }, 1000); 
}

function pause() {
  clearInterval(cron)  
}

function stop() {
    clearInterval(cron)
    mm= 0
    ss= 0
    document.getElementById("cron").innerHTML="⏱00:00"
}
function time() {
    ss++

    if (ss==60) {
        ss=0
        mm++
    }

    var format =
    (mm <10 ? "0" + mm:mm)+
    ":"+
    (ss <10 ? "0" + ss:ss)

    document.getElementById("cron").innerHTML= format
}
