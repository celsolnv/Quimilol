
var naEscolhido;

function remove_espacos_vazios(lista) {
    nova_lista = [];

    for (let index = 0; index < lista.length; index++) {

        let element = lista[index];
        if (element!=""){
            nova_lista.push(element)
        }
        
    }
    return nova_lista;

    
}

function comparaStrings(string1,string2){
    //String 1 é a correta
    let dados = [];
    let string1Formatada = "";
    let string2Formatada = "";
    let s1,s2,iguais=true;
    string1 = remove_espacos_vazios(string1.trim().split(" "));
    string2 = remove_espacos_vazios(string2.trim().split(" "));
    let t = string1.length>string2.length ? string1.length: string2.length;
    for (let i=0;i<t;i++){
        s1 = string1[i];
        s2 = string2[i];
        if (s2!= undefined){
            if (s1!=s2){
                string2Formatada += "<span class='spanIncorreto'> "+s2+" </span>";
                iguais=false;
            }
            else{
                string2Formatada += "<span class='spanCorreto'> "+s2+" </span>";
            }
        }
        if (s1!=undefined){
            string1Formatada += "<span> "+s1+" </span>";
        }
        if (s2==undefined && s1!=undefined){
            iguais=false;
        }

    }
    dados.push(string1Formatada,string2Formatada,iguais);
    return dados;
}


function resposta(n) {
    let aux = 0;
    let inicio = "1s";
    let string1 = "";
    let falta = "1";
    while (falta != 0) {
        falta = n - aux;
        let capacidade = this.defineCapacidade(inicio[1]);
        if (falta >= capacidade) {
            string1 += inicio + capacidade + " ";
            inicio = dic[inicio];
            aux += capacidade;
        } else if (falta == 0) {
        } else {
            string1 += inicio + falta + " ";
            aux += falta;
        }
    }
    return string1;
}
function limpar(){
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("resposta").innerHTML = "";
    document.getElementById("respostaUserDiv").innerHTML = "";
    document.getElementById("respostaUser").value = "";
    document.getElementById("info").innerHTML = "";

}
function verificarIons(){
    if (naEscolhido==undefined){
      return;
    }

    let respostaUser = document.getElementById("respostaUser").value.trim();

    respostaCorreta = json[naEscolhido-1].distribuicao.trim();
    NA = parseInt(naEscolhido);

    let listaDados = comparaStrings(respostaCorreta,respostaUser);
    limpar();
    if (listaDados[2]){

        document.getElementById("resultado").innerHTML = "<img src=../img/correta.svg class='icon' >";//+"<br>";
        document.getElementById("resultado").innerHTML += "<p style='display:inline'>LOL Muito bem!Escolha outros elementos</p>";
    }
    else{
        // document.getElementById("resultado").innerHTML = "<img src=../img/errada.png class='icon' >"+"<br>";
        document.getElementById("resposta").innerHTML ="<span> Resposta correta: </span>"+ listaDados[0];
        document.getElementById('respostaUserDiv').innerHTML ="<span>Sua resposta:</span/>"+ listaDados[1];

        document.getElementById("resultado").innerHTML = "<img src=../img/errada.svg class='icon' >";//+"<br>";
        document.getElementById("resultado").innerHTML += "<p style='display:inline'>OPSLOL...</p><p>Não desanime!Revise o diagrama</p>";

    }
    let energetico = json[naEscolhido-1].energetico;
    let externo = json[naEscolhido-1].externo;
    document.getElementById("info").innerHTML = "<br>"+
    "<h4 class='title'>Infomações adicionais</h4>"+
    "<p>Sub nível mais energético: "+energetico+"</p>"+
    "<p>Sub nível mais externo: "+ externo+"</p>";
}
function sortearIons(){
    let i = Math.floor(Math.random() * 100);
    let elemeto_quimico = json[i-1].nome;
    naEscolhido = i;
    defineIon(i);
    limpar();

}

function escolherIons(){
    let n = prompt("Digite o nº atômico do elemento:",1);
    if (n==undefined){n=1}
    let elemeto_quimico = json[n-1].nome;
    naEscolhido = n;
    defineIon(n)
    limpar();
}

function defineIon(n){
    document.getElementById("numeroAtomico").innerHTML = n;
    document.getElementById("elementoQuimico").innerHTML = json[n-1].nome;
    let sinal = parseInt(json[n-1].carga);
    if (sinal<=0){
        document.getElementById("sinal").innerHTML = json[n-1].carga;
    }
    else{
        document.getElementById("sinal").innerHTML ="+"+ json[n-1].carga;
    }

}

