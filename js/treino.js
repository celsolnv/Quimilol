var elementos = [
    'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si',
    'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni',
    'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr', 'Nb', 'Mo',
    'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba',
    'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb',
    'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po',
    'At', 'Rn', 'Fr', 'Ra', 'Ac', 'Th', 'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf',
    'Es', 'Fm', 'Md', 'No', 'Lr', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg','Cn',
    'Nh','Fl','Mc','Lv','Ts','Og','Uue','Ubn'
];
var dic = {
    "1s": "2s","2s": "2p","2p": "3s","3s": "3p","3p": "4s","4s": "3d",
    "3d": "4p","4p": "5s","5s": "4d","4d": "5p","5p": "6s","6s": "4f",
    "4f": "5d","5d": "6p","6p": "7s","7s": "5f","5f": "6d","6d": "7p",
    "7p": " "
};

var naEscolhido=4;
function sortear(){
    let i = Math.floor(Math.random() * 100);
    let elemeto_quimico = elementos[i-1];
    naEscolhido = i;
    document.getElementById("elemento").innerHTML = "<sup>"+(i)+"</sup>"+"<h3>"+elemeto_quimico+"</h3>";
    limpar();
}
function limpar(){
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("resposta").innerHTML = "";
    document.getElementById("respostaUserDiv").innerHTML = "";
    document.getElementById("respostaUser").value = "";
    document.getElementById("info").innerHTML = "";
}
function escolher(){
    let n = prompt("Digite o nº atômico do elemento:",1);
    if (n==undefined){n=1}
    let elemeto_quimico = elementos[n-1];
    naEscolhido = n;
    document.getElementById("elemento").innerHTML = "<sup>"+(n)+"</sup>"+"<h3>"+elemeto_quimico+"</h3>";
    limpar();
}
function verificar(){
    let respostaUser = document.getElementById("respostaUser").value.trim();
    let respostaCorreta = resposta(naEscolhido).trim();

    if (naEscolhido==46){
        respostaCorreta = "1s2 2s2 2sp6 3s2 3p6 4s2 3d10 4p6 5s1 4d9";
    }
    else if (naEscolhido==24){
        respostaCorreta = "1s2 2s2 2sp6 3s2 3p6 4s1 3d5";
    }
    let listaDados = comparaStrings(respostaCorreta,respostaUser);

    limpar();

    if (listaDados[2]){
        document.getElementById("resultado").innerHTML += "<img src=../img/correta.svg class='icon' >";//+"<br>";
        document.getElementById("resultado").innerHTML += "<p style='display:inline'>LOL Muito bem!Escolha outros elementos</p>";
    }
    else{
        document.getElementById("resposta").innerHTML ="<span> Resposta correta: </span>"+ listaDados[0];
        document.getElementById('respostaUserDiv').innerHTML ="<span>Sua resposta:</span/>"+ listaDados[1];
        document.getElementById("resultado").innerHTML = "<img src=../img/errada.svg class='icon' >";//+"<br>";
        document.getElementById("resultado").innerHTML += "<p style='display:inline'>OPSLOL...</p><p>Não desanime!Revise o diagrama</p>";
    }
    document.getElementById("info").innerHTML = "<br>"+
    "<h4 class='title'>Infomações adicionais</h4>"+
    "<p>Sub nível mais energético: "+nivelMaisEnergetico(respostaCorreta).slice(0,2)+"</p>"+
    "<p>Sub nível mais externo: "+ nivelMaisExterno(respostaCorreta).slice(0,2)+"</p>";
}
function nivelMaisEnergetico(respostaCorreta){
    respostaCorreta = respostaCorreta.trim().split(" ");
    return respostaCorreta[respostaCorreta.length-1]
}
function nivelMaisExterno(respostaCorreta){
    respostaCorretaAux = respostaCorreta.trim();
    respostaCorreta = ordenaNivel(respostaCorretaAux);
    let maisExterno = respostaCorreta[respostaCorreta.length-1];
    return maisExterno;
}
function ordenaNivel(distribicaoEletronica){
  let lista = distribicaoEletronica.trim().split(" ");
  let ordenamento=[];
  let menor="9";
  let ordenado="";
  let aux;
  let tam = lista.length;
  for (let i=0;i<tam;i++){
    for (let j=0;j<tam;j++){
      if (lista[j][0]<menor && ordenamento.indexOf(lista[j])==-1){
        menor=lista[j][0];
        aux = lista[j]
      }
    }
    ordenamento.push(aux);
    menor="9";
  }
  return ordenamento;
}
function comparaStrings(string1,string2){
    //String 1 é a correta
    let dados = [];
    let string1Formatada = "";
    let string2Formatada = "";
    let s1,s2,iguais=true;
    string1 = string1.split(" ");
    string2 = string2.split(" ");
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
function defineCapacidade(s) {
    if (s == "s") {
        return 2;
    } else if (s == "p") {
        return 6;
    } else if (s == "d") {
        return 10;
    } else if (s == "f") {
        return 14;
    }
}
